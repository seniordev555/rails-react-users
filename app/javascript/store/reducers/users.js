import unionBy from 'lodash/unionBy';
import castArray from 'lodash/castArray';
import orderBy from 'lodash/orderBy';
import * as Actions from '../actions';

const initialState = {
  data: [],
};

const loadUsers = (state, users) => {
  const list = orderBy(
    unionBy(castArray(users), state.data, 'id'),
    [(e) => `${e.first_name} ${e.last_name}`],
    ['asc']
  );

  return {
    ...state,
    data: list,
  };
};

const createUser = (state, user) => {
  const { data } = state;

  return {
    ...state,
    data: [...data, user],
  };
};

const updateUser = (state, user) => {
  const { data } = state;
  const index = data.findIndex((e) => e.id === user.id);

  if (index === -1) {
    return createUser(state, user);
  }

  return {
    ...state,
    data: [...data.slice(0, index), user, ...data.slice(index + 1)],
  };
};

const deleteUser = (state, user) => {
  const { data } = state;
  const index = data.findIndex((e) => e.id === user.id);

  return {
    ...state,
    data: [...data.slice(0, index), ...data.slice(index + 1)],
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOAD_USERS_SUCCESS:
      return loadUsers(state, action.payload);

    case Actions.CREATE_USER_SUCCESS:
      return createUser(state, action.payload);

    case Actions.UPDATE_USER_SUCCESS:
      return updateUser(state, action.payload);

    case Actions.GET_USER_SUCCESS:
      return updateUser(state, action.payload);

    case Actions.DELETE_USER_SUCCESS:
      return deleteUser(state, action.payload);

    default:
      return state;
  }
};
