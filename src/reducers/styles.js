const { SELECT_STYLE } = require('../actions/courtActions');

const initialState = {
  styles: 'wimbledon',
};

const styles = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STYLE:
      return {
        ...state,
        styles: action.payload,
      };
    default:
      return state;
  }
};

export default styles;
