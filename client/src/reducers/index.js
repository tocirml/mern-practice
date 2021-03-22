import { combineReducers } from 'redux';
import items from './itemReducer';
import apiCallsInProgress from './apiStatusReducer';

export default combineReducers({
  items,
  apiCallsInProgress,
  // auth: authReducer
});
