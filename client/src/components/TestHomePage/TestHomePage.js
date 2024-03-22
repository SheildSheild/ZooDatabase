import React from 'react';
import { Link } from 'react-router-dom';
import './TestHomePage.css';
import { useEffect, useState } from 'react';
import { getData, postData } from '../../communication';

function getToken() {
  return localStorage.getItem('token');
}

function getRole() {
  return localStorage.getItem('role')
}

function TestHomePage({list}) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Assuming you have a function to get the saved token
    const token = getToken(); // Get your token from somewhere, like localStorage
    const role = getRole()
    if (token) {
      getData('/users', token)
        .then(data => {
          console.log('Protected data:', data);
          setUserData(data)
        })
        .catch(error => {
          console.error('Failed to fetch protected data:', error);
        });
    }
  }, []);
  if (!userData) {
    return <div>Loading...</div>
  }
  return (
    <div className="homepage">
      <div className="sidebar">
      <br/><br/>
        <Link className="sidebar-item" to="/profile">View Profile</Link>
        <br/>
        <Link className="sidebar-item" to="/ticketsPage">Buy Tickets</Link>
        <br/>
        <Link className="sidebar-item" to="/animalPage">View Animals</Link>
        <br/>
        <Link className="sidebar-item" to="/calendar">View Schedule</Link>
        <br/>
        <Link className="sidebar-item" to="/manage">Manage Data</Link>
      </div>
      <div className="main-content">
        {/* Content rendering based on route will be handled by the RouterProvider in the main index.js */}
        <p> Welcome back, {userData.username}!</p>
      </div>
    </div>
  );
}


function Test(){
  return <TestHomePage list={[
    {link:'/profile',text:"View Profile"}, 
    {link:"/ticketsPage", text:"Buy Tickets"}, 
    {link:"/animalPage", text:"View Animals"},
    {link:"/calendar", text:"View Schecule"},
    {link:"/medicalRecords", text:"View Medical Records"},
    {link:"/manage", text:"Manage Data"}]}/>
}


export default TestHomePage;
