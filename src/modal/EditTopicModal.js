// src/modals/EditTopicModal.js

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { HandleEdit } from "../utils/TopicApi";

const EditTopicModal = ({
  show,
  handleClose,
  selectedTopic,
  token,
  dispatch,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
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
          handleClose();
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditTopicModal;
