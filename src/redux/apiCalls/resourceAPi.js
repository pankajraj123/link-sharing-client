import { axiosInstance } from "../../lib/axios";

export const getDescription= async(token,topicId)=>{
  try {
         const response = await axiosInstance.get(`get-description/${topicId}`, {
           headers: { Authorization: `Bearer ${token}` },
         });
         return response.data.topicData; 
       } catch (err) {
          return err.message
       }
}
