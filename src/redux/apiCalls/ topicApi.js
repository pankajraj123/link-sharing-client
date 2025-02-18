// redux/apiCalls/topicApi.js
import { axiosInstance } from "../../lib/axios";

export const getTopics = async (token) => {
  try {
    const response = await axiosInstance.get("get-user-topic", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.topic;
  } catch (error) {
    throw new Error(error.message || "Error fetching topics");
  }
};
