// @flow strict-local

import axios from 'axios';

import type { Dispatch as ReduxDispatch } from 'redux';

export const GET_COURTS: string = 'GET_COURTS';
export const SELECT_POINT: string = 'SELECT_POINT';
export const SELECT_STYLE: string = 'SELECT_STYLE';
export const SORT_POINTS: string = 'SORT_POINTS';

export const getCourts = () => (dispatch: ReduxDispatch) =>
  axios
    .get('/courts')
    .then(response => dispatch({ type: GET_COURTS, payload: response.data }));

export const selectStyle = (
  style: string
): { type: string, payload: string } => ({
  type: SELECT_STYLE,
  payload: style,
});

export const sortPoints = (
  type: string
): { type: string, payload: string } => ({
  type: SORT_POINTS,
  payload: type,
});

export const selectPoint = (
  index: number
): { type: string, payload: number } => ({
  type: SELECT_POINT,
  payload: index,
});

export default {
  getCourts,
  selectStyle,
  sortPoints,
  selectPoint,
};
