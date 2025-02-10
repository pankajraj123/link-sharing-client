import {
//   SUBSCRIBE,
//   UNSUBSCRIBE,
  FETCH_USER_SUBSCRIPTIONS,
} from "../types/subscriptionTypes";

const initialState = {
  subscriptions: {}, // { topicId: seriousness }
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SUBSCRIBE:
    //   return {
    //     ...state,
    //     subscriptions: {
    //       ...state.subscriptions,
    //       [action.payload.topicId]: action.payload.seriousness,
    //     },
    //   };
    // case UNSUBSCRIBE:
    //   const { [action.payload]: removed, ...remainingSubscriptions } =
    //     state.subscriptions;
    //   return {
    //     ...state,
    //     subscriptions: remainingSubscriptions,
    //   };
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
