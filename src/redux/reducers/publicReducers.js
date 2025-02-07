import {SET_PUBLIC_TOPIC,SET_PUBLIC_TOPIC_ERROR}  from '../types/publicTopicType'

const initialState={
    publicTopics:[],
    error:null
}

const publicReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_PUBLIC_TOPIC:
      return {
        ...state,
        publicTopics: action.payload,  
      };
    case SET_PUBLIC_TOPIC_ERROR:
      return {
        ...state,
        error: action.payload,  
      };
    default:
      return state;
  }
};

export default publicReducers;
