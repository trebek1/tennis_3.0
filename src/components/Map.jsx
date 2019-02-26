import React, { Component } from "react";
import PropTypes from "prop-types";
import courtStyles from "../constants/courtStyles";

const MAX_POINTS = 119;

class Map extends Component {
  state = {
    courts: [],
    expanded: false
  };

  constructor(props) {
    super(props);
    this.mapRef = null;
    this.setMapRef = element => {
      this.mapRef = element;
    };
  }

  componentDidUpdate({ courts, style }) {
    if (
      this.props.courts.length !== courts.length ||
      this.props.style !== style
    ) {
      const map = this.createMap();
      const bounds = map.getBounds();
      const points = this.getPoints();
      points.forEach((point, idx) => {
        const marker = this.createMarker(map, points, idx);
        bounds.extend(marker.getPosition());
        map.setCenter(bounds.getCenter());
        this.addMarkerToMap(idx, marker);
      });
      if (points.length !== MAX_POINTS) map.setZoom(map.getZoom() - 1);
      this.closeInfoWindowOnClick(map);
    }
  }

  setMarkerContent = index => {
    const court = this.props.courts[index];
    const content = `<div id="content"><div class="courtName">${
      court.name
    }</div><div><i class="fa fa-address-book-o fa-fw" aria-hidden="true"></i>${
      court.address
    }</div>${
      court.lights
        ? `<div><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i>${
            court.lights
          }</div>`
        : ""
    } ${
      court.phone
        ? `<div><i class="fa fa-mobile fa-fw" aria-hidden="true"></i>${
            court.phone
          }</div>`
        : ""
    }</div>`;
    // Create new info window - Popup with street location and the title of the movie
    return new google.maps.InfoWindow({ content });
  };

  getPinColor = ({ type }) => {
    switch (type) {
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

  getPoints = () =>
    this.props.courts.map(court => new google.maps.LatLng(court.x, court.y));
  addMarkerToMap(index, marker) {
    const that = this;
    const infowindow = this.setMarkerContent(index);

    google.maps.event.addListener(
      marker,
      "click",
      () => {
        const {
          infowindow: currentWindow,
          map,
          marker: currentMarker
        } = this.state;
        // If there is a current window then close it
        if (currentWindow) {
          currentWindow.close(map, currentMarker);
        }
        // Open a new info window
        infowindow.open(map, marker);
        // update state
        that.setState({
          infowindow,
          marker
        });
      },
      { passive: false }
    );
  }

  closeInfoWindow(map) {
    const { infowindow, marker } = this.state;
    if (infowindow) {
      infowindow.close(map, marker);
      this.setState({
        expanded: false,
        infowindow: null
      });
    }
  }

  closeInfoWindowOnClick(map) {
    const that = this;
    google.maps.event.addListener(
      map,
      "click",
      () => {
        that.closeInfoWindow(map);
      },
      { passive: true }
    );
  }

  chooseStyles = () => courtStyles[this.props.style] || [];

  createMarker = (map, points, index) =>
    new google.maps.Marker({
      position: points[index],
      icon: new google.maps.MarkerImage(
        `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${this.getPinColor(
          this.props.courts[index]
        )}`,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34)
      ),
      shadow: new google.maps.MarkerImage(
        "http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35)
      ),
      map
    });

  createMap = () => {
    const that = this;
    const map = new google.maps.Map(this.mapRef, {
      center: new google.maps.LatLng(37.763108, -122.455799),
      zoom: 13,
      gestureHandling: "greedy",
      styles: that.chooseStyles(),
      bounds: new google.maps.LatLngBounds()
    });
    this.setState({
      map
    });
    return map;
  };

  render = () => (
    <div id="mapContainer">
      <div id="map" className="map-gic main-map" ref={this.setMapRef}>
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
