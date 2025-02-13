import {
  SET_USER_DATA,
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
} from "../types/userType";

const initialState = {
  userName: "",
  totalSubscription: 0,
  totalTopic: 0,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_START:
      return { ...state, loading: true };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        totalSubscription: action.payload.totalSubscription,
        totalTopic: action.payload.totalTopic,
      };
    case FETCH_USER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_USER_DATA:
      return { ...state, userName: action.payload.userName };
    default:
      return state;
  }
};

export default userReducer;
