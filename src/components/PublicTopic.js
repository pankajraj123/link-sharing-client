import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const PublicTopic = ({ token, username }) => {
    const [topics, setTopics] = useState([]);

    const handlesubscribe = async () => {
        try {

        } catch (error) {

        }
    }

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8000/getPublicTopic', {
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
            <h1>Public Topic</h1>
            {topics.length > 0 ? (
                topics.map((topic, index) => (
                    <Card key={index} className="shadow-sm p-3 mb-3 rounded topic-card">
                        <Card.Body>
                            <h6><strong>name:</strong> {topic.name}</h6>
                            <p><strong>Visibility:</strong> {topic.visibility}</p>
                            <p><strong>Created By:</strong> {topic.username}</p>
                            <p><strong>Date Created:</strong> {new Date(topic.dateCreated).toLocaleDateString()}</p>
                        </Card.Body>
                        {topic.username !== username && (
                            <div className='d-flex gap-2'>
                                <button className='btn btn-primary '>Subscribe</button>
                                <select class="form-select" aria-label="Default select example">
                                    <option value="1">Serious</option>
                                    <option value="2">Casual</option>
                                    <option value="3">very Serious</option>
                                </select>
                            </div>
                        )}
                    </Card>
                ))
            ) : (
                <p>No topics found.</p>
            )}
        </div>
    );
};

export default PublicTopic;

