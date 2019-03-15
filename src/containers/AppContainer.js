// @flow strict-local

import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

import type { Dispatch as ReduxDispatch } from 'redux';

// Actions to dispatch
import courtActions from '../actions/courtActions';

import type { Court } from '../types';

// Presentational Components
import CourtList from '../components/CourtList';
import Map from '../components/Map';
import SortByButtons from '../components/SortByButtons';
import StyleButtons from '../components/StyleButtons';

type Props = {|
  getCourts: () => (dispatch: ReduxDispatch) => any, // should be typed as a promise
  selectPoint: (index: number) => { type: string, payload: number },
  selectStyle: (style: string) => { type: string, payload: string },
  sortedCourts: Array<Court>,
  styles: string,
  sort: string,
  sortPoints: (type: string) => { type: string, payload: string },
|};

export class AppContainer extends Component<Props> {
  componentDidMount(): void {
    this.props.getCourts();
  }

  render() {
    const {
      sort,
      sortPoints,
      selectPoint,
      sortedCourts,
      styles,
      selectStyle,
    }: Props = this.props;

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
  courts: { sortedCourts, sort, courts },
  styles,
}) => ({
  courts,
  sort,
  sortedCourts,
  styles,
});

export default connect(
  mapStateToProps,
  courtActions
)(AppContainer);
