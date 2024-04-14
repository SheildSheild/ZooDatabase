import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './portal.css';
import { getData } from '../../communication';
import DisplayTable from '../displayTable';
import ViewSchedule from '../viewSchedule';
import ManageSchedule from '../manageSchedule';
import Report from '../report';
import CustomerProfile from '../customerProfile'
import TicketsPage from '../ticketsPage/ticketsPage';
import { handleLogout } from '../../utils';
import PayStub from '../payStub/payStub';
import NotificationBell from '../notificationComp/notificationBell.js';
const getToken=()=>localStorage.getItem('token');
const getRole=()=>localStorage.getItem('role');
const getID=()=>localStorage.getItem('userId');

const customerLinks = [
  { text: 'View Profile', onClick: (userData,setMainComponent)=>{
    setMainComponent(<CustomerProfile/>);
  }},
  { text: 'Buy Tickets', onClick: (userData,setMainComponent)=>{
    setMainComponent(<TicketsPage/>);
  }},
  { text: 'Purchase History', onClick: (userData,setMainComponent)=>{
    setMainComponent();
  }},
];

const employeeLinks = [
  { text:"View My Schedule", onClick: (userData,setMainComponent)=>{
    setMainComponent(<ViewSchedule route='\employee_schedules' ID={['Employee_ID',userData.Employee_ID]}/>)
  }},
]

const medicLinks = [
  { text: 'Edit Medical Records', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\animal_health'/>)
  } },
]

const managerLinks = [
  { text: 'Edit Animals List', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\animals'/>)
  } },
  { text: 'Edit Purchases', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\purchases'/>)
  } },
  { text: 'Employee TimeSheet', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\timesheets'/>)
  } },
  { text: 'Edit Employee Schedules', onClick: (userData,setMainComponent)=>{
    setMainComponent(<ManageSchedule route='\employee_schedules'/>)
  } },
  { text: 'Employee Paystub', onClick: (userData,setMainComponent)=>{
    setMainComponent(<PayStub/>)
  } },
  { text: 'View Revenue Report', onClick: (userData,setMainComponent)=>{
    setMainComponent(<Report route='/shop_revenue' title='Report Revenue From Shop'/>)
  } },
];

function Portal() {
  const [userData, setUserData] = useState(null);
  const [mainComponent,setMainComponent]=useState(<></>)
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);
  const navigate=useNavigate();
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
    else
      navigate('/');
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
          <NotificationBell />
      </div>
      <button className="log-out" onClick={()=>handleLogout(()=>window.location.href='/')}>Log Out</button>
      <div className="main-content">
        {renderCnt%2?mainComponent:<div>{mainComponent}</div>}
      </div>
    </div>
  );
}

export default Portal;
