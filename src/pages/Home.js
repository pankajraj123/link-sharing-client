import React from "react";
import Login from "./Login";
import Register from "./Register";
import Header from "../components/Header";


export default function Home() {
  return (
    <div className="row bg-light mt-3 ">
      <div>
        <Header />
      </div>
      <div className="col-6 mt-3">
      </div>
      <div className="col-6">
        <div className="mb-4 mt-3 ">
          <Login />
        </div>
        <div>
          <Register />
        </div>
      </div>
    </div>
  );
}
