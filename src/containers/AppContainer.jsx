import React, { Component } from "react";
import { func, array, string } from "prop-types";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Action to dispatch
import courtActions from "../actions/courtActions";

// Dumb Components
import ButtonPannel from "../components/ButtonPannel";
import CourtList from "../components/CourtList";
import Key from "../components/Key";
import Map from "../components/Map";

class App extends Component {
  componentDidMount() {
    this.props.getCourts();
  }

  render() {
    const {
      sort,
      sortPoints,
      selectPoint,
      selectedPoint,
      sortedCourts,
      style,
      updateSort,
      selectStyle
    } = this.props;
    const selectedPointLength = selectedPoint.length > 0;
    return (
      <div id="mainContainer">
        <div id="title"> Tennis Courts in San Francisco </div>
        <div id="sideContainer">
          <CourtList
            courts={selectedPointLength ? selectedPoint : sortedCourts}
            selectPoint={selectPoint}
            sort={sort}
            sortPoints={sortPoints}
          />
        </div>
        <Map
          courts={selectedPointLength ? selectedPoint : sortedCourts}
          style={style}
        />
        <div id="keyContainer">
          <Key updateSort={updateSort} sortPoints={sortPoints} />
        </div>
        <div id="styleSelectorContainer">
          <ButtonPannel selectStyle={selectStyle} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  courts: { sortedCourts, selectedPoint, sort, courts },
  styles: { styles }
}) => ({
  courts,
  style: styles,
  sortedCourts,
  selectedPoint,
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
  selectedPoint: array,
  selectPoint: func,
  selectStyle: func.isRequired,
  sortedCourts: array,
  style: string,
  sort: string,
  sortPoints: func,
  updateSort: func.isRequired
};

App.defaultProps = {
  style: string,
  sortPoints: func,
  selectedPoint: array,
  sort: string,
  selectPoint: func,
  sortedCourts: array
};
