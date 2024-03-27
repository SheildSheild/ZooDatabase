import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './portal.css';
import { getData } from '../../communication';
import DisplayTable from '../displayTable';
import EmployeeSchedule from '../employeeSchedule';
import ManagerSchedule from '../managerSchedule';

function getToken() {
  return localStorage.getItem('token');
}

function getRole() {
  return localStorage.getItem('role');
}

function getID() {
  return localStorage.getItem('userId');
}

const customerLinks = [
  { text: 'View Profile', onClick: (userData,setMainComponent)=>{
    
  } },
  { text: 'Buy Tickets', onClick: (userData,setMainComponent)=>{
    
  } },
];

const employeeLinks = [
  { text:"View Schedule", onClick: (userData,setMainComponent)=>{
    setMainComponent(<EmployeeSchedule User_ID={userData.userId}/>)
  }},
]

const medicLinks = [
  { text: 'Edit Medical Records', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable link='\animal_health'/>)
  } },
]

const managerLinks = [
  { text: 'Manage Data', onClick: (userData,setMainComponent)=>{
    
  } },
  { text: 'Edit Animals List', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable link='\animals'/>)
  } },
  { text: 'Edit Purchases', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable link='\purchases'/>)
  } },
  { text: 'Edit Employee Schedule', onClick: (userData,setMainComponent)=>{
    setMainComponent(<ManagerSchedule/>)
  } },
];

function Portal() {
  const [userData, setUserData] = useState(null);
  const [mainComponent,setMainComponent]=useState(<></>)
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);
  useEffect(() => {
    const token = getToken();
    if (token) {
      const role=getRole();
      const route=role=='Customer'?'/customers?Customer_ID=':'/employees?Employee_ID=';
      getData(route+getID())
        .then(data => {
          if(data.status){
            setMainComponent(<>
              <h1>{data.status}: {data.statusText}</h1>
              <h2>Message: {data.message}</h2>
            </>)
          }
          if(!data||!data[0]){
            setMainComponent(<>Not Logged In</>)
            reRender();
            return;
          }
          console.log('Protected data:', data[0]);
          setUserData(data[0]);
          setMainComponent(<h1>Welcome back, {data[0].Email}!</h1>);
          reRender();
        })
        .catch(error => {
          console.error('Failed to fetch protected data:', error);
          setMainComponent(<>Unexpected Error: {error}</>)
          reRender();
        });
    }
  },[]);
  
  if (!userData) 
    return <div>{mainComponent||'Loading...'}</div>;

  const sidebarLinks = [];

  const role = getRole();
  switch(role){
    case 'Customer':
      sidebarLinks.push(...customerLinks);
      break;
    case 'Manager':
      sidebarLinks.push(...managerLinks);
    case 'Medic':
      sidebarLinks.push(...medicLinks);
    default:
      sidebarLinks.push(...employeeLinks)
  }

  return (
    <div className="homepage">
      <div className="sidebar">
        {sidebarLinks.map((item, index) => (
          <React.Fragment key={index}>
            <button className='sidebar-item' onClick={()=>{
              item.onClick(userData,setMainComponent);
              reRender();
              console.log('rerender')
            }}>{item.text}</button>
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

export default Portal;
