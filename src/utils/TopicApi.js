import Swal from "sweetalert2";
import { fetchTopics } from "../redux/actions/topicActions";
import { axiosInstance } from "../lib/axios";
import { fetchPublicTopic } from "../redux/actions/publicTopicActions";
import { fetchUserData } from "../redux/actions/userActions";
import {  toast } from "react-toastify";

export const createTopic = async (values, userName, dispatch) => {
  const storedData = localStorage.getItem("token");
  const { token } = storedData ? JSON.parse(storedData) : {};
  if (!token) {
    Swal.fire("Error", "User is not authenticated", "error");
    return;
  }
  try {
    const response = await axiosInstance.post(
      "topic-create",
      {
        name: values.name,
        visibility: values.visibility,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchUserData(token, userName));
    dispatch(fetchTopics(token));
    dispatch(fetchPublicTopic(token));
    toast.success("Topic Created SuccessFully");
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 409 || error.response.status === 400)
    ) {
      throw error.response.data.message;
    }
  }
};

export const HandleDelete = async (
  topicId,
  token,
  dispatch,
  storedUserName
) => {
  try {
   await  Swal.fire({
       title: "Are you sure?",
       text: "You Delete Topic Permanently",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: "Yes",
       cancelButtonText: "No",
     })
    await axiosInstance.delete(`delete-topic/${topicId}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTopics(token));
    dispatch(fetchPublicTopic(token));
    dispatch(fetchUserData(token, storedUserName));
  } catch (error) {
    toast.error('Topic Not Deleted');
  }
};
export const HandleEdit = async (topicId, token, dispatch, Body) => {
  try {
    await axiosInstance.put(`edit-topic/${topicId}`, Body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTopics(token));
    dispatch(fetchPublicTopic(token));
   toast.success("Topic Edit Successfully")
  } catch (error) {
    if(error.status===409){
      Swal.fire("Error", error.response.data.message, "error");
    }else{
    Swal.fire("Error", "Topic not Updated", "error");
    }
  }
};

export const handleClickRead = (topicName, topicId, navigate) => {
  localStorage.setItem("topicId", topicId);
  const seoName = topicName.toLowerCase().replace(/\s+/g, "-");
  navigate(`/dashboard/topic-description/${seoName}`);
};
