const { SELECT_STYLE } = require('../actions/courtActions');

export const initialState = 'wimbledon';

const styles = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STYLE:
      return action.payload;
    default:
      return state;
  }
};

export default styles;
