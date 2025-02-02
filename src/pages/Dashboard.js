import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import TopicCard from '../components/TopicCard';


function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const parseduser = user ? JSON.parse(user) : null;
  const isshow = true;
  
  
  useEffect(() =>{
    if (!parseduser) {
      navigate('/'); 
    }
  },[parseduser, navigate]);
   

  return (
    <div>
      <div className="container">
        {parseduser ? <Header data={parseduser.username} show={isshow} /> : <p>Redirecting...</p>}
      </div>
      <div ClassName='container-fluid'>
        <div className='row'>
          <div className='col col-6'>
            <h1>User</h1>
            <UserCard/>
          </div>
          <div className='col col-6 '>
            <h1> User Topic</h1>
            <div><TopicCard token={parseduser.token} username={parseduser.username}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
