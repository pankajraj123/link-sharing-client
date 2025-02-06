import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../lib/axios";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

function Login() {
  const [checkcredential, setcheckcredential] = useState(false);
  const navigate = useNavigate();

  const handleforgot = async () => {
    navigate('/forgotpassword');
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;
    const data = {
      email: email,
      password: password
    };

    try {
      const response = await axiosInstance.post('loginuser', data);
      if (response.data.message === 'user login sucessfully') {
        let items = {
          username: response.data.username,
          token: response.data.token
        };
        localStorage.setItem('token', JSON.stringify(items));
        navigate('/dashboard');
      } else if (response.data === 'login failed') {
        setcheckcredential(true);
      } else if (response.data === 'user is not exist') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User does not exist!',
        });
      }
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: err.response?.data?.message || 'Please try again.',
      });
    }
  };

  return (
    <div className="container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <h2>Login</h2>
            {checkcredential && (
              <div>
                <span className="bg-danger text-white">
                  Wrong email or password
                </span>
              </div>
            )}
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
              <ErrorMessage
                name="email"
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
              <button type="button" className="btn btn-primary" onClick={handleforgot}>
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
