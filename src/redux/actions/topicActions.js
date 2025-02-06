// redux/actions/topicActions.js
import { SET_TOPICS, SET_LOADING, SET_ERROR } from '../types';
import { getTopics } from '../apiCalls/ topicApi'; 


export const fetchTopics = (token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const topics = await getTopics(token); 
    dispatch(setTopics(topics)); 
    dispatch(setLoading(false)); 
  } catch (error) {
    dispatch(setError(error.message || 'Error fetching topics')); 
    dispatch(setLoading(false));  
  }
};


export const setTopics = (topics) => ({
  type: SET_TOPICS,
  payload: topics,  
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading, 
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
