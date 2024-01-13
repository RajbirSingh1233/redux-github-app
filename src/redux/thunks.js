// src/redux/thunks.js
import axios from 'axios';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from './action';

export const fetchUser = (username) => async (dispatch, getState) => {
  dispatch(fetchUserRequest());

  try {
    const { data } = await axios.get(`https://api.github.com/users/${username}`);

    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
  }
};