import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbMessageCircleFilled } from "react-icons/tb";
import { FaLink } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { handleLogout,handleClickProfile } from "../utils/userApi";
import CreateTopicModal from "../modal/CreateTopicModal"; 
import CreateResourceModal from "../modal/CreateResourceModal";
import  {handleClickPost} from '../utils/ResourceApi'

function Header(props) {
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showResourceModal,setResourceModal] =useState(false);
  const navigate = useNavigate();

  return (
    <>
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
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            {props.show && (
              <div className="d-flex align-items-center gap-3 ms-3">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="create-topic-tooltip">Create Topic</Tooltip>
                  }
                >
                  <TbMessageCircleFilled
                    className="fs-4 text-dark cursor-pointer"
                    onClick={() => setShowTopicModal(true)}
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="create-Resource-tooltip">
                      Create Resource
                    </Tooltip>
                  }
                >
                  <FaLink
                    className="fs-4 text-secondary cursor-pointer"
                    onClick={()=>setResourceModal(true)}
                  />
                </OverlayTrigger>
                <div className="dropdown">
                  <button
                    className="btn d-flex align-items-center dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <CgProfile className="fs-4 me-2" />
                    <span className="fw-bold">{props.data}</span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end text-center"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <button
                      onClick={()=>{
                        handleClickProfile(navigate);
                      }}
                      className="border border-white"
                    >
                      <li className="dropdown-item">Profile</li>
                    </button>{" "}
                    <button
                      onClick={() => {
                        handleClickPost(navigate);
                      }}
                      className="border border-white"
                    >
                      <li className="dropdown-item">Post</li>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout(navigate);
                      }}
                      className="  border border-white "
                    >
                      <li className="dropdown-item ">LogOut</li>
                    </button>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <CreateTopicModal
        show={showTopicModal}
        setShow={setShowTopicModal}
        props={props}
      />
      <CreateResourceModal
        show={showResourceModal}
        setShow={setResourceModal}
        props={props}
      />
    </>
  );
}

export default Header;
