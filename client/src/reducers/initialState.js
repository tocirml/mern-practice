const initialState = {
  items: [],
  apiCallsInProgress: 0,
  error: {
    msg: {},
    status: null,
    id: null,
  },
  auth: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: false,
  },
};

export default initialState;
