import React, { Component } from "react";
import { func, array, string } from "prop-types";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions to dispatch
import courtActions from "../actions/courtActions";

// Presentational Components
import CourtList from "../components/CourtList";
import Map from "../components/Map";
import SortByButtons from "../components/SortByButtons";
import StyleButtons from "../components/StyleButtons";

export class AppContainer extends Component {
  componentDidMount() {
    this.props.getCourts();
  }

  render() {
    const {
      sort,
      sortPoints,
      selectPoint,
      sortedCourts,
      styles,
      selectStyle
    } = this.props;

    return (
      <div id="mainContainer">
        <div id="title"> Tennis Courts in San Francisco </div>
        <div id="sideContainer">
          <CourtList
            courts={sortedCourts}
            selectPoint={selectPoint}
            sort={sort}
            sortPoints={sortPoints}
          />
        </div>
        <Map courts={sortedCourts} styles={styles} />
        <div id="keyContainer">
          <SortByButtons sortPoints={sortPoints} />
        </div>
        <div id="styleSelectorContainer">
          <StyleButtons selectStyle={selectStyle} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  courts: { sortedCourts = [], sort = "all", courts = [] } = {
    sortedCourts: [],
    sort: "all",
    courts: []
  },
  styles = "wimbledon"
}) => ({
  courts,
  sort,
  sortedCourts,
  styles
});

export default connect(
  mapStateToProps,
  courtActions
)(AppContainer);

AppContainer.propTypes = {
  getCourts: func.isRequired,
  selectPoint: func,
  sortedCourts: array,
  styles: string,
  sort: string,
  sortPoints: func
};

AppContainer.defaultProps = {
  styles: string,
  sortPoints: func,
  sort: string,
  selectPoint: func,
  sortedCourts: array
};
