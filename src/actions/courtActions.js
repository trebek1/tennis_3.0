import axios from 'axios';

export function getCourts() {
  return (dispatch) => {
    axios.get('/courts')
      .then((response) => {
        dispatch({ type: 'GET_COURTS', payload: response.data });
      })
      .catch(() => {
        // console.log('an error occurred ', err);
      });
  };
}

export function selectStyle(type) {
  return { type: 'SELECT_STYLE', payload: type };
}

export function sortPoints(type) {
  return { type: 'SORT_POINTS', payload: type };
}

export function selectPoint(index) {
  return { type: 'SELECT_POINT', payload: index };
}

export function updateSort(sort) {
  return { type: 'UPDATE_SORT', payload: sort };
}
