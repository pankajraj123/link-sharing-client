import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useParams to get token from the URL
import axios from 'axios';  // for making requests
import Header from './Header';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();  
    const navigate = useNavigate();

    useEffect(() => {
        setError('');
        setMessage('');
    }, [token]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
      console.log("bsjhsbj")
        try {
            const response = await axios.post(`http://localhost:8000/resetPassword/${token}`, { newPassword });
            
            if (response.status === 200) {
                setMessage('Your password has been reset successfully.');
                setTimeout(() => {
                    navigate('/');  // Navigate to home page after successful reset
                }, 2000);
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setError('Invalid or expired token.');
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
            <header className="py-4">
                <Header />
            </header>

            <main className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '450px' }}>
                    <h1 className="text-center mb-4">Reset Password</h1>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {message && <div className="alert alert-success">{message}</div>}

                    <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
