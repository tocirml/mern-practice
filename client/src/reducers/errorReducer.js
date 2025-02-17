import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';
import initialState from './initialState';

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return { msg: {}, status: null, id: null };
    default:
      return state;
  }
};

export default errorReducer;
