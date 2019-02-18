import React, { Component } from "react";
import PropTypes from "prop-types";
import courtStyles from "../constants/courtStyles";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courts: [],
      expanded: false
    };
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.courts.length === 0) {
      this.setState({
        courts: this.props.courts
      });
      return true;
    } else if (this.state.style !== nextProps.style) {
      this.setState({
        style: nextProps.style
      });
      return true;
    } else if (nextProps.courts.length !== this.state.courts.length) {
      this.setState({
        courts: nextProps.courts
      });
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.state.courts.length === 0) {
      this.getCourts();
    }
    if (this.state.courts.length > 0) {
      const map = this.createMap();
      let bounds = map.getBounds();
      const that = this;
      const points = this.getPoints();
      for (let j = 0; j < points.length; j++) {
        // get marker and infowindow variables from functions
        const marker = that.createMarker(map, points, j);
        const infowindow = that.setMarkerContent(j);
        // set bounds and set center of map
        bounds.extend(marker.getPosition());
        map.setCenter(bounds.getCenter());
        // Handle clicking marker
        google.maps.event.addListener(
          marker,
          "click",
          () => {
            // if not expended then expand the window
            if (that.state.expanded === false) {
              // Expand window
              infowindow.open(map, marker);
              // Add window and marker to state
              that.setState({
                infowindow,
                marker
              });
              // Set data to state for court
              that.setMarkerDataToState(j);
            } else {
              // if expanded window we have to close the window and open another
              that.state.infowindow.close(map, that.state.marker);
              infowindow.open(map, marker);
              // put new window and marker on state
              that.setState({
                infowindow,
                marker
              });
              // Set rest of data to state
              that.setMarkerDataToState(j);
            }
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
        map.setZoom(15);
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
    const court = this.state.courts[index];
    let courtLightString;
    let courtPhoneString;
    if (court.Phone) {
      courtPhoneString = `<div><i class="fa fa-mobile fa-fw" aria-hidden="true"></i>${
        court.Phone
      }</div>`;
    } else {
      courtPhoneString = "";
    }
    if (court.Lights) {
      courtLightString = `<div><i class="fa fa-lightbulb-o fa-fw" aria-hidden="true"></i>${
        court.Lights
      }</div>`;
    } else {
      courtLightString = "";
    }

    const contentString = `<div id="content"><div class="courtName">${
      court.Name
    }</div><div><i class="fa fa-address-book-o fa-fw" aria-hidden="true"></i>${
      court.Address
    }</div>${courtLightString} ${courtPhoneString}</div>`;
    // Create new info window - Popup with street location and the title of the movie
    const infowindow = new google.maps.InfoWindow(
      {
        content: contentString
      },
      { passive: true }
    );

    return infowindow;
  };
  setMarkerDataToState = () => {
    this.setState({
      expanded: true
    });
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
    const courts = this.state.courts;
    for (let i = 0; i < courts.length; i++) {
      const temp = [courts[i].X, courts[i].Y];
      const a = new google.maps.LatLng(temp[0], temp[1]);
      points.push(a);
    }
    return points;
  };
  getCourts = () => {
    if (this.props.courts.length > this.state.courts.length) {
      this.setState({
        courts: this.props.courts
      });
    }
  };

  legend = controlDiv => {
    // Set CSS styles for the DIV containing the control
    // Setting padding to 5 px will offset the control
    // from the edge of the map
    controlDiv.style.padding = "5px";

    // Set CSS for the control border
    const controlUI = document.createElement("DIV");
    controlUI.style = {
      backgroundColor: "black",
      borderStyle: "solid",
      borderWidth: "1px"
    };
    controlUI.title = "Legend";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control text
    const controlText = document.createElement("DIV");
    controlText.style = {
      fontFamily: "Arial, sans-serif",
      fontSize: "12px",
      paddingLeft: "4px",
      paddingRight: "4px"
    };

    // Add the text
    controlText.innerHTML =
      '<div id="legendContainer"><div id="key"> Map Key</div>' +
      '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F8EC3B" /></span><span class="keyValue leftSpace">Tennis Club</span></div>' +
      '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3BF83E" /></span><span class="keyValue leftSpace"> Public Tennis Court</span></div>' +
      '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"/></span><span class="keyValue leftSpace"> Tennis Shop</span></div>' +
      '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00ccff" /></span><span class="keyValue leftSpace"> Other Facility</span></div></div>';
    controlUI.appendChild(controlText);
  };

  chooseStyles = () => courtStyles[this.state.style] || [];

  createLegend = map => {
    const legendDiv = document.createElement("div");
    legendDiv.style.color = "orange";
    legendDiv.index = 1;
    this.legend(legendDiv, map);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendDiv);
  };

  createMarker = (map, points, index) => {
    const pinImage = new google.maps.MarkerImage(
      `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${this.getPinColor(
        this.state.courts[index]
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

  render() {
    return (
      <div id="mapContainer">
        <div id="map" className="map-gic main-map" ref="gmap">
          {" "}
          Map Loading{" "}
        </div>
      </div>
    );
  }
}
export default Map;

Map.propTypes = {
  courts: PropTypes.array.isRequired,
  style: PropTypes.string.isRequired
};
