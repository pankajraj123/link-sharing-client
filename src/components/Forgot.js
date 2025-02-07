import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import { axiosInstance } from '../lib/axios';
import Swal from 'sweetalert2';

function Forgot() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: async (values) =>{
            try {
                const response = await axiosInstance.post('forgotpassword', {
                    email: values.email,
                });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Password reset link has been sent to your email.',
                        timer: 2000,
                    }).then(() => {
                        navigate('/');
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'User not found. Please check your email or register.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Something went wrong. Please try again.',
                    });
                }
            }
        },
    });

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="text-white py-4">
                <Header />
            </header>

            <main className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '450px' }}>
                    <h1 className="text-center mb-4">Forgot Password</h1>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                required
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-danger">{formik.errors.email}</div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Sending...' : 'Send Mail'}
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
