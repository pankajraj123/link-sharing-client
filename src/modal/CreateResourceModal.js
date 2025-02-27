import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { createResource } from "../utils/ResourceApi";
import { fetchPublicTopic } from "../redux/actions/publicTopicActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { token } from "../jwt_token";
import {validationResourceSchema} from "../validationSchema/resourceValidation";

const CreateResourceModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { publicTopics } = useSelector((state) => state.publicTopics);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (show) {
      dispatch(fetchPublicTopic(token));
    }
  }, [show, dispatch]);

  const handleCreateResource = async (values, { setSubmitting }) => {
    try {
      if (token === null) {
        return toast.error("Token is null");
      }
      if (!selectedTopic) {
        return toast.error("Please select a topic");
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
              {/* Topic selection */}
              <div className="mb-3">
                <label htmlFor="topic" className="form-label">
                  Select Topic
                </label>
                <Form.Control
                  as="select"
                  id="topic"
                  onChange={(e) =>
                    setSelectedTopic(
                      publicTopics.find((topic) => topic._id === e.target.value)
                    )
                  }
                >
                  <option value="">Select a topic</option>
                  {publicTopics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.name}
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
