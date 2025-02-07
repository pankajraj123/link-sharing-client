import {SET_PUBLIC_TOPIC_ERROR,SET_PUBLIC_TOPIC} from  '../types/publicTopicType'
import {getPublicTopic} from '../apiCalls/publicTopicApi'

export const fetchPublicTopic =(token)=> async (dispatch)=>{
try{
  const publicTopics= await getPublicTopic(token);
  console.log(publicTopics)
  dispatch(setPublicTopic(publicTopics));
}catch(error){
 dispatch(setError(error.message));
}
}

export const setPublicTopic= (publicTopics)=>({
 type: SET_PUBLIC_TOPIC,
   payload:publicTopics,
});

export const setError= (error)=>({
    type: SET_PUBLIC_TOPIC_ERROR,
      payload: error,
});