// redux/apiCalls/userApiCalls.js
import { axiosInstance } from "../../lib/axios";

export const fetchTotalSubscriptions = (token) => {
  return axiosInstance.get("get-total-subscription", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUserTopics = (token) => {
  return axiosInstance.get("get-user-topic", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

