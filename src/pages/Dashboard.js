import React from 'react'
import Header from '../components/Header'

function Dashboard() {
  const user=localStorage.getItem("items");
  const parseduser=JSON.parse(user);
  return(
    <div> 
      <div className="container">
      <Header data={parseduser.username}/>
      </div>
    </div>
  )
}
export default Dashboard