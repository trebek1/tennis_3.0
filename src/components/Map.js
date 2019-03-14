import React, { Component } from 'react';
import { array, string } from 'prop-types';
import courtStyles from '../constants/courtStyles';

const MAX_POINTS = 119;

const iconMap = {
  address: 'fa-address-book-o',
  lights: 'fa-lightbulb-o',
  phone: 'fa-mobile',
};

class Map extends Component {
  state = {
    infowindow: null,
    map: null,
    marker: null,
  };

  constructor(props) {
    super(props);
    this.mapRef = null;
    this.setMapRef = element => {
      this.mapRef = element;
    };
  }

  chooseStyles = () => courtStyles[this.props.styles] || [];

  createMap = () => {
    const that = this;
    const map = new google.maps.Map(this.mapRef, {
      center: new google.maps.LatLng(37.763108, -122.455799),
      zoom: 13,
      gestureHandling: 'greedy',
      styles: that.chooseStyles(),
      bounds: new google.maps.LatLngBounds(),
    });
    this.setState({
      map,
    });
    return map;
  };

  getPoints = () =>
    this.props.courts.map(court => new google.maps.LatLng(court.x, court.y));

  getPinColor = ({ type }) => {
    switch (type) {
      case 'shop':
        return 'FE7569';
      case 'club':
        return 'F8EC3B';
      case 'court':
        return '3BF83E';
      case 'other':
        return '00ccff';
      default:
        return 'FE7569';
    }
  };

  createMarker = (map, points, index) =>
    new google.maps.Marker({
      position: points[index],
      icon: new google.maps.MarkerImage(
        `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${this.getPinColor(
          this.props.courts[index]
        )}`,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34)
      ),
      shadow: new google.maps.MarkerImage(
        'https://chart.apis.google.com/chart?chst=d_map_pin_shadow',
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35)
      ),
      map,
    });

  setMarkerContent = index => {
    const court = this.props.courts[index];

    const content = Object.keys(iconMap).reduce(
      (list, field) => {
        if (court[field])
          return (list += `
          <div>
            <i class="fa ${iconMap[field]} fa-fw"></i>
            ${court[field]}
          </div>`);
        return list;
      },
      `
      <div id="content">
        <div class="courtName">${court.name}</div>
      </div>`
    );

    // Create new info window - Popup with street location and the title of the movie
    return new google.maps.InfoWindow({ content });
  };

  addMarkerToMap(index, marker) {
    const that = this;
    const infowindow = this.setMarkerContent(index);
    google.maps.event.addListener(
      marker,
      'click',
      () => {
        const {
          infowindow: currentWindow,
          map,
          marker: currentMarker,
        } = this.state;
        // If there is a current window then close it
        if (currentWindow != null) {
          currentWindow.close(map, currentMarker);
        }
        // Open a new info window
        infowindow.open(map, marker);
        // update state
        that.setState({
          infowindow,
          marker,
        });
      },
      { passive: false }
    );
  }

  closeInfoWindow(map) {
    const { infowindow, marker } = this.state;
    if (infowindow != null) {
      infowindow.close(map, marker);
      this.setState({
        infowindow: null,
      });
    }
  }

  closeInfoWindowOnClick(map) {
    google.maps.event.addListener(
      map,
      'click',
      () => {
        this.closeInfoWindow(map);
      },
      { passive: true }
    );
  }

  componentDidUpdate({ courts, styles }) {
    if (
      this.props.courts.length !== courts.length ||
      this.props.styles !== styles
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
  courts: array.isRequired,
  styles: string.isRequired,
};
