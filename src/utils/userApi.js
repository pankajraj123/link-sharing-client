import { axiosInstance } from "../lib/axios";
import Swal from "sweetalert2";
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_CONFLICT,
  REGISTRATION_FAILED,
} from "../constants/Resgister.constant";
import {
  LOGIN_NOT_EXIST,
  LOGIN_WRONG_CREDENTIAL,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from "../constants/Login.constant";
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_WRONG_EMAIL,
  FORGOT_PASSWORD_SUCCESS,
} from "../constants/Forgot.constant";

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axiosInstance.post(`reset-password/${token}`, {
      newPassword: newPassword,
    });

    if (response.status === 200) {
      return { success: true };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { success: false, message: "Invalid or expired token" };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};

export const handleCancelResetPassword = (navigate) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be redirected to the home page.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, go to home",
    cancelButtonText: "No, stay here",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/");
    }
  });
};

export const handleForgotPassword = async (email, navigate) => {
  try {
    const response = await axiosInstance.post("forgot-password", {
      email: email,
    });
    console.log(response);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text:  FORGOT_PASSWORD_SUCCESS,
        timer: 2000,
      }).then(() => {
        navigate("/");
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:  FORGOT_PASSWORD_WRONG_EMAIL
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: FORGOT_PASSWORD_FAILURE,
      });
    }
  }
};

export const handleRegister = async (values, navigate) => {
  try {
    const response = await axiosInstance.post("register-user", values);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        text: REGISTRATION_SUCCESS,
      });
    }
    navigate("/");
  } catch (err) {
    if (err.response.status === 409) {
      Swal.fire({
        icon: "error",
        text: REGISTRATION_CONFLICT,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: REGISTRATION_FAILED,
      });
    }
  }
};

export const handleLogin = async (values, navigate) => {
  const { email, password } = values;
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await axiosInstance.post("login-user", data);
    if (response.status === 200) {
      let items = {
        userId: response.data.userId,
        userName: response.data.userName,
        token: response.data.token,
      };
      localStorage.setItem("token", JSON.stringify(items));
      navigate("/dashboard");
    }
  } catch (err) {
    if (err.status === 404) {
      Swal.fire({
        icon: "error",
        text: LOGIN_NOT_EXIST,
      });
    } else if (err.status === 401) {
      Swal.fire({
        icon: "error",
        text: LOGIN_WRONG_CREDENTIAL,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: LOGIN_FAILURE,
      });
    }
  }
};

export const handleForgot = async (navigate) => {
  navigate("/forgot-password");
};

export const handleLogout = async (navigate) => {
  localStorage.clear();
  navigate("/");
  Swal.fire({
    icon: "success",
    title: LOGOUT_SUCCESS,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const handleCancelReset = (navigate) => {
  navigate("/");
};
