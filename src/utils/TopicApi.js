import Swal from "sweetalert2";
import { fetchTopics } from "../redux/actions/topicActions";
import { axiosInstance } from "../lib/axios";
import { fetchPublicTopic } from "../redux/actions/publicTopicActions";
import { fetchUserData } from "../redux/actions/userActions";

export const createTopic = async (values, propsdata, dispatch) => {
  const storedData = localStorage.getItem("token");
  const { token } = storedData ? JSON.parse(storedData) : {};
  if (!token) {
    Swal.fire("Error", "User is not authenticated", "error");
    return;
  }
  try {
    const response = await axiosInstance.post(
      "topiccreate",
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
    dispatch(fetchUserData(token, propsdata));
    dispatch(fetchTopics(token));
    dispatch(fetchPublicTopic(token));
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
  storedUsername
) => {
  try {
    await axiosInstance.delete(`deleteTopic/${topicId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTopics(token));
    dispatch(fetchPublicTopic(token));
    dispatch(fetchUserData(token, storedUsername));
    Swal.fire("Success", "Topic deleted successfully", "success");
  } catch (error) {
    Swal.fire("Error", "Topic not  deleted", "success");
  }
};
export const HandleEdit = async (topicId, token, dispatch, Body) => {
  try {
    await axiosInstance.put(`editTopic/${topicId}`, Body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchTopics(token));
    dispatch(fetchPublicTopic(token));
    Swal.fire("Success", "Topic updated successfully", "success");
  } catch (error) {
    Swal.fire("Error", "Topic not Updated", "success");
  }
};

export const handleClickRead = (topicname, topicId, navigate) => {
  localStorage.setItem("topicId", topicId);
  const formattedTopicName = topicname.toLowerCase().replace(/\s+/g, "-");
  navigate(`/dashboard/topicDescription/${formattedTopicName}`);
};
