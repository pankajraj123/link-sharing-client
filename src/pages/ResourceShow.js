import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useDispatch,useSelector } from "react-redux";
import { fetchTopicDiscription } from "../redux/actions/resourceTopicActions";


function ResourceShow() {
   const dispatch= useDispatch();
   const {topicData} =useSelector((state)=>state.topicData);
   
  useEffect(() => {
      const storedData = localStorage.getItem("token");
      const topicId = localStorage.getItem("topicId");
      const { token } = storedData ? JSON.parse(storedData) : {};
      try {
       dispatch(fetchTopicDiscription(token,topicId)) 
      } catch (err) {
       console.log(err)
      }
  }, [dispatch]); 

  useEffect(()=>{
  },[topicData])

  
  return (
    <div>
      <h1>Topic Details</h1>
      {topicData && topicData.length > 0 ? (
        topicData.map((data, index) => (
          <div key={index} className="topic-resource-card">
            <h3>{data.name}</h3>
            <p>
              <strong>Description:</strong> {data.description}
            </p>
            <p>
              <strong>Created By:</strong> {data.createdby}
            </p>
            <p>
              <strong>Date Created:</strong>{" "}
              {new Date(data.date).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No resources found for this topic.</p>
      )}
    </div>
  );
}

export default ResourceShow;
