import { FETCH_TOPIC_DESCRIPTIONS } from "../types/resourceTopicType";
import { getDescription } from "../apiCalls/resourceAPi";

export const  fetchTopicDescription=(token,topicId)=> async(dispatch)=>{
  try{
   const topicDescription= await getDescription(token,topicId);
   console.log(topicDescription);
   dispatch(setTopicDescription(topicDescription))
  }catch(error){
     console.log("Error Fetching Topic Description",error)
  }
};

export const  setTopicDescription=(topicDescription)=>({
    type:  FETCH_TOPIC_DESCRIPTIONS,
    payload: topicDescription
});
