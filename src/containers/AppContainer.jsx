import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Action to dispatch
import courtActions from "../actions/courtActions";

// Dumb Components
import Map from "../components/Map";
import ButtonPannel from "../components/ButtonPannel";
import CourtList from "../components/CourtList";
import Key from "../components/Key";

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
            sort={sort}
            sortPoints={sortPoints}
            selectPoint={selectPoint}
            courts={selectedPointLength ? selectedPoint : sortedCourts}
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

const mapStateToProps = state => ({
  courts: state.courts.courts,
  style: state.styles.styles,
  sortedCourts: state.courts.sortedCourts,
  selectedPoint: state.courts.selectedPoint,
  sort: state.courts.sort
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
  style: PropTypes.string,
  getCourts: PropTypes.func.isRequired,
  updateSort: PropTypes.func.isRequired,
  selectedPoint: PropTypes.array,
  sort: PropTypes.string,
  sortPoints: PropTypes.func,
  selectStyle: PropTypes.func.isRequired,
  selectPoint: PropTypes.func,
  sortedCourts: PropTypes.array
};

App.defaultProps = {
  style: PropTypes.string,
  sortPoints: PropTypes.func,
  selectedPoint: PropTypes.array,
  sort: PropTypes.string,
  selectPoint: PropTypes.func,
  sortedCourts: PropTypes.array
};
