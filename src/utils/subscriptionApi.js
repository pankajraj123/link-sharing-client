 import  {axiosInstance} from '../lib/axios'
 import {fetchUserSubscriptions} from '../redux/actions/subscriptionActions'
 import { fetchUserData } from '../redux/actions/userActions';
 import Swal from "sweetalert2";
 import {toast} from 'react-toastify'
 import {SUBSCRIBE_FAILURE,SUBSCRIBE_SUCCESS,UNSUBSCRIBE_FAILURE,UNSUBSCRIBE_SUCCESS} from '../constants/Subscription.constant'
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
      toast.success(SUBSCRIBE_SUCCESS);
    } catch(error){
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: SUBSCRIBE_FAILURE,
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
        toast.success(UNSUBSCRIBE_SUCCESS);
      }catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: UNSUBSCRIBE_FAILURE,
        });
      }
};
  