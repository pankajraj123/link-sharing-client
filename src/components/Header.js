import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbMessageCircleFilled } from "react-icons/tb";
import { CiMail } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { FiFilePlus } from "react-icons/fi";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../lib/axios";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const topicValidationSchema = Yup.object().shape({
  name: Yup.string().required("Topic name is required."),
  visibility: Yup.string().required("Visibility is required.")
});

function Header(props) {
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/');
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleCreateTopic = async (values, { setSubmitting, setFieldError }) => {
    const storedData = localStorage.getItem("token");
    const { token } = storedData ? JSON.parse(storedData) : {};

    if (!token) {
      Swal.fire("Error", "User is not authenticated", "error");
      return;
    }

    try {
      await axiosInstance.post('topiccreate', { name: values.name, visibility: values.visibility }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowTopicModal(false);
      Swal.fire("Success", "Topic created successfully", "success");
    } catch (error) {
      if (error.response && (error.response.status === 409 || error.response.status === 400)) {
        setFieldError("name", error.response.data.message);
      } else {
        Swal.fire("Error", "An error occurred while creating the topic.", "error");
        console.error("Topic Create Error", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
      <div className="container-fluid">
        <h2>link-sharing</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex ms-auto">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>

          {props.show && (
            <div className="d-flex align-items-center gap-3 ms-3">
              <TbMessageCircleFilled className="fs-4 text-dark cursor-pointer" onClick={() => setShowTopicModal(true)} />
              <CiMail className="fs-4 text-dark cursor-pointer" onClick={() => setShowInviteModal(true)} />
              <FaLink className="fs-4 text-secondary cursor-pointer" onClick={() => setShowResourceModal(true)} />
              <FiFilePlus className="fs-4 text-secondary cursor-pointer" onClick={() => setShowDocumentModal(true)} />
              <div className="dropdown">
                <button className="btn d-flex align-items-center dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <CgProfile className="fs-4 me-2" />
                  <span className="fw-bold">{props.data}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" >Users</a></li>
                  <li><a className="dropdown-item" >Profile</a></li>
                  <li><a className="dropdown-item" >Posts</a></li>
                  <li><a className="dropdown-item" >Topics</a></li>
                  <button onClick={handleLogout} className="border border-white" ><li className="dropdown-item" >LogOut</li></button>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal show={showTopicModal} onHide={() => setShowTopicModal(false)}>
        <Modal.Header closeButton onHide={() => {}}>
          <Modal.Title>Create New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: '', visibility: 'public' }}
            validationSchema={topicValidationSchema}
            onSubmit={handleCreateTopic}
          >
            {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  placeholder="Enter Topic Name"
                  className="mb-3"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                {errors.name && touched.name && <div className="text-danger mb-2">{errors.name}</div>}
                
                <Form.Select
                  name="visibility"
                  value={values.visibility}
                  onChange={handleChange}
                  isInvalid={touched.visibility && errors.visibility}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Form.Select>
                {errors.visibility && touched.visibility && <div className="text-danger mb-2">{errors.visibility}</div>}

                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowTopicModal(false)}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>Save</Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      
    </nav>
  );
}

export default Header;
