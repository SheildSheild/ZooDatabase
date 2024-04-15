import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './portal.css';
import { Container, Box, Button } from '@mui/material';
import { getData } from '../../communication';
import { handleLogout } from '../../utils';
import PayStub from '../payStub/payStub';
import SideBar from '../portal/sidebar.js';
import NotificationBell from '../notificationComp/notificationBell.js';
const getToken=()=>localStorage.getItem('token');
const getRole=()=>localStorage.getItem('role');
const getID=()=>localStorage.getItem('userId');

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
    return <Container>{mainComponent||'Loading...'}</Container>;

  return (
    <Container sx={{ bgcolor: '#fffafa', minHeight: '100vh', minWidth: '100vw', display: 'flex', padding: 0, margin: 0,overflow: 'hidden' }}>
      <Box display="flex" width="100%">
        <SideBar {...{ setMainComponent, userData, reRender }}/>
        <Box component="main" flexGrow={1} p={3}>
          <NotificationBell />
          <div key={renderCnt}>{mainComponent}</div>
          <button color="error" variant="container" onClick={() => handleLogout(() => window.location.href='/')}>Log Out</button>
        </Box>
      </Box>
    </Container>
  );
}

export default Portal;
