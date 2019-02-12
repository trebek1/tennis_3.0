import axios from 'axios';

export const GET_COURTS = 'GET_COURTS';
export const SELECT_POINT = 'SELECT_POINT';
export const SELECT_STYLE = 'SELECT_STYLE';
export const SORT_POINTS = 'SORT_POINTS';
export const UPDATE_SORT = 'UPDATE_SORT';


export const getCourts = () => (dispatch) => axios.get('/courts').then((response) => dispatch({ type: GET_COURTS, payload: response.data }));

export const selectStyle = (type) => ({ type: SELECT_STYLE, payload: type });

export const sortPoints = (type) => ({ type: SORT_POINTS, payload: type });

export const selectPoint = (index) => ({ type: SELECT_POINT, payload: index });

export const updateSort = (sort) => ({ type: UPDATE_SORT, payload: sort });
