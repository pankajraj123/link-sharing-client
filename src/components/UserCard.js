import React, { useEffect } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/actions/userActions';


const UserCard =()=>{
  const dispatch = useDispatch();
  const { userName, totalSubscription, totalTopic} = useSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem('token'));
  const token = userData?.token;
  const storedUserName = userData?.userName;
  
  useEffect(() =>{
    if (token && storedUserName){
      dispatch(fetchUserData(token, storedUserName));
    }
  }, [dispatch, token, storedUserName]);
  
  return(
    <>    
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded-lg" style={{ width: '100%' }}>
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="mr-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVTtlOwG_6l93Lo3NcGZcQpGx4LXNwa3lF5A&s"
                    alt="Profile"
                    className="h-24 w-24 object-cover rounded-circle"
                  />
                </div>
                <div>
                  <h2 className="font-weight-bold">{userName}</h2>
                  <h4 className="text-muted">@{userName}</h4>
                  <div className="d-flex gap-5 mt-4">
                    <div className="mr-4 text-center">
                      <h5 className="font-weight-normal">Subscriptions</h5>
                      <h4 className="font-weight-bold">{totalSubscription}</h4>
                    </div>
                    <div className="text-center">
                      <h5 className="font-weight-normal">Topics</h5>
                      <h4 className="font-weight-bold">{totalTopic}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default UserCard;
