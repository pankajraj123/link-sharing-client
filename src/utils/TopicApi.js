import Swal from "sweetalert2";
import { fetchTopics } from "../redux/actions/topicActions";
import { axiosInstance } from "../lib/axios";
import { fetchPublicTopic } from "../redux/actions/publicTopicActions";
import { fetchUserData } from "../redux/actions/userActions";
import {  toast } from "react-toastify";
import { TOPIC_EDIT_FAILURE,TOPIC_CREATE_FAILURE,TOPIC_CREDENTIAL_FAILURE,TOPIC_CREATE_SUCCESS,TOPIC_DELETE_FAILURE,TOPIC_DELETE_WARNING ,TOPIC_EDIT_SUCCESS} from "../constants/Topic.constant";

export const createTopic = async (values, userName, dispatch) => {
  const storedData = localStorage.getItem("token");
  const { token } = storedData ? JSON.parse(storedData) : {};
  if (!token) {
    Swal.fire("Error", TOPIC_CREDENTIAL_FAILURE, "error");
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
    toast.success(TOPIC_CREATE_SUCCESS);
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 409 || error.response.status === 400)
    ) {
      throw TOPIC_CREATE_FAILURE;
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
       text: TOPIC_DELETE_WARNING,
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
    toast.error(TOPIC_DELETE_FAILURE)
};
}

export const HandleEdit = async (topicId, token, dispatch, Body) => {
  try {
    await axiosInstance.put(`edit-topic/${topicId}`, Body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTopics(token));
    dispatch(fetchPublicTopic(token));
   toast.success(TOPIC_EDIT_SUCCESS)
  } catch (error) {
    if(error.status===409){
      Swal.fire("Error", error.response.data.message, "error");
    }else{
    Swal.fire("Error", TOPIC_EDIT_FAILURE, "error");
    }
  }
};

export const handleClickRead = (topicName, topicId, navigate) => {
  localStorage.setItem("topicId", topicId);
  const seoName = topicName.toLowerCase().replace(/\s+/g, "-");
  navigate(`/dashboard/topic-description/${seoName}`);
};
