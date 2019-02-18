const {
  GET_COURTS,
  SORT_POINTS,
  SELECT_POINT
} = require("../actions/courtActions");

const initialState = {
  courts: [],
  sortedCourts: [],
  selectedPoint: [],
  sort: "all"
};

const COURT = "court";
const COURT_TYPE = "Court";
const CLUB = "club";
const SHOP = "shop";
const OTHER = "other";
const OTHER_TYPE = "Other";

const courts = (state = initialState, action) => {
  let { sortedCourts } = state;
  let selectedPoint;
  switch (action.type) {
    case GET_COURTS:
      return {
        ...state,
        courts: action.payload[0].sfcourts,
        sortedCourts: action.payload[0].sfcourts
      };
    case SORT_POINTS:
      sortedCourts = [];
      switch (action.payload) {
        case CLUB:
        case SHOP:
          sortedCourts = state.courts.filter(
            court => court.Type === action.payload
          );
          break;
        case COURT:
          sortedCourts = state.courts.filter(
            court => court.Type === COURT_TYPE
          );
          break;
        case OTHER:
          sortedCourts = state.courts.filter(
            court => court.Type === OTHER_TYPE
          );
          break;
        default:
          sortedCourts = state.courts.filter(court => court.Type != null);
          break;
      }
      return {
        ...state,
        sortedCourts,
        selectedPoint: []
      };
    case SELECT_POINT:
      selectedPoint = sortedCourts[action.payload];
      return {
        ...state,
        selectedPoint: [selectedPoint]
      };

    default:
      return state;
  }
};

export default courts;
