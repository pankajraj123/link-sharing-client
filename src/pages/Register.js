import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { handleRegister } from "../utils/userApi"; 
import { validationSchemaRegister } from "../validationSchema/userValidation";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit =  async (values) => {
  await  handleRegister(values, navigate);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Register</h2>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchemaRegister}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <Field
              type="text"
              id="firstname"
              name="firstname"
              className="form-control"
            />
            <ErrorMessage
              name="firstname"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <Field
              type="text"
              id="lastname"
              name="lastname"
              className="form-control"
            />
            <ErrorMessage
              name="lastname"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="form-control"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="form-control"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-danger"
            />
          </div>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </FormikForm>
      </Formik>
    </Container>
  );
};

export default RegisterForm;
