import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik"; 
import * as Yup from "yup";
import Swal from "sweetalert2";


const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterForm = () => {
  const [isExist, setIsExist] = useState(false);
  const [userRegister, setRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("registeruser", values);
      if (response.data === "user is alerady exist") {
        setIsExist(true);
        Swal.fire({
          icon: "error",
          title: "User already exists",
          text: "Please try with a different username or email.",
        });
      } else {
        setRegister(true);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now log in with your credentials.",
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Error in registration:", err);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "Please try again later.",
      });
    }
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">First Name</label>
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
            <label htmlFor="lastname" className="form-label">Last Name</label>
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
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="username" className="form-label">Username</label>
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
            <label htmlFor="password" className="form-label">Password</label>
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
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
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
