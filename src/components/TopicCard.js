import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { axiosInstance } from '../lib/axios';

const TopicCard = ({ token, username }) => {
  const [topics, setTopics] = useState([]);

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
            {/* <div className='d-flex gap-2'>
            <button className='btn btn-primary'> Edit</button>
            <button className='btn btn-primary'>Delete</button>
            </div> */}
          </Card>
        ))
      ) : (
        <p>No topics found.</p>
      )}
    </div>
  );
};

export default TopicCard;


//  in this  you used formik  yup and sweetalert2   and when user click on edit it show modal  i give you api for delete and update 
