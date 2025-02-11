// redux/apiCalls/userApiCalls.js
import { axiosInstance } from "../../lib/axios";

export const fetchTotalSubscriptions = (token) => {
  return axiosInstance.get("getTotalSubscription", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUserTopics = (token) => {
  return axiosInstance.get("getUserTopic", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

