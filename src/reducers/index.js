// @flow strict-local

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import courts from './courts';
import styles from './styles';

import type { Court } from '../types';

const reducers: {
  courts: {
    courts: Array<Court>,
    sortedCourts: Array<Court>,
    selectedPoint: Array<Court>,
    sort: string,
  },
  routing: any,
  styles: string,
} = combineReducers({
  courts,
  routing: routerReducer,
  styles,
});

export default reducers;
