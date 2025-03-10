// redux/actions/userActions.js
import {
  fetchTotalSubscriptions,
  fetchUserTopics,
} from "../apiCalls/userApiCalls";
import {
  SET_USER_DATA,
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
} from "../types/userType";

export const setUserData = (userName, totalSubscription, totalTopic) => ({
  type: SET_USER_DATA,
  payload: { userName, totalSubscription, totalTopic },
});

export const fetchUserDataStart = () => ({
  type: FETCH_USER_DATA_START,
});

export const fetchUserDataSuccess = (totalSubscription, totalTopic) => ({
  type: FETCH_USER_DATA_SUCCESS,
  payload: { totalSubscription, totalTopic },
});

export const fetchUserDataFailure = (error) => ({
  type: FETCH_USER_DATA_FAILURE,
  payload: error,
});

export const fetchUserData = (token, storedUserName) => {
  return async (dispatch) => {
    dispatch(fetchUserDataStart());
    try {
      const subscriptionResponse = await fetchTotalSubscriptions(token);
      const topicResponse = await fetchUserTopics(token);
      dispatch(
        fetchUserDataSuccess(
          subscriptionResponse.data.count,
          topicResponse.data.totalTopic
        )
      );
      dispatch(
        setUserData(
          storedUserName,
          subscriptionResponse.data.count,
          topicResponse.data.totalTopic
        )
      );
    } catch (error) {
      dispatch(fetchUserDataFailure(error.message));
    }
  };
};
