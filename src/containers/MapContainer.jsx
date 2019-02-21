import React, { Component } from "react";
import { connect } from "react-redux";
import { getCourts } from "../actions/courtActions";
import Map from "../components/Map";

class MapContainer extends Component {
  componentDidMount() {
    getCourts();
  }

  render = () => {
    const { courts, selectedCourt, sortedCourts, styles } = this.props;
    return (
      <Map
        courts={courts}
        selectedCourt={selectedCourt}
        sortedCourts={sortedCourts}
        styles={styles}
      />
    );
  };
}

export default connect(
  ({
    courts: { courts, selectedPoint, sortedCourts },
    styles: { styles }
  }) => ({
    courts,
    selectedCourt: selectedPoint,
    sortedCourts,
    styles
  })
)(MapContainer);
