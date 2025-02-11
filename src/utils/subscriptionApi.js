 import  {axiosInstance} from '../lib/axios'
 import {fetchUserSubscriptions} from '../redux/actions/subscriptionActions'
 import { fetchUserData } from '../redux/actions/userActions';
 import Swal from "sweetalert2";

 export const handleSubscribe = async (topicId,token,seriousness,dispatch,username) => {
    try {
      await axiosInstance.post(
        `subscribe/${topicId}`,
        { seriousness},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(fetchUserSubscriptions(token));
      dispatch(fetchUserData(token,username));
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: `You have subscribed with seriousness level`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error subscribing to the topic.",
      });
    }
  };


 export const handleUnsubscribe = async (topicId,token,dispatch,username) => {
      try {
         await axiosInstance.delete(`unsubscribe/${topicId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(fetchUserSubscriptions(token));
        dispatch(fetchUserData(token,username));
        Swal.fire({
          icon: "info",
          title: "Unsubscribed",
          text: "You have unsubscribed from the topic.",
        });
      }catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error unsubscribing from the topic.",
        });
      }
};
  