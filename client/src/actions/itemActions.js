import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './types';
import { beginApiCall, apiCallError, endApiCall } from './apiStatusActions';

export const getItems = () => (dispatch) => {
  dispatch(beginApiCall());
  axios
    .get('/api/items')
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        items: res.data,
      });
      dispatch(endApiCall());
    })
    .catch((error) => {
      dispatch(apiCallError());
      console.log(`Error: ${error}`);
    });
};

export const addItem = (item) => (dispatch) => {
  axios
    .post('/api/items', item)
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        item: res.data,
      });
      dispatch(endApiCall());
    })
    .catch((error) => {
      dispatch(apiCallError());
      console.log(`Error: ${error}`);
    });
};

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        id,
      });
      dispatch(endApiCall());
    })
    .catch((error) => {
      dispatch(apiCallError());
      console.log(`Error: ${error}`);
    });
};

// THUNKS
