import { FETCH_TOPIC_DISCRIPTIONS } from "../types/resourceTopicType";
import { getDiscription } from "../apiCalls/resourceAPi";

export const  fetchTopicDiscription=(token,topicId)=> async(dispatch)=>{
  try{
   const topicDescription= await getDiscription(token,topicId);
   console.log(topicDescription);
   dispatch(setTopicDiscription(topicDescription))
  }catch(error){
     console.log("Error Fetching Topic Discription",error)
  }
};

export const  setTopicDiscription=(topicDescription)=>({
    type:  FETCH_TOPIC_DISCRIPTIONS,
    payload: topicDescription
});
