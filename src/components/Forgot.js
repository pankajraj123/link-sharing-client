import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import axios from 'axios';  // to make the request
import Header from './Header';

function Forgot() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate(); 

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); 
        setMessage(''); 
        
        try {
            const response = await axios.post('http://localhost:8000/forgotpassword', { email });
            if (response.status === 200) {
                setMessage('Password reset link has been sent to your email.');
                setTimeout(() => {
                    navigate('/');  
                }, 2000);
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 404) {
                setError('User not found. Please check your email or register.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/');  
    };

    return (
        <div className="d-flex flex-column min-vh-100">

            <header className=" text-white py-4">
                <Header />
            </header>

            <main className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '450px' }}>
                    <h1 className="text-center mb-4">Forgot Password</h1>
                
                    <form onSubmit={handleForgot}>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        {message && <div className="alert alert-success">{message}</div>}

                        <div className="d-flex justify-content-between">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'SendMail'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Forgot;
