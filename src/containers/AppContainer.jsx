import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Action to dispatch
import { getCourts, selectStyle, sortPoints, selectPoint, updateSort } from '../actions/courtActions';

// Dumb Components
import Map from '../components/Map';
import ButtonPannel from '../components/ButtonPannel';
import CourtList from '../components/CourtList';
import Key from '../components/Key';

class App extends Component {
  componentDidMount() {
    this.props.getCourts();
  }

  render() {
    const selectedPointLength = this.props.selectedPoint.length > 0;
    return (
      <div id="mainContainer">
        <div id="title"> Tennis Courts in San Francisco </div>
        <div id="sideContainer">
          <CourtList
            sort={this.props.sort}
            sortPoints={this.props.sortPoints}
            selectPoint={this.props.selectPoint}
            courts={selectedPointLength ? this.props.selectedPoint : this.props.sortedCourts}
          />
        </div>
        <Map
          courts={selectedPointLength ? this.props.selectedPoint : this.props.sortedCourts}
          style={this.props.style}
        />
        <div id="keyContainer">
          <Key
            updateSort={this.props.updateSort}
            sortPoints={this.props.sortPoints}
          />
        </div>
        <div id="styleSelectorContainer">
          <ButtonPannel selectStyle={this.props.selectStyle} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    courts: state.courts.courts,
    style: state.styles.styles,
    sortedCourts: state.courts.sortedCourts,
    selectedPoint: state.courts.selectedPoint,
    sort: state.courts.sort,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCourts,
    selectStyle,
    sortPoints,
    selectPoint,
    updateSort,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  style: PropTypes.string,
  getCourts: PropTypes.func.isRequired,
  updateSort: PropTypes.func.isRequired,
  selectedPoint: PropTypes.object,
  sort: PropTypes.func,
  sortPoints: PropTypes.func,
  selectStyle: PropTypes.func.isRequired,
  selectPoint: PropTypes.func,
  sortedCourts: PropTypes.arryOf(React.propTypes.object),
};

App.defaultProps = {
  style: PropTypes.string,
  sortPoints: PropTypes.func,
  selectedPoint: PropTypes.object,
  sort: PropTypes.func,
  selectPoint: PropTypes.func,
  sortedCourts: PropTypes.arryOf(React.propTypes.object),
};
