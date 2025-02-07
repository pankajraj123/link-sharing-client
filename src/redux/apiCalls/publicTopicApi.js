import { axiosInstance } from "../../lib/axios"
export const  getPublicTopic =async (token)=> {
    try {
      const response = await axiosInstance.get('getPublicTopic', {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      return response.data.topic;  
    } catch (error) {
      throw new Error(error.message || 'Error fetching topics');
    }
  };
  