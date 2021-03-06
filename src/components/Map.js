// @flow strict-local

import * as React from 'react';
import courtStyles from '../constants/courtStyles';
import Pins from '../constants/pins';

import css from '../css/home.css';

import type { Court, CourtStyle } from '../types';

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
  infowindow: InfoWindow,
  map: MapType,
  marker: Marker,
  markers: Array<Marker>,
|};

class Map extends React.Component<Props, State> {
  state: State = {
    infowindow: null,
    map: null,
    marker: null,
    markers: [],
  };

  setMapRef = null;
  mapRef = null;

  constructor(props: Props) {
    super(props);
    this.mapRef = null;
    this.setMapRef = (element: ?HTMLDivElement) => {
      this.mapRef = element;
    };
  }

  chooseStyles = (): Array<CourtStyle> => courtStyles[this.props.styles] || [];

  createMap = (): MapType => {
    const that = this;
    // $FlowFixMe
    const map = new google.maps.Map(this.mapRef, {
      bounds: new google.maps.LatLngBounds(),
      center: new google.maps.LatLng(37.763108, -122.455799),
      disableDefaultUI: true,
      gestureHandling: 'greedy',
      styles: that.chooseStyles(),
      zoom: 13,
    });
    this.setState({
      map,
    });
    return map;
  };

  getPoints = (): Array<Court> =>
    // $FlowFixMe
    this.props.courts.map((court) => new google.maps.LatLng(court.x, court.y));

  getPinColor = ({ type }: Court): string => {
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
    // $FlowFixMe
    new google.maps.Marker({
      position: points[index],
      icon: {
        url: this.getPinColor(this.props.courts[index]),
        size: new google.maps.Size(24, 34),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(10, 34),
      },
      map,
    });

  setMarkerContent = (index: number): InfoWindow => {
    const court = this.props.courts[index];

    let content = Object.keys(iconMap).reduce(
      (list, field) => {
        if (court[field])
          // $FlowFixMe
          return (list += `
          <div>
            <i class="fa ${iconMap[field]} fa-fw"></i>
            ${court[field]}
          </div>`);
        return list;
      },
      `
      <div id="content">
        <div id="courtName">${court.name}</div><div id="courtInfoWindow">`
    );

    content += '</div></div>';

    // Create new info window - Popup with street location and the title of the movie
    // $FlowFixMe
    return new google.maps.InfoWindow({ content });
  };

  addMarkerToMap(index: number, marker: Marker): void {
    const that = this;
    const infowindow = this.setMarkerContent(index);
    // $FlowFixMe
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
    // $FlowFixMe
    google.maps.event.addListener(
      map,
      'click',
      () => {
        this.closeInfoWindow(map);
      },
      { passive: true }
    );
  }

  fitMapToPoints = (markers: Array<Marker>, map: MapType): void => {
    // $FlowFixMe
    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => bounds.extend(marker.getPosition()));
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

  componentDidUpdate({ courts, styles }: Props): void {
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
      this.state.markers.forEach((marker) => marker.setMap(null));
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
