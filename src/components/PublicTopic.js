// src/components/PublicTopic.js
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { axiosInstance } from "../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicTopic } from "../redux/actions/publicTopicActions";
import { fetchUserSubscriptions } from "../redux/actions/subscriptionActions";
import Swal from "sweetalert2";
import {handleUnsubscribe} from  '../utils/subscriptionApi'
import {handleSubscribe} from  '../utils/subscriptionApi'

const PublicTopic = ({ token, username }) => {
  const dispatch = useDispatch();
  const { publicTopics } = useSelector((state) => state.publicTopics);
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const [selectedSeriousness, setSelectedSeriousness] = useState("Casual");

  useEffect(() => {
    if (token) {
      dispatch(fetchPublicTopic(token));  
      dispatch(fetchUserSubscriptions(token));  
    }
  }, [token, dispatch]);

  const isSubscribed = (topicId) => {
  return subscriptions.some((sub) =>(sub.topicId._id=== topicId))
  };

  const getSubscriptionData = (topicId) =>{
    const subscription = subscriptions.find((sub) => sub.topicId._id === topicId);
    return subscription ? subscription.seriousness : null;
  };

  return (
    <div>
      <h1>Public Topics</h1>
      {publicTopics.length > 0 ? (
        publicTopics.map((topic) => (
          <Card key={topic._id} className="shadow-sm p-3 mb-3 rounded topic-card">
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

            {/* Show buttons based on subscription status */}
            {topic.username !== username && (
              <div className="d-flex gap-2">
                {isSubscribed(topic._id) ? (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUnsubscribe(topic._id,token,dispatch,username)}
                    >
                      Unsubscribe
                    </button>
                    <span className="ml-2">
                      <strong>Seriousness:</strong>{" "}
                      {getSubscriptionData(topic._id)}
                    </span>
                  </>
                ):(
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSubscribe(topic._id,token,selectedSeriousness,dispatch,username)}
                    >
                      Subscribe
                    </button>
                    <select
                      className="form-select"
                      value={selectedSeriousness}
                      onChange={(e) => setSelectedSeriousness(e.target.value)}
                    >
                      <option value="Casual">Casual</option>
                      <option value="Serious">Serious</option>
                      <option value="Very Serious">Very Serious</option>
                    </select>
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
