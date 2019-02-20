import React, { Component } from "react";
import PropTypes from "prop-types";
import courtStyles from "../constants/courtStyles";

class Map extends Component {
  state = {
    courts: [],
    expanded: false
  };

  shouldComponentUpdate({ courts, style }) {
    if (this.state.courts !== courts || this.state.style !== style) {
      this.setState({
        courts,
        style
      });
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.courts.length > 0) {
      const map = this.createMap();
      let bounds = map.getBounds();
      const that = this;
      const points = this.getPoints();
      for (let j = 0; j < points.length; j++) {
        // get marker and infowindow variables from functions
        const marker = this.createMarker(map, points, j);
        let infowindow = null;
        // set bounds and set center of map
        bounds.extend(marker.getPosition());
        map.setCenter(bounds.getCenter());
        // Handle clicking marker
        google.maps.event.addListener(
          marker,
          "click",
          () => {
            // Expand window
            if (that.state.infowindow) {
              that.state.infowindow.close(map, that.state.marker);
            }
            infowindow = this.setMarkerContent(j);
            infowindow.open(map, marker);
            // Add window and marker to state
            that.setState({
              infowindow,
              marker
            });

            const a = document.getElementsByClassName("gm-style-iw");
            for (let i = 0; i < a.length; i++) {
              const node = a[i].parentElement;
              node.removeChild(node.firstChild);
            }
          },
          { passive: false }
        );
      }
      // zoom out once so that user is guaranteed to see markers if on sort
      if (points.length < 100 && points.length !== 1) {
        map.setZoom(map.getZoom() - 1);
      }
      if (points.length === 1) {
        const point = points[0];
        bounds = new google.maps.LatLngBounds(point);
        map.fitBounds(bounds);
        map.setZoom(map.getZoom() - 6);
      }
      // Add listener to map so that if its clicked then the window closes if its open
      google.maps.event.addListener(
        map,
        "click",
        () => {
          if (that.state.infowindow) {
            that.state.infowindow.close(that.state.map, that.state.marker);
            that.setState({
              expanded: false,
              infowindow: null
            });
          }
        },
        { passive: true }
      );
    }
  }
  setMarkerContent = index => {
    const court = this.props.courts[index];
    const contentString = `<div id="content"><div class="courtName">${
      court.Name
    }</div><div><i class="fa fa-address-book-o fa-fw" aria-hidden="true"></i>${
      court.Address
    }</div>${
      court.Lights
        ? `<div><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i>${
            court.Lights
          }</div>`
        : ""
    } ${
      court.Phone
        ? `<div><i class="fa fa-mobile fa-fw" aria-hidden="true"></i>${
            court.Phone
          }</div>`
        : ""
    }</div>`;
    // Create new info window - Popup with street location and the title of the movie
    const infowindow = new google.maps.InfoWindow(
      {
        content: contentString
      },
      { passive: true }
    );
    return infowindow;
  };

  getPinColor = data => {
    const courtType = data.Type.toLowerCase();
    switch (courtType) {
      case "shop":
        return "FE7569";
      case "club":
        return "F8EC3B";
      case "court":
        return "3BF83E";
      case "other":
        return "00ccff";
      default:
        return "FE7569";
    }
  };
  getPoints = () => {
    const points = [];
    const courts = this.props.courts;
    for (let i = 0; i < courts.length; i++) {
      const temp = [courts[i].X, courts[i].Y];
      const a = new google.maps.LatLng(temp[0], temp[1]);
      points.push(a);
    }
    return points;
  };

  chooseStyles = () => courtStyles[this.props.style] || [];

  createMarker = (map, points, index) => {
    const pinImage = new google.maps.MarkerImage(
      `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${this.getPinColor(
        this.props.courts[index]
      )}`,
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34)
    );
    const pinShadow = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
      new google.maps.Size(40, 37),
      new google.maps.Point(0, 0),
      new google.maps.Point(12, 35)
    );
    const marker = new google.maps.Marker({
      position: points[index],
      icon: pinImage,
      shadow: pinShadow,
      map
    });
    return marker;
  };

  createMap = () => {
    const styles = this.chooseStyles();
    const bounds = new google.maps.LatLngBounds();
    const mapOptions = {
      center: new google.maps.LatLng(37.763108, -122.455799),
      zoom: 13,
      gestureHandling: "greedy",
      styles,
      bounds
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.setState({
      map
    });
    return map;
  };

  render = () => (
    <div id="mapContainer">
      <div id="map" className="map-gic main-map" ref="gmap">
        Map Loading...
      </div>
    </div>
  );
}
export default Map;

Map.propTypes = {
  courts: PropTypes.array.isRequired,
  style: PropTypes.string.isRequired
};
