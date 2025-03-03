import React, { useEffect, useState } from "react";
import { Card, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicTopic } from "../redux/actions/publicTopicActions";
import { fetchUserSubscriptions } from "../redux/actions/subscriptionActions";
import { handleUnsubscribe } from "../utils/subscriptionApi";
import { handleSubscribe } from "../utils/subscriptionApi";
import moment from "moment";
import { handleClickRead } from "../utils/TopicApi";
import { useNavigate } from "react-router-dom";

const PublicTopic = ({ token, userName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { publicTopics } = useSelector((state) => state.publicTopics);
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const [selectedSeriousness, setSelectedSeriousness] = useState("Casual");
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 5;

  useEffect(() => {
    if (token) {
      dispatch(fetchPublicTopic(token));
      dispatch(fetchUserSubscriptions(token));
    }
  }, [token, dispatch]);

  const isSubscribed = (topicId) => {
    return subscriptions?.some((sub) => sub.topicId._id === topicId);
  };

  const getSubscriptionData = (topicId) => {
    const subscription = subscriptions.find(
      (sub) => sub.topicId._id === topicId
    );
    return subscription ? subscription.seriousness : null;
  };

  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = publicTopics.slice(indexOfFirstTopic, indexOfLastTopic);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(publicTopics.length / topicsPerPage);

  return (
    <>
      <div>
        <h1 className="ms-4">Public Topics</h1>
        {currentTopics.length > 0 ? (
          currentTopics.map((topic) => (
            <Card
              key={topic._id}
              className="shadow-sm p-3 mb-2 ms-4 rounded topic-card"
            >
              <Card.Body>
                <h6>
                  <strong>Name:</strong> {topic.name}
                </h6>
                <p>
                  <strong>Visibility:</strong> {topic.visibility}
                </p>
                <p>
                  <strong>Created By:</strong> {topic.userName}
                </p>
                <p>
                  <strong>Date Created:</strong>{" "}
                  {moment(topic.dateCreated).format("DD/MM/YYYY")}
                </p>
              </Card.Body>
              {topic.userName !== userName && (
                <div className="mb-2 d-flex gap-5">
                  {isSubscribed(topic._id) ? (
                    <>
                      <span className="ms-3">
                        <strong>Seriousness:</strong>{" "}
                        {getSubscriptionData(topic._id)}
                      </span>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleUnsubscribe(
                            topic._id,
                            token,
                            dispatch,
                            userName
                          )
                        }
                      >
                        Unsubscribe
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleClickRead(topic.name, topic._id, navigate)
                        }
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    <>
                      <select
                        className="form-select ms-3 w-25"
                        value={selectedSeriousness}
                        onChange={(e) => setSelectedSeriousness(e.target.value)}
                      >
                        <option value="Casual">Casual</option>
                        <option value="Serious">Serious</option>
                        <option value="Very Serious">Very Serious</option>
                      </select>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleSubscribe(
                            topic._id,
                            token,
                            selectedSeriousness,
                            dispatch,
                            userName
                          )
                        }
                      >
                        Subscribe
                      </button>
                    </>
                  )}
                </div>
              )}
            </Card>
          ))
        ) : (
          <p>No topics found</p>
        )}
        {totalPages > 1 && (
          <Pagination className="ms-4 mt -3">
            <Pagination.Prev
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
            />
          </Pagination>
        )}
      </div>
    </>
  );
};

export default PublicTopic;
