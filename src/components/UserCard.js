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
  
  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center ">
          <Col md={12}>
            <Card
              className="p-4 rounded-lg mb-3"
              style={{ width: "100%" }}
            >
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="mr-4">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAMFBMVEXk5ueutLepsLPZ3N7n6erIzM7P0tTq7O2yuLvBxsje4eLV2NrR1da2u767wMPEycvljgLtAAADY0lEQVR4nO2byXLbMAxAuYDiou3//7akXLfxIosABciZ4bskMz3kDQiBC1ClOp1Op9PpdDqdTqfT6XR+DQDPv1wOeGUHF5dMjG6yX2EGaopaa6Nv5J8hWnWxGaR1vhv9x4ThWrGoX6VuXCcGbleqRGy8xAvSsut0I15hZQ+kcsDmJG41HVoVkuxCwrSfVQ9YSS8Y6qRKvAStxspYZYKcVwrVVlrPUsvoZ4SVNk7GC4b6JdwYRbSOC9YTQSJc/qi4v2AGfi+wyCXUMl8jOlgiWY/OrA1uLYj4Nczh4j7kAMVK64XZCrHt/IQ56YGQ8AUzsWop1L7zg8iaXLTvsOA5tYiplVeR0wocWctyakWiVc55xuTCnbQe4Nx/POZY+gjnp+ipqZXrfNfqWh+1vjTlv7NA0A6BBdZy+qWbT8NWzXuwIec868GGch3bgsV7DKQeIQzvOwTlTl3gvlcT6zxnjS/QSgT79ZV4yeD9DhUt6c3AbaVU+s6HJI/eF1n3w38kdLBE3nTRT7pCL/OwYLykHsAV7oFkYS8OdzBbkGBzRcFYrSXaG65+FRRt3NXGK4j30SF96J/fMItw8/XG0e4oVxkegOnjwIFwWv3wgjW8FzNBZB/cFUvuVcyYebp8ygZsnENW+Wukw+wuyfQXQNlxWMukVHTD+B2DUgXY8N5vP6+2UUXIg0o5WIPbGHK0bMqG132F+boxuvh6+y+TZcs62iQ+kQc+jW6ZjdmtW/mfstuQxMzyH7Ku/sC1jkqgWOR6sM77QXoXtxCZq1jO7oH2ksQ4xQh+3B8FPIzZwjMsCGp8MzOJIbjTxcBPqOvO+4jNZ4tZ4ivgM+HE1whIa3Ok7pjltGNY/TWnSuyUlQRFbhHsec3tAQO7c/5sovWUXz3IicO0DfDSezxHhBYtNqvsRU4waCzrnzHUE397Xf8MKV5Ab2nWQokXY17dwb99wXn7zScvZLioU21IsP081DB1ixdqUrahg4/1wiwh9uW9AcSMpdQSblQPM+K7Ok1Uv9uLWtVmPX3SjsZcFyvRzNK1TVDJz/DGXJNdDcNQREzN1kho+rayHic9OHGrqqQ/6f6MoeKAI/0dFiomcOgz3g1ax/dGmYPWE4eNY/qYXQuHlQsWcwWHBdVegcx/fut0Op1O5xfyBzfiKaWdaPkVAAAAAElFTkSuQmCC"
                      alt="Profile"
                      className="h-24 w-24 object-cover mb-5 me-3 w-100"
                    />
                  </div>
                  <div className='ms-3 mb-5'>
                    <h2 className="font-weight-bold">{userName}</h2>
                    <h4 className="text-muted">@{userName}</h4>
                    <div className="d-flex gap-5 mt-4">
                      <div className="mr-4 text-center">
                        <h5 className="font-weight-normal">Subscriptions</h5>
                        <h4 className="font-weight-bold">
                          {totalSubscription}
                        </h4>
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
