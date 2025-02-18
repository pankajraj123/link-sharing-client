
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
          firstName: "",
          lastName: "",
          email: "",
          userName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchemaRegister}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
            />
            <ErrorMessage
              name="lastName"
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
            <label htmlFor="userName" className="form-label">
              userName
            </label>
            <Field
              type="text"
              id="userName"
              name="userName"
              className="form-control"
            />
            <ErrorMessage
              name="userName"
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
