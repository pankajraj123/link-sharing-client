import { axiosInstance } from "../../lib/axios"; // Adjust this to your axios instance

// export const subscribeToTopicApi = (token, topicId, seriousness) => {
//   return axiosInstance.post(
//     `subscribe/${topicId}`,
//     { seriousness },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

// export const unsubscribeFromTopicApi = (token, topicId) => {
//   return axiosInstance.delete(`unsubscribe/${topicId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

export const fetchUserSubscriptionsApi = (token) => {
  return axiosInstance.get("getUserSubscriptions", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
