import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { createResource } from "../utils/ResourceApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchUserSubscriptions } from "../redux/actions/subscriptionActions";
import { validationResourceSchema } from "../validationSchema/resourceValidation";

const CreateResourceModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const user = localStorage.getItem("token");
  const parsedUser = user ? JSON.parse(user) : null;
  const token = parsedUser?.token;

  useEffect(() => {
    if (show) {
      dispatch(fetchUserSubscriptions(token));
    }
  }, [show, dispatch, token]);

  const handleCreateResource = async (values, { setSubmitting }) => {
    try {
      if (token === null) {
        return toast.error("Token is null");
      }

      if (!selectedTopic) {
        return toast.error("Please select a topic from your subscriptions");
      }

      const isSubscribed = subscriptions.some(
        (subscription) => subscription.topicId._id === selectedTopic._id
      );

      if (!isSubscribed) {
        return toast.error(
          "You can only create resources for subscribed topics"
        );
      }

      await createResource(
        values.description,
        selectedTopic._id,
        token,
        values.Url
      );
      setShow(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Resource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ description: "", Url: "" }}
          validationSchema={validationResourceSchema}
          onSubmit={handleCreateResource}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            isSubmitting,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="topic" className="form-label">
                  Select Topic
                </label>
                <Form.Control
                  as="select"
                  id="topic"
                  onChange={(e) => {
                    const selected = subscriptions.find(
                      (topic) => topic.topicId._id === e.target.value
                    );
                    setSelectedTopic(selected ? selected.topicId : null);
                  }}
                  value={selectedTopic ? selectedTopic._id : ""}
                >
                  <option value="">Select a topic</option>
                  {subscriptions.map((topic) => (
                    <option key={topic.topicId._id} value={topic.topicId._id}>
                      {topic.topicId.name}
                    </option>
                  ))}
                </Form.Control>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Resource Description
                </label>
                <Form.Control
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter description for the resource"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={touched.description && !!errors.description}
                />
                {touched.description && errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="Url" className="form-label">
                  Resource URL (optional)
                </label>
                <Form.Control
                  type="url"
                  id="Url"
                  name="Url"
                  placeholder="Enter URL for the resource (optional)"
                  value={values.Url}
                  onChange={handleChange}
                  isInvalid={touched.Url && !!errors.Url}
                />
                {touched.Url && errors.Url && (
                  <div className="text-danger">{errors.Url}</div>
                )}
              </div>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Save Resource
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateResourceModal;
