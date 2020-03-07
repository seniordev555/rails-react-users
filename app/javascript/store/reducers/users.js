import * as Actions from '../actions';

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOAD_USERS_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
      };

    default:
      return state;
  }
};
