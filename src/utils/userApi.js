import { axiosInstance } from "../lib/axios";
import Swal from "sweetalert2";


export const resetPassword = async (token, newPassword) => {
    try {
      const response = await axiosInstance.post(`resetPassword/${token}`, {
        newPassword: newPassword,
      });
  
      if (response.status === 200) {
        return { success: true };
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { success: false, message: "Invalid or expired token" };
      }
      return { success: false, message: "Something went wrong. Please try again later." };
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
      const response = await axiosInstance.post("forgotpassword", {
        email: email,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Password reset link has been sent to your email.",
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
          text: "User not found. Please check your email or register.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

export const handleRegister = async (values, navigate) => {
    try {
      const response = await axiosInstance.post("registeruser", values);
       console.log(response.data);
      if (response.data === "user is already exist") {
        Swal.fire({
          icon: "error",
          title: "User already exists",
          text: "Please try with a different username or email.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now log in with your credentials.",
        });
        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "Please try again later.",
      });
    }
  };

export const handleLogin = async (values, navigate, setcheckcredential) => {
    const { email, password } = values;
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axiosInstance.post("loginuser", data);
      
      if (response.data.message === "user login sucessfully") {
        let items = {
          userId:response.data.userId,
          username: response.data.username,
          token: response.data.token,
        };
        localStorage.setItem("token", JSON.stringify(items));
        navigate("/dashboard");
      } else if (response.data === "login failed") {
        setcheckcredential(true);
      } else if (response.data === "user is not exist") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User does not exist!",
        });
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: err.response?.data?.message || "Please try again.",
      });
    }
  };


 export const handleforgot = async (navigate) => {
    navigate("/forgotpassword");
  };

export const handleLogout = async (navigate) => {
    localStorage.clear();
    navigate('/');
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully',
      showConfirmButton: false,
      timer: 1500
    });
  };

  export const handleCancelReset = (navigate) => {
    navigate("/");
  }