import React, { useEffect, useState,} from 'react';
import { Card } from 'react-bootstrap';
import { axiosInstance } from '../lib/axios';
import {useNavigate } from 'react-router-dom';


const TopicCard = ({ token, username }) => {
  const [topics, setTopics] = useState([]);

  const navigate=useNavigate();
  const handleClick = (topicname, topicId) => {
    localStorage.setItem('topicId', topicId);
    const formattedTopicName = topicname.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dashboard/topicDescription/${formattedTopicName}`);
};

  useEffect(() => {
    if (token) {
      axiosInstance
        .get('getUserTopic', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
        setTopics(response.data.topic); 
        })
        .catch((error) => {
          console.error('Error fetching topics:', error);
        });
    }
  }, [token]);

  
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
            <div className='d-flex '>
             {/* <Link to={`/dashboard/topicDescription/${topic._id}` }>readMore</Link> */}
             <button className='btn-primary' onClick={()=>{handleClick(topic.name,topic._id)}}>
               readMore
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



