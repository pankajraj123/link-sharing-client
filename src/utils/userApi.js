import { axiosInstance } from "../lib/axios";
import Swal from "sweetalert2";


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
      const response = await axiosInstance.post("forgot-password", {
        email: email,
      });
      console.log(response)
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
      const response = await axiosInstance.post("register-user", values);
      if(response.status===200){
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now log in with your credentials.",
        });
      }
        navigate("/");
    } catch (err) {
       if (err.response.status === 409) {
         Swal.fire({
           icon: "error",
           title: err.response.data.message,
           text: "Please try with a different username or email.",
         });
       }else{Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "Please try again later.",
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
      if (response.status ===200) {
        let items = {
          userId:response.data.userId,
          username: response.data.username,
          token: response.data.token,
        };
        localStorage.setItem("token", JSON.stringify(items));
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User does not exist!",
        });
      }else if(err.status===401){
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: err.response.data.message,
         });
      }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Login  Failed",
    });
      }
      
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