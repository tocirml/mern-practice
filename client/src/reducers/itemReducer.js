// import { v4 as uuidv4 } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';
import initialState from './initialState';

const itemReducer = (state = initialState.items, action) => {
  switch (action.type) {
    case GET_ITEMS:
      console.log(action.items);
      return action.items;
    case ADD_ITEM:
      return [...state, action.item];
    case DELETE_ITEM:
      console.log('Reduce id: ', action.id);
      return state.filter((item) => item._id !== action.id);
    default:
      return state;
  }
};

export default itemReducer;
