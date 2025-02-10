import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

function ResourceShow() {
  const [topicData, setTopicData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopicData = async () => {
      const storedData = localStorage.getItem("token");
      const topicId = localStorage.getItem("topicId");
      const { token } = storedData ? JSON.parse(storedData) : {};
      try {
        const response = await axiosInstance.get(`getDiscription/${topicId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTopicData(response.data.topicData); 
      } catch (err) {
        setError("Error fetching topic data");
      }
    };

    fetchTopicData();
  }, []); 

  if (error) {
    return <div>{error}</div>;
  }

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
