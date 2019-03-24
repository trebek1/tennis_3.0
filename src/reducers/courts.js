// @flow strict-local

import type { Court } from '../types';

import { GET_COURTS, SORT_POINTS, SELECT_POINT } from '../actions/courtActions';

type State = {
  courts: Array<Court>,
  sortedCourts: Array<Court>,
  selectedPoint: Array<Court>,
  sort: string,
};

export const initialState: State = {
  courts: [],
  sortedCourts: [],
  selectedPoint: [],
  sort: 'all',
};

const COURT = 'court';
const CLUB = 'club';
const SHOP = 'shop';
const OTHER = 'other';

const courts = (
  state: State = initialState,
  action: { type: string, payload: Object }
) => {
  let { sort, sortedCourts } = state;
  switch (action.type) {
    case GET_COURTS:
      return {
        ...state,
        courts: action.payload[0].sfcourts,
        sortedCourts: action.payload[0].sfcourts,
      };
    case SORT_POINTS:
      switch (action.payload) {
        case CLUB:
        case SHOP:
        case COURT:
        case OTHER:
          // $FlowFixMe
          sort = action.payload;
          // $FlowFixMe
          sortedCourts = state.courts.filter(
            court => court.type === action.payload
          );
          break;
        default:
          sort = 'all';
          sortedCourts = [...state.courts];
          break;
      }
      return {
        ...state,
        sort,
        sortedCourts,
      };
    case SELECT_POINT:
      return {
        ...state,
        sortedCourts: [sortedCourts[action.payload]],
      };

    default:
      return state;
  }
};

export default courts;
