import './homepage.css';
import cougar from './cougar.png';
import Navbar from '../navBar/navBar';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useState } from 'react';
import { handleLogout } from '../../utils';

export default function Homepage(){
    const [renderCnt,render]=useState(1);
    const reRender=()=>render(renderCnt+1);
    
    const expirationDate=localStorage.getItem('expirationDate');
    if(expirationDate&&dayjs(expirationDate).diff(dayjs())<0)
        handleLogout();
    const token = localStorage.getItem('token');
    const isLoggedIn = token != null;
    

    let links = [["homepage", "Home"], ["customerSignUp", "Sign Up"], ["login", "Customer Login"], ["employeeLogin", "Employee Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"]];
    if (isLoggedIn) 
        links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal", "User Portal"],["aboutUsPage", "About Us"]];
    

    return <>
        <Navbar links={links}/>
        <h1><center><strong>Welcome to the <em>Cougar Zoo</em> Database!</strong></center></h1>
        <h2><center><img src={cougar} alt="cougar at our Zoo"></img></center></h2>
        {isLoggedIn ? (
            <h4><center><button onClick={()=>handleLogout(reRender)}>Logout</button></center></h4>    
        ) : (<>
            <h4><center>Returning user? <Link className='link' to='/login'>Login</Link></center></h4>
            <h4><center>Don't have a account yet? <Link className='link' to="/customerSignUp">Sign Up</Link></center></h4>
        </>
        )}
    </>
    
}