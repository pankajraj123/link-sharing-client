import {
  FETCH_USER_POST,
} from "../types/post";
import {  getUserPost } from "../apiCalls/postApi";

export const fetchUserPost = (token) => async (dispatch) => {
  try {
    const userPost = await getUserPost(token);
    dispatch(setUserPost(userPost));
  } catch (error) {
    console.log("Error Fetching User Post", error);
  }
};

export const setUserPost = (userPost) => ({
  type: FETCH_USER_POST,
  payload: userPost,
});
