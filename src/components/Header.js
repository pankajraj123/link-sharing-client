import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbMessageCircleFilled } from "react-icons/tb";
import { CiMail } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { FiFilePlus } from "react-icons/fi";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios'

function Header(props) {
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  
  const [topicName, setTopicName] = useState("");
  const [topicVisibility, setTopicVisibility] = useState("public");

  const handleCreateTopic = async () => {
    try {
      await axios.post('http://localhost:8000/topiccreate', { name: topicName, visibility: topicVisibility });
      setShowTopicModal(false);
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">LinkSharing</a>
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
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Users</a></li>
                  <li><a className="dropdown-item" href="#">Topics</a></li>
                  <li><a className="dropdown-item" href="#">Posts</a></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal show={showTopicModal} onHide={() => setShowTopicModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter Topic Name" className="mb-3" value={topicName} onChange={(e) => setTopicName(e.target.value)} />
          <Form.Select value={topicVisibility} onChange={(e) => setTopicVisibility(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTopicModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateTopic}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Invitation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="email" placeholder="Enter Email" className="mb-3" />
          <Form.Select>
            <option>Select Topic</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInviteModal(false)}>Cancel</Button>
          <Button variant="primary">Send</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showResourceModal} onHide={() => setShowResourceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter Link" className="mb-3" />
          <Form.Control type="text" placeholder="Enter Description" className="mb-3" />
          <Form.Select>
            <option>Select Topic</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResourceModal(false)}>Cancel</Button>
          <Button variant="primary">Share</Button>
        </Modal.Footer>
      </Modal>

 
      <Modal show={showDocumentModal} onHide={() => setShowDocumentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="file" className="mb-3" />
          <Form.Control type="text" placeholder="Enter Description" className="mb-3" />
          <Form.Select>
            <option>Select Topic</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDocumentModal(false)}>Cancel</Button>
          <Button variant="primary">Share</Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}

export default Header;
