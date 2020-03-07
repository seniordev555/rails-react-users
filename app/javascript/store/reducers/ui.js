import * as Actions from '../actions';

const initialState = {
  isLeftDrawerOpened: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.TOGGLE_DRAWER:
      return {
        ...state,
        isLeftDrawerOpened: action.payload,
      };

    default:
      return state;
  }
};
