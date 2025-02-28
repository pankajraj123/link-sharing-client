// redux/store.js
import { legacy_createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./reducers/userReducer";
import topicReducer from "./reducers/topicReducer";
import publicReducers from "./reducers/publicReducers";
import subscriptionReducer from "./reducers/subscriptionReducer";
import resourceReducer from "./reducers/resourceReducer";
import postReducer from "./reducers/postReducer";


const rootReducer = combineReducers({
  user: userReducer,
  topic: topicReducer,
  publicTopics: publicReducers,
  subscriptions: subscriptionReducer,
  topicData: resourceReducer,
  posts:postReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
