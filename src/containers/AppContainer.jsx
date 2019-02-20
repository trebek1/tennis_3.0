import React, { Component } from "react";
import PropTypes from "prop-types";

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
  getCourts: PropTypes.func.isRequired,
  selectedPoint: PropTypes.array,
  selectPoint: PropTypes.func,
  selectStyle: PropTypes.func.isRequired,
  sortedCourts: PropTypes.array,
  style: PropTypes.string,
  sort: PropTypes.string,
  sortPoints: PropTypes.func,
  updateSort: PropTypes.func.isRequired
};

App.defaultProps = {
  style: PropTypes.string,
  sortPoints: PropTypes.func,
  selectedPoint: PropTypes.array,
  sort: PropTypes.string,
  selectPoint: PropTypes.func,
  sortedCourts: PropTypes.array
};
