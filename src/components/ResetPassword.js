// src/components/ResetPassword.js

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import Swal from "sweetalert2";
import { resetPassword, handleCancelReset } from "../utils/userApi";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
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
    },
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="py-4">
        <Header />
      </header>

      <main className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div
          className="card shadow-lg p-4"
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <h1 className="text-center mb-4">Reset Password</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control"
                required
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="text-danger">{formik.errors.newPassword}</div>
              )}
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleCancelReset(navigate)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
