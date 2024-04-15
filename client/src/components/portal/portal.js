import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './portal.css';
import { getData } from '../../communication';
import { handleLogout } from '../../utils';
import DisplayTable from '../displayTable/displayTable.js';
import SideBar from '../sidebar';

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

  const NotificationBell=()=><button onClick={() => {
    if(!showNotifications)
      setMainComponent(<DisplayTable route='\alerts'/>,true);
    else  
      setMainComponent(<PortalHome />,false);
    reRender();
  }}> 🔔 </button>;

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
    return <div>{mainComponent||'Loading...'}</div>;
  
  return (
    <div className="homepage">
      <div className="sidebar">
        <SideBar {...{setMainComponent,userData:userData.current,reRender}}/>
      </div>
      <div className="log-out">
        <NotificationBell/>
        <button onClick={()=>handleLogout(()=>window.location.href='/')}>Log Out</button>    
      </div>
      <div className="main-content">
        {renderCnt%2?mainComponent:<div>{mainComponent}</div>}
      </div>
    </div>
  );
}

export default Portal;
