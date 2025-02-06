import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { axiosInstance } from "../lib/axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const PublicTopic = ({ token, username }) => {
    const [topics, setTopics] = useState([]);
    const [subscriptions, setSubscriptions] = useState({});

    useEffect(() => {
        if (token) {           
            axiosInstance
                .get('getPublicTopic', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setTopics(response.data.topic);
                })
                .catch((error) => {
                    console.error('Error fetching topics:', error);
                });

            axiosInstance
                .get('getUserSubscriptions', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const userSubscriptions = response.data.userSubscriptions.reduce((acc, subscription) => {
                        acc[subscription.topicId] = subscription.seriousness;
                        return acc;
                    }, {});
                    setSubscriptions(userSubscriptions);
                })
                .catch((error) => {
                    console.error('Error fetching user subscriptions:', error);
                });
        }
    }, [token]);

    const formik = useFormik({
        initialValues: {
            seriousness: 'Casual',
        },
        validationSchema: Yup.object({
            seriousness: Yup.string()
                .oneOf(['Casual', 'Serious', 'Very Serious'], 'Invalid seriousness level')
                .required('Seriousness is required'),
        }),
        onSubmit: async (values) =>{
            Swal.fire({
                icon: 'success',
                title: 'Form Submitted!',
                text: `Seriousness: ${values.seriousness}`,
            });
        },
    });

    const handleSubscribe = async (topicId) => {
        try {
            const response = await axiosInstance.post(
                `subscribe/${topicId}`,
                { seriousness: formik.values.seriousness },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSubscriptions((prevSubscriptions) => ({
                ...prevSubscriptions,
                [topicId]: formik.values.seriousness,
            }));
            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: `You have subscribed  with seriousness level: ${formik.values.seriousness}`,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error subscribing to the topic.',
            });
            console.error('Error subscribing to topic:', error);
        }
    };

    const handleUnsubscribe = async (topicId) => {
        try {
            await axiosInstance.delete(`unsubscribe/${topicId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubscriptions((prevSubscriptions) => {
                const newSubscriptions = { ...prevSubscriptions };
                delete newSubscriptions[topicId];
                return newSubscriptions;
            });
            Swal.fire({
                icon: 'info',
                title: 'Unsubscribed',
                text: `You have unsubscribed from the topic.`,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error unsubscribing from the topic.',
            });
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
                                        <form onSubmit={formik.handleSubmit}>
                                            <select
                                                className="form-select"
                                                aria-label="Seriousness select"
                                                value={formik.values.seriousness}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                name="seriousness"
                                            >
                                                <option value="Casual">Casual</option>
                                                <option value="Serious">Serious</option>
                                                <option value="Very Serious">Very Serious</option>
                                            </select>
                                            {formik.touched.seriousness && formik.errors.seriousness && (
                                                <div className="text-danger">{formik.errors.seriousness}</div>
                                            )}
                                            <button type="submit" className="btn btn-success mt-2">
                                                Save Seriousness
                                            </button>
                                        </form>
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
