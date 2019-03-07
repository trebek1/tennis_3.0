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

class App extends Component {
  componentDidMount() {
    this.props.getCourts();
  }

  render() {
    const {
      sort,
      sortPoints,
      selectPoint,
      sortedCourts,
      style,
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
        <Map courts={sortedCourts} style={style} />
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
  styles: { styles = "wimbledon" } = { styles: "wimbledon" }
}) => ({
  courts,
  style: styles,
  sortedCourts,
  sort
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...courtActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  getCourts: func.isRequired,
  selectPoint: func,
  selectStyle: func.isRequired,
  sortedCourts: array,
  style: string,
  sort: string,
  sortPoints: func
};

App.defaultProps = {
  style: string,
  sortPoints: func,
  sort: string,
  selectPoint: func,
  sortedCourts: array
};
