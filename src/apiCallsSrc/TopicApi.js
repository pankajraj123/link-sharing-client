 import Swal from 'sweetalert2'
 import { fetchTopics } from '../redux/actions/topicActions';
 import { axiosInstance } from '../lib/axios';
import { fetchPublicTopic } from '../redux/actions/publicTopicActions';
 import { fetchUserData } from '../redux/actions/userActions';
 
 export const HandleDelete= async(topicId,token,dispatch,storedUsername)=>{
    try{
        await axiosInstance.delete(`deleteTopic/${topicId}`,{
            headers: { Authorization: `Bearer ${token}`}, 
          });
          dispatch(fetchTopics(token));
          dispatch(fetchPublicTopic(token));
          dispatch(fetchUserData(token, storedUsername))
          Swal.fire("Success", "Topic deleted successfully", "success")
    }catch(error){
      Swal.fire("Error", "Topic not  deleted", "success")
    }
}

export const  HandleEdit= async(topicId,token,dispatch,Body)=>{
  try{
    await axiosInstance.put(`editTopic/${topicId}`,Body,{
        headers: { Authorization: `Bearer ${token}`}, 
      });
      dispatch(fetchTopics(token));
      dispatch(fetchPublicTopic(token));
      Swal.fire("Success", "Topic updated successfully", "success")
  }catch(error){
    Swal.fire("Error", "Topic not Updated", "success")
  }
}