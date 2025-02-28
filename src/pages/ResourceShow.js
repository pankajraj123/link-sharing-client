import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicDescription } from "../redux/actions/resourceTopicActions";
import moment from "moment";
import { Card } from "react-bootstrap"; 


function ResourceShow() {
  const dispatch = useDispatch();
  const { topicData } = useSelector((state) => state.topicData);
   console.log(topicData);
  useEffect(() => {
    const storedData = localStorage.getItem("token");
    const topicId = localStorage.getItem("topicId");
    const { token } = storedData ? JSON.parse(storedData) : {};
    try {
      dispatch(fetchTopicDescription(token, topicId));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Topic Resources</h1>
      {topicData && topicData.length > 0 ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          {topicData.map((data, index) => (
            <div key={index} className="mb-4 w-75">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h5 className="card-title ">{data.name}</h5>
                  <p className="card-text ">
                    <strong>Description:</strong> {data.description}
                  </p>
                  <p className="card-text">
                    <strong> Resource CreatedBy:</strong> {data.createdBy}
                  </p>
                  <p className="card-text">
                    <strong> Topic CreatedBy:</strong>{" "}
                    {data.topicCreatedBy}
                  </p>

                  <p className="card-text ">
                    <strong>Date Created:</strong>{" "}
                    {moment(data.date).format("DD/MM/YYYY")}
                  </p>
                {data.Url && (
                    <p className="card-text ">
                      <strong>Link:</strong>{" "}
                      <a
                        href={data.Url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.Url}
                      </a>
                    </p>
                  )}
                  {data.filePath && (
                    <p className="card-text ">
                      <strong>Download Document</strong>
                      <button className="btn  btn-primary">Download</button>
                    </p>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No resources found for this topic.</p>
      )}
    </div>
  );
}

export default ResourceShow;
