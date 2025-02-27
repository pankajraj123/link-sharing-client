// src/modals/CreateTopicModal.js
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { topicValidationSchema } from "../validationSchema/topicValidation";
import { createTopic } from "../utils/TopicApi";
import { fetchUserSubscriptions } from "../redux/actions/subscriptionActions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { token } from "../jwt_token";
import { useDispatch } from "react-redux";

const CreateTopicModal = ({ show, setShow, props }) => {
const dispatch = useDispatch();
const handleCreateTopic = async (values) => {
    try {
      if (token === null) {
        return toast.error("Token is null");
      }
      await createTopic(values, props.data,dispatch);
      dispatch(fetchUserSubscriptions(token));
      setShow(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        html: error, 
        icon: "error",
      });
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Topic</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "", visibility: "public" }}
          validationSchema={topicValidationSchema}
          onSubmit={handleCreateTopic}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Enter Topic Name"
                className="mb-3"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && errors.name}
              />
              {errors.name && touched.name && (
                <div className="text-danger mb-2">{errors.name}</div>
              )}
              <Form.Select
                name="visibility"
                value={values.visibility}
                onChange={handleChange}
                isInvalid={touched.visibility && errors.visibility}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Form.Select>
              {errors.visibility && touched.visibility && (
                <div className="text-danger mb-2">{errors.visibility}</div>
              )}
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateTopicModal;
