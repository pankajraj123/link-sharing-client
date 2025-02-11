import { axiosInstance } from "../../lib/axios";

export const getDiscription= async(token,topicId)=>{
  try {
         const response = await axiosInstance.get(`getDiscription/${topicId}`, {
           headers: { Authorization: `Bearer ${token}` },
         });
         return response.data.topicData; 
       } catch (err) {
          return err.message
       }
}