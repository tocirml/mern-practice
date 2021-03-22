import { BEGIN_API_CALL, API_CALL_ERROR, END_API_CALL } from '../actions/types';
import initialState from './initialState';

// const actionTypeEndsInSucess = (action) =>
//   action.substring(action.length - 8) === '_SUCCESS';

const apiCallStatusReducer = (
  state = initialState.apiCallsInProgress,
  action
) => {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  } else if (action.type === API_CALL_ERROR || action.type === END_API_CALL) {
    return state - 1;
  }
  return state;
};

export default apiCallStatusReducer;
