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
const CLUB = "club";
const SHOP = "shop";
const OTHER = "other";

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
      sortedCourts = courts;
      switch (action.payload) {
        case CLUB:
        case SHOP:
        case COURT:
        case OTHER:
          sortedCourts = state.courts.filter(
            court => court.type === action.payload
          );
          break;
        default:
          sortedCourts = state.courts.filter(court => court.type != null);
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
