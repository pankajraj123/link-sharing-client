// redux/store.js
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './reducers/userReducer';
import topicReducer from './reducers/topicReducer';

const rootReducer = combineReducers({
  user: userReducer,
  topic:topicReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
