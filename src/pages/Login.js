// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { handleLogin } from "../utils/userApi"; 
import { handleforgot } from "../utils/userApi";
import {validationSchemaLogin} from '../validationSchema/userValidation'

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchemaLogin}
        onSubmit={(values) => handleLogin(values, navigate)} // Using handleLogin from utils
      >
        {({ values }) => (
          <Form>
            <h2>Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={()=>{handleforgot(navigate)}} // Handling forgot password logic here
              >
                Forgot password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
