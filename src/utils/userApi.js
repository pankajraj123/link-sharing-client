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
import {
  RESET_PASSWORD_CANCEL,
  RESET_PASSWORD_AUTHENTICATION_FAILURE,
  RESET_PASSWORD_FAILURE
} from "../constants/ResetPassword.constant";
import {
  EDIT_PROFILE_MISSING_FIELDS,
  EDIT_PROFILE_CONFLICT_,
  EDIT_PROFILE_NOT_EXIST,EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_SUCCESS,
} from "../constants/EditProfile.constant";


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
      return { success: false, message: RESET_PASSWORD_AUTHENTICATION_FAILURE };
    }
    return {
      success: false,
      message: RESET_PASSWORD_FAILURE,
    };
  }
};

export const handleCancelResetPassword = (navigate) => {
  Swal.fire({
    title: "Are you sure?",
    text: RESET_PASSWORD_CANCEL,
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

export const handleClickProfile=async(navigate)=>{
   navigate("/dashboard/profile");
}

export const handleGetUserDetail= async(token)=>{
  try {
    const response = await axiosInstance.get("get-user-detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}



export const handleUpdateUserDetails = async (updatedUserData) => {
  try {
    const user = localStorage.getItem("token");
    const parsedUser = user ? JSON.parse(user) : null;
    const token = parsedUser?.token;
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axiosInstance.put(
      "/edit-user-detail", 
      updatedUserData, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    if (response.status === 200) {
      const data = response.data;
      const items = {
        userId: data.user._id,
        userName: data.user.userName,
        token: data.token,
      }
      localStorage.setItem("token", JSON.stringify(items));
     Swal.fire({
       icon: "success",
       text:EDIT_PROFILE_SUCCESS,
     });
    } 
  } catch (error) {
    if(error.response.status === 400){
       Swal.fire({
         icon: "error",
         text: EDIT_PROFILE_MISSING_FIELDS,
       });
    }else if (error.response.status === 409) {
      Swal.fire({
        icon: "error",
        text: EDIT_PROFILE_CONFLICT_,
      });
    } else if (error.response.status === 404) {
      Swal.fire({
        icon: "error",
        text: EDIT_PROFILE_NOT_EXIST,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: EDIT_PROFILE_FAILURE,
      });
    }
  }
};
