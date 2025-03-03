import React, { useEffect,useState } from "react";
import { Card,Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSubscriptions } from "../redux/actions/subscriptionActions";
import moment from "moment";

export default function UserSubscriptions({ token }) {
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const [currentPage, setCurrentPage] = useState(1);
    const topicsPerPage = 5;
  useEffect(() => {
    dispatch(fetchUserSubscriptions(token));
  }, [token, dispatch]);
  
  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = subscriptions.slice(indexOfFirstTopic, indexOfLastTopic);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const totalPages = Math.ceil(subscriptions.length / topicsPerPage);

  return (
    <>
      <h1> Your Subscriptions</h1>
      {currentTopics.length > 0 ? (
        currentTopics.map((subscription) => (
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
        ))
      ) : (
        <p>No subscriptions available</p>
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
    </>
  );
}
