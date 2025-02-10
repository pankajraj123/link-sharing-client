import {
  // SUBSCRIBE,
  // UNSUBSCRIBE,
  FETCH_USER_SUBSCRIPTIONS,
} from "../types/subscriptionTypes";
import Swal from "sweetalert2";
import {
  // subscribeToTopicApi,
  // unsubscribeFromTopicApi,
  fetchUserSubscriptionsApi,
} from "../apiCalls/subscriptionApi";

// export const subscribeToTopic =
//   (token, topicId, seriousness) => async (dispatch) => {
//     try {
//       const response = await subscribeToTopicApi(token, topicId, seriousness);
//       dispatch({ type: SUBSCRIBE, payload: { topicId, seriousness } });
//       Swal.fire({
//         icon: "success",
//         title: "Subscribed!",
//         text: `You have subscribed with seriousness level: ${seriousness}`,
//       });
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "There was an error subscribing to the topic.",
//       });
//       console.error("Error subscribing to topic:", error);
//     }
//   };

// export const unsubscribeFromTopic = (token, topicId) => async (dispatch) => {
//   try {
//     await unsubscribeFromTopicApi(token, topicId);
//     dispatch({ type: UNSUBSCRIBE, payload: topicId });
//     Swal.fire({
//       icon: "info",
//       title: "Unsubscribed",
//       text: `You have unsubscribed from the topic.`,
//     });
//   } catch (error) {
//     Swal.fire({
//       icon:"error",
//       title:"Error!",
//       text:"There was an error unsubscribing from the topic.",
//     });
//     console.error("Error unsubscribing from topic:", error);
//   }
// };

export const fetchUserSubscriptions = (token) => async (dispatch) => {
  try {
    const response = await fetchUserSubscriptionsApi(token);
    const userSubscriptions = response.data.userSubscriptions
    dispatch({ type: FETCH_USER_SUBSCRIPTIONS, payload: userSubscriptions });
  } catch (error) {
    console.error("Error fetching user subscriptions:", error);
  }
};
