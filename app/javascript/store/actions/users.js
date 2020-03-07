import axios from 'axios';

export const LOAD_USERS_SUCCESS = '[USERS] LOAD USERS SUCCESS';

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
