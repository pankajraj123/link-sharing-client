// src/redux/reducers/subscriptionReducer.js
import { FETCH_USER_SUBSCRIPTIONS } from "../types/subscriptionTypes";

const initialState = {
  subscriptions: [],
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
      };
    default:
      return state;
  }
};

export default subscriptionReducer;
