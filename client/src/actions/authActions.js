import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './types';

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

//Register
export const register = ({ name, email, password }) => dispatch => {
  //Headers
  const config = {
    headers: { 'Content-type': 'application/json' },
  };

  const body = JSON.stringify({ name, email, password });
  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

export const login = ({ email, password }) => dispatch => {
  //Headers
  const config = {
    headers: { 'Content-type': 'application/json' },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};

export const tokenConfig = getState => {
  //Get token from localstorage
  const token = localStorage.getItem('token');

  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  //if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
