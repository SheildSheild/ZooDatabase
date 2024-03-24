import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TestHomePage.css';
import { getData } from '../../communication';
import DisplayTable from '../displayTable';

function getToken() {
  return localStorage.getItem('token');
}

function getRole() {
  return localStorage.getItem('role');
}

const customerLinks = [
  { text: 'View Profile', onClick: (userData,setMainComponent)=>{
    
  } },
  { text: 'Buy Tickets', onClick: (userData,setMainComponent)=>{
    
  } },
];

const employeeLinks = [
  // IMPLEMENT A PAGE TO EDIT ANIMALS
  { text:"View Schedule", onClick: (userData,setMainComponent)=>{
    
  }},
]

const medicLinks = [
  { text: 'View Medical Records', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable link='\animal_health'/>)
  } },
]

const managerLinks = [
  // IMPLEMENT A PAGE TO EDIT EMPLOYEES
  // IMPLEMENT A PAGE TO EDIT TICKETS
  { text: 'Manage Data', onClick: (userData,setMainComponent)=>{
    
  } },
  { text: 'View Medical Records', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable link='\animal_health'/>)
  } },
];

function TestHomePage() {
  const [userData, setUserData] = useState(null);
  const [mainComponent,setMainComponent]=useState(<></>)

  useEffect(() => {
    const token = getToken();
    if (token) {
      getData('/users', token)
        .then(data => {
          console.log('Protected data:', data);
          setUserData(data);
          setMainComponent(<h1>Welcome back, {data.username}!</h1>);
        })
        .catch(error => {
          console.error('Failed to fetch protected data:', error);
        });
    }
  },[]);
  
  if (!userData) 
    return <div>Loading...</div>;

  // Determine which links to display based on user role
  const sidebarLinks = [];

  const role = getRole();
  if (userData.employeeDetails) {
    const employeeRole = userData.employeeDetails.isManager ? 'manager' : (userData.employeeDetails.isMedic ? 'medic' : '');
    sidebarLinks.push(...employeeLinks)
    if (employeeRole === 'manager') 
      sidebarLinks.push(...managerLinks);
    else if (employeeRole === 'medic') 
      sidebarLinks.push(...medicLinks);
  }
  else
    sidebarLinks.push(...customerLinks);

  return (
    <div className="homepage">
      <div className="sidebar">
        {sidebarLinks.map((item, index) => (
          <React.Fragment key={index}>
            <button className='sidebar-item' onClick={()=>item.onClick(userData,setMainComponent)}>{item.text}</button>
            <br/>
          </React.Fragment>
        ))}
      </div>
      <div className="main-content">
        {mainComponent}
      </div>
    </div>
  );
}

export default TestHomePage;
