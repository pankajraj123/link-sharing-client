import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { axiosInstance } from "../lib/axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicTopic } from "../redux/actions/publicTopicActions";
import { fetchUserData } from "../redux/actions/userActions";

const PublicTopic = ({ token, username }) => {
  const [subscriptions, setSubscriptions] = useState({});
  const dispatch = useDispatch();

  const { publicTopics, error } = useSelector((state) => state.publicTopics);

  useEffect(() => {
    if (token) {
      dispatch(fetchPublicTopic(token));
      axiosInstance
        .get("getUserSubscriptions", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data.userSubscriptions);
          const userSubscriptions = response.data.userSubscriptions.reduce(
            (acc, subscription) => {
              acc[subscription.topicId] = subscription.seriousness;
              return acc;
            },
            {}
          );
          setSubscriptions(userSubscriptions);
        })
        .catch((error) => {
          console.error("Error fetching user subscriptions:", error);
        });
    }
  }, [token, dispatch]);

  const formik = useFormik({
    initialValues: {
      seriousness: "Casual", // Default seriousness level
    },
  });

  const handleSubscribe = async (topicId) => {
    try {
      const response = await axiosInstance.post(
        `subscribe/${topicId}`,
        { seriousness: formik.values.seriousness },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update subscriptions state
      setSubscriptions((prevSubscriptions) => ({
        ...prevSubscriptions,
        [topicId]: formik.values.seriousness,
      }));
      dispatch(fetchPublicTopic(token));
      dispatch(fetchUserData(token, username));
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: `You have subscribed with seriousness level: ${formik.values.seriousness}`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error subscribing to the topic.",
      });
      console.error("Error subscribing to topic:", error);
    }
  };

  const handleUnsubscribe = async (topicId) => {
    try {
      await axiosInstance.delete(`unsubscribe/${topicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      setSubscriptions((prevSubscriptions) => {
        const newSubscriptions = { ...prevSubscriptions };
        delete newSubscriptions[topicId];
        return newSubscriptions;
      });
      dispatch(fetchPublicTopic(token));
      dispatch(fetchUserData(token, username));
      Swal.fire({
        icon: "info",
        title: "Unsubscribed",
        text: `You have unsubscribed from the topic.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error unsubscribing from the topic.",
      });
      console.error("Error unsubscribing from topic:", error);
    }
  };

  const isSubscribed = (topicId) => {
    return subscriptions.hasOwnProperty(topicId);
  };

  return (
    <div>
      <h1>Public Topics</h1>
      {publicTopics.length > 0 ? (
        publicTopics.map((topic, index) => (
          <Card key={index} className="shadow-sm p-3 mb-3 rounded topic-card">
            <Card.Body>
              <h6>
                <strong>Name:</strong> {topic.name}
              </h6>
              <p>
                <strong>Visibility:</strong> {topic.visibility}
              </p>
              <p>
                <strong>Created By:</strong> {topic.username}
              </p>
              <p>
                <strong>Date Created:</strong>{" "}
                {new Date(topic.dateCreated).toLocaleDateString()}
              </p>
            </Card.Body>
            {topic.username !== username && (
              <div className="d-flex gap-2">
                {isSubscribed(topic._id) ? (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUnsubscribe(topic._id)}
                    >
                      Unsubscribe
                    </button>
                    <span className="ml-2">
                      <strong>Seriousness:</strong> {subscriptions[topic._id]}
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSubscribe(topic._id)}
                    >
                      Subscribe
                    </button>
                    <form>
                      <select
                        className="form-select"
                        aria-label="Seriousness select"
                        value={formik.values.seriousness}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="seriousness"
                      >
                        <option value="Casual">Casual</option>
                        <option value="Serious">Serious</option>
                        <option value="Very Serious">Very Serious</option>
                      </select>
                    </form>
                  </>
                )}
              </div>
            )}
          </Card>
        ))
      ) : (
        <p>No topics found.</p>
      )}
    </div>
  );
};

export default PublicTopic;
// ye code bhi bese hi work kar raha he ye jo pahle kar raha tha aap isme sudhar karo   mera simple flow yahi he ki jab subsccribe kar to unsubscribe ubtton or jab unsuubscribe kart to subscrbe button dikhaye us topicnper ho haa page reload pe bhi