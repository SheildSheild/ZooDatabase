import './homepage.css';
import cougar from '../imageFiles/cougar.png';
import Navbar from '../navBar/navBar';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useState } from 'react';
import zooVideo from '../imageFiles/Zoo_Homepage.mp4';
import cougarLogo from '../imageFiles/Cougar_Logo.png';
import HappyCoug from '../imageFiles/happyCoug.jpeg';
import pointAnimal from '../imageFiles/pointingelephant.gif';

export default function Homepage(){
    const [renderCnt,render]=useState(1);
    const reRender=()=>render(renderCnt+1);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); 
        localStorage.removeItem('userId'); 
        localStorage.removeItem('expirationDate');
        reRender();
    };
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
        <div className="video-container">
            <video autoPlay loop muted className="background-video">
                <source src={zooVideo} type="video/mp4" />
            </video>
            <div className="overlay-content">
                {/* <img src={cougarLogo} alt="Cougar Zoo Logo" className="zoo-logo" /> */}
                <h1>
                    <strong><em3><span>The</span></em3><br />
                    <em2>Cougar Zoo</em2><br />
                    <em3><span>Database</span></em3></strong>
                </h1>
            </div>
        </div>
        <div className="main-container">
            <div className="login-container">
                <h1><center><strong>Welcome to the <em>Cougar Zoo</em> Database!</strong></center></h1>
                {/* <h2><center><img src={cougar} alt="cougar at our Zoo"></img></center></h2> */}
                {isLoggedIn ? (
                    <h4><center><button onClick={handleLogout}>Logout</button></center></h4>    
                ) : (<>
                    <h4><center>Returning user? <Link className='link' to='/login'>Login</Link></center></h4>
                    <h4><center>Don't have a account yet? <Link className='link' to="/customerSignUp">Sign Up</Link></center></h4>
                </>
                )}
                <img src={pointAnimal} alt="Pointing Elephant Gif" />
            </div>
            <div className="animal-image-container">
                <img src={HappyCoug} alt="Cougar Cover Page" />
            </div>
        </div>
    </>
    
}