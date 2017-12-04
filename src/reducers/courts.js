
const initialState = {
  courts: [],
  sortedCourts: [],
  selectedPoint: [],
  sort: 'all',
};

const courts = (state = initialState, action) => {
  let sortedCourts;
  let selectedPoint;
  switch (action.type) {
    case 'GET_COURTS':
      return Object.assign({}, state, {
        courts: action.payload[0].sfcourts,
        sortedCourts: action.payload[0].sfcourts,
      });
    case 'SORT_POINTS':
      if (action.payload === 'club') {
        sortedCourts = state.courts.filter(court => court.Type === 'club');
      } else if (action.payload === 'court') {
        sortedCourts = state.courts.filter(court => court.Type === 'Court');
      } else if (action.payload === 'shop') {
        sortedCourts = state.courts.filter(court => court.Type === 'shop');
      } else if (action.payload === 'other') {
        sortedCourts = state.courts.filter(court => court.Type === 'Other');
      } else if (action.payload === 'all') {
        sortedCourts = state.courts.filter(court => court.Type != null);
      } else {
        sortedCourts = state.sortedCourts;
      }
      return Object.assign({}, state, {
        sortedCourts,
        selectedPoint: [],
      });
    case 'SELECT_POINT':
      selectedPoint = state.sortedCourts[action.payload];
      return Object.assign({}, state, {
        selectedPoint: [selectedPoint],
      });

    case 'UPDATE_SORT':
      return Object.assign({}, state, {
        sort: action.payload,
      });

    default:
      return state;
  }
};

export default courts;
