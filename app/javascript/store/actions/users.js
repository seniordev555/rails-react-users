import axios from 'axios';

export const LOAD_USERS_SUCCESS = '[USERS] LOAD USERS SUCCESS';
export const CREATE_USER_SUCCESS = '[USERS] CREATE USER SUCCESS';
export const GET_USER_SUCCESS = '[USERS] GET USER SUCCESS';
export const UPDATE_USER_SUCCESS = '[USERS] UPDATE USER SUCCESS';
export const DELETE_USER_SUCCESS = '[USERS] DELETE USER SUCCESS';

export const loadUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/users.json');
    dispatch({ type: LOAD_USERS_SUCCESS, payload: data });
    return data;
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users.json', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: CREATE_USER_SUCCESS, payload: data });
    return data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const getUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}.json`);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    return data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const updateUser = (userId, user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/users/${userId}.json`, user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    return data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const deleteUser = (user) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${user.id}.json`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: user });
  } catch (err) {
    console.error(err);
  }
  return null;
};
