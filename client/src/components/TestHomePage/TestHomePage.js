import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TestHomePage.css';
import { getData } from '../../communication';

function getToken() {
  return localStorage.getItem('token');
}

function getRole() {
  return localStorage.getItem('role');
}

function TestHomePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (token) {
      getData('/users', token)
        .then(data => {
          console.log('Protected data:', data);
          setUserData(data);
        })
        .catch(error => {
          console.error('Failed to fetch protected data:', error);
        });
    }
  }, []);
  
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Determine which links to display based on user role
  const sidebarLinks = [
    { link: '/profile', text: 'View Profile' },
    { link: '/ticketsPage', text: 'Buy Tickets' },
  ];

  const employeeLinks = [
    // IMPLEMENT A PAGE TO EDIT ANIMALS
    {link:"/calendar", text:"View Schedule"},
  ]

  const medicLinks = [
    { link: '/medicalRecords', text: 'View Medical Records' },
  ]

  const managerLinks = [
    // IMPLEMENT A PAGE TO EDIT EMPLOYEES
    // IMPLEMENT A PAGE TO EDIT TICKETS
    { link: '/manage', text: 'Manage Data' },
    { link: '/medicalRecords', text: 'View Medical Records' },
  ];

  const role = getRole();
  if (userData.employeeDetails) {
    var employeeRole = userData.employeeDetails.isManager ? 'manager' : (userData.employeeDetails.isMedic ? 'medic' : '')
    
      sidebarLinks.push(...employeeLinks)
      if (employeeRole === 'manager') {
        sidebarLinks.push(...managerLinks);
      } else if (employeeRole === 'medic') {
        sidebarLinks.push(...medicLinks);
      }
    
  }

  return (
    <div className="homepage">
      <div className="sidebar">
        <br/><br/>
        {sidebarLinks.map((item, index) => (
          <React.Fragment key={index}>
            <Link className="sidebar-item" to={item.link}>{item.text}</Link>
            <br/>
          </React.Fragment>
        ))}
      </div>
      <div className="main-content">
        {/*  */}
        <p>Welcome back, {userData.username}!</p>
      </div>
    </div>
  );
}

export default TestHomePage;
