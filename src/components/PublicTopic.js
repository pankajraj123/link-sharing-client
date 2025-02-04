import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { axiosInstance } from "../lib/axios";

const PublicTopic = ({ token, username }) => {
    const [topics, setTopics] = useState([]);
    const [seriousness, setSeriousness] = useState('Casual');
    const [subscriptions, setSubscriptions] = useState({});


    useEffect(() => {
        if (token) {
            axiosInstance
                .get('getPublicTopic', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setTopics(response.data.topic);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching topics:', error);
                });

 
                axiosInstance
                .get('getUserSubscriptions', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const userSubscriptions = response.data.reduce((acc, subscription) => {
                        acc[subscription.topicId] = subscription.seriousness;
                        return acc;
                    }, {});
                    console.log(response.data)
                    console.log(userSubscriptions);
                    setSubscriptions(userSubscriptions); 
                })
                .catch((error) => {
                    console.error('Error fetching user subscriptions:', error);
                });
        }
    },[]);

    const handleSubscribe = async (topicId) => {
        try {
            const response = await axiosInstance.post(
                `subscribe/${topicId}`,
                { seriousness },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSubscriptions((prevSubscriptions) => ({
                ...prevSubscriptions,
                [topicId]: seriousness, 
            }));
        } catch (error) {
            console.error('Error subscribing to topic:', error);
        }
    };

    const handleUnsubscribe = async (topicId) => {
        try {
            const response = await axiosInstance.delete(
                `unsubscribe/${topicId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSubscriptions((prevSubscriptions) => {
                const newSubscriptions = { ...prevSubscriptions };
                delete newSubscriptions[topicId]; 
                return newSubscriptions;
            });
        } catch (error) {
            console.error('Error unsubscribing from topic:', error);
        }
    };

    const isSubscribed = (topicId) => {
        return subscriptions.hasOwnProperty(topicId); 
    };

    return (
        <div>
            <h1>Public Topics</h1>
            {topics.length > 0 ? (
                topics.map((topic, index) => (
                    <Card key={index} className="shadow-sm p-3 mb-3 rounded topic-card">
                        <Card.Body>
                            <h6><strong>Name:</strong> {topic.name}</h6>
                            <p><strong>Visibility:</strong> {topic.visibility}</p>
                            <p><strong>Created By:</strong> {topic.username}</p>
                            <p><strong>Date Created:</strong> {new Date(topic.dateCreated).toLocaleDateString()}</p>
                        </Card.Body>
                        {topic.username !== username && (
                            <div className="d-flex gap-2">
                                {isSubscribed(topic._id) ? (
                                    <>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleUnsubscribe(topic._id)}
                                        >
                                            Unsubscribe
                                        </button>
                                        <span className="ml-2"><strong>Seriousness:</strong> {subscriptions[topic._id]}</span>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleSubscribe(topic._id)}
                                        >
                                            Subscribe
                                        </button>
                                        <select
                                            className="form-select"
                                            aria-label="Seriousness select"
                                            value={seriousness}
                                            onChange={(e) => setSeriousness(e.target.value)}
                                        >
                                            <option value="Casual">Casual</option>
                                            <option value="Serious">Serious</option>
                                            <option value="Very Serious">Very Serious</option>
                                        </select>
                                    </>
                                )}
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
