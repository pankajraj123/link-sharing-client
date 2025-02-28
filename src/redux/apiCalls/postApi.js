import { axiosInstance } from "../../lib/axios";

export const getUserPost = async (token) => {
  try {
    const response = await axiosInstance.get(`get-user-topic-resource`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.userResourceData;
  } catch (error) {
    return error.message;
  }
};
