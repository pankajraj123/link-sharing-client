import React, { useEffect, useState } from "react";
import { handleGetUserDetail } from "../utils/userApi";
import moment from "moment";
import UserCard from "../components/UserCard";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const user = localStorage.getItem("token");
  const parsedUser = user ? JSON.parse(user) : null;
  const token = parsedUser?.token;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        const data = await handleGetUserDetail(token);
        setUserDetails(data?.user);
      }
    };
    fetchUserDetails();
  }, [token]);

  if (!userDetails) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container-fluid my-5">
      <div className="row">
    
        <div className="col-lg-6 ">
          <div className="card shadow-sm p-3 mb-5 bg-body rounded">
            <UserCard />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm p-3 mb-5 bg-body rounded">
            <h1 className="text-center mb-4">Your Profile</h1>
            <div className="list-group">
              <div className="list-group-item d-flex justify-content-between">
                <strong>First Name:</strong>{" "}
                <span>{userDetails.firstName}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between">
                <strong>Last Name:</strong> <span>{userDetails.lastName}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between">
                <strong>Username:</strong> <span>{userDetails.userName}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between">
                <strong>Email:</strong> <span>{userDetails.email}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between">
                <strong>Joined:</strong>{" "}
                <span>
                  {moment(userDetails.createdAt).format("MMMM Do YYYY")}
                </span>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
