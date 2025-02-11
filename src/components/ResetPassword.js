// src/components/ResetPassword.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import Header from "./Header";
import Swal from "sweetalert2";
import { resetPassword, handleCancelReset } from "../utils/userApi";
import { Button, Container } from "react-bootstrap";
import {validationSchemaResetPassword} from '../validationSchema/userValidation'


function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const { success, message } = await resetPassword(token, values.newPassword);
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your password has been reset successfully.",
        timer: 2000,
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    }
  };

  return (
    <Container className="d-flex flex-column min-vh-100 mt-5">
      <header className="py-4">
        <Header />
      </header>
      <main className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "450px" }}>
          <h1 className="text-center mb-4">Reset Password</h1>
          <Formik
            initialValues={{ newPassword: "" }}
            validationSchema={validationSchemaResetPassword}
            onSubmit={handleSubmit}
          >
            <FormikForm>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  className="form-control"
                />
                <ErrorMessage name="newPassword" component="div" className="text-danger" />
              </div>

              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  Reset Password
                </Button>
                <Button variant="secondary" onClick={() => handleCancelReset(navigate)}>
                  Cancel
                </Button>
              </div>
            </FormikForm>
          </Formik>
        </div>
      </main>
    </Container>
  );
}

export default ResetPassword;
