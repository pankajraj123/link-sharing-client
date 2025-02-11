import { axiosInstance } from "../../lib/axios";
 
export const getUserSubscriptions=async(token)=>{
try {
    const response = await axiosInstance.get("getUserSubscriptions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.userSubscriptions;
  } catch (error) {
    console.error("Error fetching user subscriptions:", error);
  }
}