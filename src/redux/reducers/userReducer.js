// redux/reducers/userReducer.js
import { SET_USER_DATA, FETCH_USER_DATA_START, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE } from '../types';

const initialState = {
  username: '',
  totalSubscription: 0,
  totalTopic: 0,
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_START:
      return { ...state, loading: true };
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, loading: false, totalSubscription: action.payload.totalSubscription, totalTopic: action.payload.totalTopic };
    case FETCH_USER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_USER_DATA:
      return { ...state, username: action.payload.username };
    default:
      return state;
  }
};

export default userReducer;
