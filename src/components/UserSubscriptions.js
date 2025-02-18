import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSubscriptions } from "../redux/actions/subscriptionActions";
import moment from "moment"; 

export default function UserSubscriptions({token}) {
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state) => state.subscriptions);

  useEffect(() => {
    dispatch(fetchUserSubscriptions(token));
  }, [token,dispatch]);

  return (
    <>
      <h1> Your Subscriptions</h1>
      {subscriptions.length > 0 ? (
        subscriptions.map(
          (
            subscription
          ) => (
            <Card
              key={subscription._id} 
              className="shadow-sm p-3 mb-3 rounded topic-card"
            >
              <Card.Body>
                <h6>
                  <strong>Topic Name:</strong> {subscription.topicId.name}
                </h6>
                <p>
                  <strong>Visibility:</strong> {subscription.topicId.visibility}
                </p>
                <p>
                  <strong>CreatedBy:</strong>{" "}
                  {subscription.topicId.createdBy.userName}
                </p>
                <p>
                  <strong>Seriousness:</strong> {subscription.seriousness}
                </p>
                <p>
                  <strong>Date Created:</strong>{" "}
                  {moment(subscription.createdAt).format("DD/MM/YYYY")}
                </p>
              </Card.Body>
            </Card>
          )
        )
      ) : (
        <p>No subscriptions available</p> 
        )}
    </>
  );
}
