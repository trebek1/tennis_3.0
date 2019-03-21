// @flow strict-local

import * as React from 'react';
import courtStyles from '../constants/courtStyles';
import Pins from '../constants/pins';

import type { Court } from '../types';

const MAX_POINTS = 119;

const iconMap = {
  address: 'fa-address-book-o',
  lights: 'fa-lightbulb-o',
  phone: 'fa-mobile',
};

// Types dont exist for these
type InfoWindow = any;
type MapType = any;
type Marker = any;

type Props = {|
  courts: Array<Court>,
  styles: string,
|};

type State = {|
  infoWindow: InfoWindow,
  map: MapType,
  marker: Marker,
|};

class Map extends React.Component<Props, State> {
  state: State = {
    infowindow: null,
    map: null,
    marker: null,
    markers: [],
  };

  constructor(props) {
    super(props);
    this.mapRef = null;
    this.setMapRef = element => {
      this.mapRef = element;
    };
  }

  chooseStyles = (): Array<CourtStyle> => courtStyles[this.props.styles] || [];

  createMap = (): MapType => {
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

  getPoints = (): Array<Court> =>
    this.props.courts.map(court => new google.maps.LatLng(court.x, court.y));

  getPinColor = ({ type }): string => {
    switch (type) {
      case 'shop':
        return Pins.redPin;
      case 'club':
        return Pins.yellowPin;
      case 'court':
        return Pins.greenPin;
      case 'other':
        return Pins.bluePin;
      default:
        return Pins.redPin;
    }
  };

  createMarker = (map: MapType, points: Array<Court>, index: number): Marker =>
    new google.maps.Marker({
      position: points[index],
      icon: new google.maps.MarkerImage(
        this.getPinColor(this.props.courts[index]),
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34)
      ),
      shadow: new google.maps.MarkerImage(
        'http://chart.apis.google.com/chart?chst=d_map_pin_shadow',
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35)
      ),
      map,
    });

  setMarkerContent = (index: number): InfoWindow => {
    const court = this.props.courts[index];

    const content = Object.keys(iconMap).reduce(
      (list, field) => {
        if (court[field])
          return (list += `
          <div>
            ${iconMap[field]}
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

  addMarkerToMap(index: number, marker: Marker): void {
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

  closeInfoWindow(map: MapType): void {
    const { infowindow, marker } = this.state;
    if (infowindow != null) {
      infowindow.close(map, marker);
      this.setState({
        infowindow: null,
      });
    }
  }

  closeInfoWindowOnClick(map: MapType): void {
    google.maps.event.addListener(
      map,
      'click',
      () => {
        this.closeInfoWindow(map);
      },
      { passive: true }
    );
  }

  fitMapToPoints = (markers, map): void => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => bounds.extend(marker.getPosition()));
    if (this.state.map != null) {
      map.fitBounds(bounds);
    }

    if (markers.length === MAX_POINTS) {
      map.setZoom(13);
    } else if (markers.length === 1) {
      map.setZoom(15);
    } else {
      map.setZoom(map.getZoom() + 1);
    }
  };

  componentDidUpdate({ courts, styles }): void {
    if (
      this.props.courts.length !== courts.length ||
      this.props.styles !== styles
    ) {
      let { map } = this.state;
      if (this.state.map == null) {
        map = this.createMap();
      }

      if (this.props.styles !== styles) {
        map.setOptions({ styles: this.chooseStyles() });
        return;
      }

      const points = this.getPoints();
      let markers = [];
      this.state.markers.forEach(marker => marker.setMap(null));
      points.forEach((point, idx) => {
        const marker = this.createMarker(map, points, idx);
        this.addMarkerToMap(idx, marker);
        markers = [...markers, marker];
      });

      this.fitMapToPoints(markers, map);

      if (markers.length !== this.state.markers.length)
        this.setState({ markers });

      if (this.state.map == null) this.closeInfoWindowOnClick(map);
    }
  }

  render = (): React.Node => (
    <div id="mapContainer">
      <div id="map" className="map-gic main-map" ref={this.setMapRef}>
        Map Loading...
      </div>
    </div>
  );
}
export default Map;
