import React from "react";
import { handleUpdateUserDetails } from "../utils/userApi"; 
import { Modal, Button } from "react-bootstrap"; 
import { Formik, Field, Form, ErrorMessage } from "formik"; 

const EditProfileModal = ({ show, handleClose, userDetails, updateUser }) => {
  const handleSave = async (values) => {
    try {
      const updatedUser = await handleUpdateUserDetails({
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
      });
      updateUser(updatedUser); 
      handleClose(); 
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            firstName: userDetails.firstName || "",
            lastName: userDetails.lastName || "",
            userName: userDetails.userName || "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = "First Name is required";
            }
            if (!values.lastName) {
              errors.lastName = "Last Name is required";
            }
            if (!values.userName) {
              errors.userName = "Username is required";
            }
            return errors;
          }}
          onSubmit={handleSave}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <Field
                  type="text"
                  className={`form-control ${
                    touched.firstName && errors.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  name="firstName"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <Field
                  type="text"
                  className={`form-control ${
                    touched.lastName && errors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  name="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Username
                </label>
                <Field
                  type="text"
                  className={`form-control ${
                    touched.userName && errors.userName ? "is-invalid" : ""
                  }`}
                  id="userName"
                  name="userName"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;
