// components/TopicCard.js
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTopics } from '../redux/actions/topicActions';  

const TopicCard = ({ token, username }) => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { topics, loading, error } = useSelector((state) => state.topic); 

  const handleClick = (topicname, topicId) => {
    localStorage.setItem('topicId', topicId);
    const formattedTopicName = topicname.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dashboard/topicDescription/${formattedTopicName}`);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchTopics(token)); 
    }
  }, [token, dispatch]);

  if (loading) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {topics.length > 0 ? (
        topics.slice(0, 5).map((topic, index) => (
          <Card key={index} className="shadow-sm p-3 mb-3 rounded topic-card">
            <Card.Body>
              <h6>{topic.name}</h6>
              <p><strong>Visibility:</strong> {topic.visibility}</p>
              <p><strong>Created By:</strong> {username}</p>
              <p><strong>Date Created:</strong> {new Date(topic.dateCreated).toLocaleDateString()}</p>
            </Card.Body>
            <div className='d-flex'>
              <button className='btn-primary' onClick={() => { handleClick(topic.name, topic._id); }}>
                Read More
              </button>
            </div>
          </Card>
        ))
      ) : (
        <p>No topics found.</p>
      )}
    </div>
  );
};

export default TopicCard;
