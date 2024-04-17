import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './portal.css';
import { Container, Box} from '@mui/material';
import { getData} from '../../communication';
import { handleLogout } from '../../utils';
import DisplayTable from '../displayTable/displayTable.js';
import SideBar from '../sidebar';
import UserProfileForm from './editUserProfile.js';

const getToken=()=>localStorage.getItem('token');
const getRole=()=>localStorage.getItem('role');
const getID=()=>localStorage.getItem('userId');

function Portal() {
  const userData = useRef(null);
  const [mainComponent,setComponent]=useState(<></>)
  const [showNotifications, setShowNotifications] = useState(false);
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);
  const setMainComponent=(component,notif)=>{
    setComponent(component);
    setShowNotifications(notif);
  };
  const navigate=useNavigate();

  const PortalHome=()=><>
    <h1>Welcome back, {userData.current.Email}!</h1>
  </>;

  
  const handleProfileUpdateSuccess = (message) => {
    console.log('Update success:', message);
    alert(`test: ${message}`);
    setMainComponent(<PortalHome />);
  };

  const handleProfileUpdateError = (errorMessage) => {
    alert(`Failed to update proile: ${errorMessage}`);
  };

  const editProfile = () => {
    setMainComponent(<UserProfileForm userData={userData.current} onSuccess={handleProfileUpdateSuccess} onError={handleProfileUpdateError} />);
  };

  const NotificationBell=()=><button onClick={() => {
    if(!showNotifications)
      setMainComponent(<DisplayTable route='\alerts'/>,true);
    else  
      setMainComponent(<PortalHome />,false);
    reRender();
  }} className='notification'>
     🔔 
  </button>;

  useEffect(() => {
    if (getToken()) {
      const role=getRole();
      const route=role==='Customer'?'/customers?Customer_ID=':'/employees?Employee_ID=';
      getData(route+getID())
        .then(data => {
          if(data.status){
            setMainComponent(<>
              <h1>{data.status}: {data.statusText}</h1>
              <h2>Message: {data.message}</h2>
            </>)
          }
          if(!data||!data[0]){
            setMainComponent(<h2>Not Logged In!</h2>)
            reRender();
            return;
          }
          console.log('Protected data:', data[0]);
          userData.current=data[0];
          setMainComponent(<PortalHome/>);
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
  
  if (!userData.current) 
    return <Container>{mainComponent||'Loading...'}</Container>;
  
  return (
    <Container sx={{ bgcolor: '#fffafa', minHeight: '100vh', minWidth: '100vw', display: 'flex', padding: 0, margin: 0,overflow: 'hidden' }}>
      <Box display="flex" width="100%">
        <SideBar {...{ setMainComponent, userData:userData.current, reRender, editProfile }}/>
        <Box component="main" flexGrow={1} p={3} sx={{overflow:'hidden',height:'100%'}}>
          {getRole() === 'Manager' && <NotificationBell/>}
          {getRole() === 'Customer' && <button onClick={editProfile}>Edit Profile</button>}
          <button onClick={editProfile}>Edit Profile</button>
          <button color="error" variant="container" className='log-out' onClick={() => handleLogout(() => window.location.href='/')}>Log Out</button>
          <div key={renderCnt}>{mainComponent}</div>
        </Box>
      </Box>
    </Container>
  );
}

export default Portal;
