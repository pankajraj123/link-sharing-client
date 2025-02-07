// redux/reducers/topicReducer.js
import { SET_TOPICS, SET_LOADING, SET_ERROR } from '../types/topicType';

const initialState = {
  topics: [],
  loading: false,
  error: null,
};

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPICS:
      return {
        ...state,
        topics: action.payload,  
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,  
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,  
      };
    default:
      return state;
  }
};

export default topicReducer;
