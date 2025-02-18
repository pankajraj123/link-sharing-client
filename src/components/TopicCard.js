import React, { useState, useEffect } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTopics } from "../redux/actions/topicActions";
import { HandleDelete } from "../utils/TopicApi";
import { HandleEdit } from "../utils/TopicApi";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { handleClickRead } from "../utils/TopicApi";
import moment from 'moment'
import { fetchUserSubscriptions } from "../redux/actions/subscriptionActions";


const TopicCard = ({ token, userName }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topics, loading, error } = useSelector((state) => state.topic);

  const handleEdit = (topic) => {
    setSelectedTopic(topic);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTopic(null);
  };

  useEffect(() =>{
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

        {/* Modal for editing topic */}
        {selectedTopic && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Topic</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{
                name: selectedTopic.name,
                visibility: selectedTopic.visibility,
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                visibility: Yup.string().required("Visibility is required"),
              })}
              onSubmit={(values) => {
                const { name, visibility } = values;
                const body = { name, visibility };
                HandleEdit(selectedTopic._id, token, dispatch, body);
                handleCloseModal();
              }}
            >
              <Form>
                <Modal.Body>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Topic Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="visibility" className="form-label">
                      Visibility
                    </label>
                    <Field
                      as="select"
                      id="visibility"
                      name="visibility"
                      className="form-control"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </Field>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Formik>
          </Modal>
        )}
      </div>   
    </>
  );
};

export default TopicCard;
