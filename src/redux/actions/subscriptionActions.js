// src/redux/actions/subscriptionActions.js
import { FETCH_USER_SUBSCRIPTIONS } from "../types/subscriptionTypes";
import {getUserSubscriptions} from '../apiCalls/subscriptionApi'


export const fetchUserSubscriptions = (token) => {
  return async (dispatch) => {
    try {
      const userSubscriptions = await getUserSubscriptions(token);
      dispatch(setUsersubscriptions(userSubscriptions));
    } catch (error) {
      console.error("Error fetching user subscriptions:", error);
    }
  };
};


export const setUsersubscriptions= (userSubscriptions)=>({
type: FETCH_USER_SUBSCRIPTIONS,
payload: userSubscriptions, 
 });