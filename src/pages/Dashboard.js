import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import TopicCard from '../components/TopicCard';
import PublicTopic from '../components/PublicTopic'
import { ToastContainer } from "react-toastify";
import UserSubscriptions from '../components/UserSubscriptions';

function Dashboard(){
  const navigate = useNavigate();
  const isShow = true;
  const user = localStorage.getItem("token");
  const parsedUser = user ? JSON.parse(user) : null;
  const token = parsedUser?.token;
  const userName = parsedUser?.userName;
  
  useEffect(() =>{
    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token]);
   
  return (
    <>
    <div>
      <div className="container-fluid">
        {token ? <Header data={userName} show={isShow} /> : <p>Redirecting...</p>}
      </div>
      <div ClassName='container'>
        <div className='row'>
          <div className='col mx-4 mt-4'>
            <h1 className='ms-4'>User</h1>
            <UserCard />
            <PublicTopic  token={token} userName={userName}/>
          </div>
          <div className=' col-6 mt-4'>
            <h1> Your Topic</h1>
            <div><TopicCard token={token} userName={userName}/></div>
            <div><UserSubscriptions token={token}/></div>
          </div>
        </div>
      </div>
    </div>
   <ToastContainer/>
    </>
  );
}

export default Dashboard;
