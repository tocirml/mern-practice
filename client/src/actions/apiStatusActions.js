import { BEGIN_API_CALL, API_CALL_ERROR, END_API_CALL } from './types';

export const beginApiCall = () => ({ type: BEGIN_API_CALL });

export const apiCallError = () => ({ type: API_CALL_ERROR });

export const endApiCall = () => ({ type: END_API_CALL });
