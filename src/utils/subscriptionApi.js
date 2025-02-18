 import  {axiosInstance} from '../lib/axios'
 import {fetchUserSubscriptions} from '../redux/actions/subscriptionActions'
 import { fetchUserData } from '../redux/actions/userActions';
 import Swal from "sweetalert2";
 import {toast} from 'react-toastify'
 export const handleSubscribe = async (topicId,token,seriousness,dispatch,userName) => {
    try {
      await axiosInstance.post(
        `subscribe/${topicId}`,
        { seriousness},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(fetchUserSubscriptions(token));
      dispatch(fetchUserData(token,userName));
      toast.success("subscribed Successfully")
    } catch(error){
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error subscribing to the topic.",
      });
    }
  };


 export const handleUnsubscribe = async (topicId,token,dispatch,userName) => {
      try {
         await axiosInstance.delete(`unsubscribe/${topicId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(fetchUserSubscriptions(token));
        dispatch(fetchUserData(token,userName));
        toast.success("unSubscribed Successfully");
      }catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an error unsubscribing from the topic.",
        });
      }
};
  