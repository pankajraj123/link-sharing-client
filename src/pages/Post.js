import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPost } from "../redux/actions/postAction";
import moment from "moment";
import { Card, Row, Col } from "react-bootstrap";

function Post() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts); 

  const storedData = localStorage.getItem("token");
  const { token, userName } = storedData ? JSON.parse(storedData) : {};

  useEffect(() => {
    if (token) {
      dispatch(fetchUserPost(token)); 
    }
  }, [dispatch, token]);


  const userPosts = posts.filter((post) => post.createdBy === userName);
  const otherPosts = posts.filter((post) => post.createdBy !== userName);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">My Posts</h1>
      <Row>
     
        <Col md={6}>
          <h3 className="text-center mb-3">Posts Created by You</h3>
          {userPosts.length > 0 ? (
            <div>
              {userPosts.map((post, index) => (
                <div key={index} className="mb-4">
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <h5 className="card-title">{post.name}</h5>
                      <p className="card-text">
                        <strong>Description:</strong> {post.description}
                      </p>
                      <p className="card-text">
                        <strong>Created By:</strong> {post.createdBy}
                      </p>
                      <p className="card-text">
                        <strong> Topic CreatedBy:</strong> {post.topicCreatedBy}
                      </p>
                      <p className="card-text">
                        <strong>Date Created:</strong>{" "}
                        {moment(post.date).format("DD/MM/YYYY")}
                      </p>
                   
                      {post.Url && (
                        <p className="card-text">
                          <strong>Link:</strong>{" "}
                          <a
                            href={post.Url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {post.Url}
                          </a>
                        </p>
                      )}
                      {post.filePath && (
                        <p className="card-text">
                          <strong>Download Document:</strong>
                          <button className="btn btn-primary">Download</button>
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No posts created by you.</p>
          )}
        </Col>

        <Col md={6}>
          <h3 className="text-center mb-3">Other post</h3>
          {otherPosts.length > 0 ? (
            <div>
              {otherPosts.map((post, index) => (
                <div key={index} className="mb-4">
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <h5 className="card-title">{post.name}</h5>
                      <p className="card-text">
                        <strong>Description:</strong> {post.description}
                      </p>
                      <p className="card-text">
                        <strong>Created By:</strong> {post.createdBy}
                      </p>
                      <p className="card-text">
                        <strong> Topic CreatedBy:</strong> {post.topicCreatedBy}
                      </p>
                      <p className="card-text">
                        <strong>Date Created:</strong>{" "}
                        {moment(post.date).format("DD/MM/YYYY")}
                      </p>
               
                      {post.Url && (
                        <p className="card-text">
                          <strong>Link:</strong>{" "}
                          <a
                            href={post.Url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {post.Url}
                          </a>
                        </p>
                      )}
                      {post.filePath && (
                        <p className="card-text">
                          <strong>Download Document:</strong>
                          <button className="btn btn-primary">Download</button>
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No other posts available.</p>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Post;
