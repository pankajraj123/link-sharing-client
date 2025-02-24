import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { handleForgotPassword } from "../utils/userApi"; 
import {validationSchemaForgot} from '../validationSchema/userValidation'

const Forgot=()=>{
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    await handleForgotPassword(values.email, navigate);
  };
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Forgot Password</h2>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchemaForgot}
        onSubmit={(values)=>{handleSubmit(values)}}
      >
        <FormikForm>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
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

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Send Mail
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </FormikForm>
      </Formik>
    </Container>
  );
};

export default Forgot;
