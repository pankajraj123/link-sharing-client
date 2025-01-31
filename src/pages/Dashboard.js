import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("items");
  const parseduser = user ? JSON.parse(user) : null;
  const isshow = true;

  useEffect(() => {
    if (!parseduser) {
      navigate('/'); 
    }
  }, [parseduser, navigate]);

  return (
    <div>
      <div className="container">
        {parseduser ? <Header data={parseduser.username} show={isshow} /> : <p>Redirecting...</p>}
      </div>
    </div>
  );
}

export default Dashboard;
