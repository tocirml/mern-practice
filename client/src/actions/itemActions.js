import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './types';
import { beginApiCall, apiCallError, endApiCall } from './apiStatusActions';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(beginApiCall());
  axios
    .get('/api/items')
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        items: res.data,
      });
      dispatch(endApiCall());
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch(apiCallError());
    });
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        item: res.data,
      });
      dispatch(endApiCall());
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch(apiCallError());
    });
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_ITEM,
        id,
      });
      dispatch(endApiCall());
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch(apiCallError());
    });
};
