import { combineReducers } from 'redux';
import items from './itemReducer';
import error from './errorReducer';
import auth from './authReducer';
import apiCallsInProgress from './apiStatusReducer';

export default combineReducers({
  items,
  apiCallsInProgress,
  auth,
  error,
});
