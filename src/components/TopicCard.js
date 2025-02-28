// src/components/TopicCard.js

import React, { useState, useEffect } from "react";
import { Card} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTopics } from "../redux/actions/topicActions";
import { HandleDelete } from "../utils/TopicApi";
import { handleClickRead } from "../utils/TopicApi";
import moment from "moment";
import EditTopicModal from "../modal/EditTopicModal"; 

const TopicCard = ({ token, userName }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topics, loading, error } = useSelector((state) => state.topic);

  const handleEdit = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchTopics(token));
    }
  }, [token, dispatch]);

  if (loading) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <Card key={index} className="shadow-sm p-3 mb-3 rounded topic-card">
              <Card.Body>
                <h6>{topic.name}</h6>
                <p>
                  <strong>Visibility:</strong> {topic.visibility}
                </p>
                <p>
                  <strong>Created By:</strong> {userName}
                </p>
                <p>
                  <strong>Date Created:</strong>{" "}
                  {moment(topic.dateCreated).format("DD/MM/YYYY")}
                </p>
              </Card.Body>
              <div className="d-flex">
                <div className="d-flex gap-3">
                  <button
                    className="btn-primary"
                    onClick={() => handleEdit(topic)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() =>
                      HandleDelete(topic._id, token, dispatch, userName)
                    }
                  >
                    Delete
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      handleClickRead(topic.name, topic._id, navigate)
                    }
                  >
                    Read More
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No topics found.</p>
        )}
      </div>

      {selectedTopic && (
        <EditTopicModal
          show={!!selectedTopic} 
          handleClose={handleCloseModal}
          selectedTopic={selectedTopic}
          token={token}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default TopicCard;
