import './homepage.css';
import cougar from './cougar.png';
import Navbar from '../navBar/navBar';
import { Link } from 'react-router-dom';

export default function Homepage(){
    const token = localStorage.getItem('token');
    const isLoggedIn = token != null;
    // check if logged in!

    var links = ["homepage", "customerSignUp", "login", "animalPage", "aboutUsPage"];
    if (isLoggedIn) {
        links = ["homepage", "animalPage","portal","aboutUsPage"];
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); 
        localStorage.removeItem('userId'); 
        window.location.reload(); 
    };

    return <>
        <Navbar links={links}/>
        <h1><center><strong>Weclome to the <em>Cougar Zoo</em> Database!</strong></center></h1>
        <h2><center><img src={cougar} alt="cougar at our Zoo"></img></center></h2>
        {isLoggedIn ? (
            <h4><center><button onClick={handleLogout}>Logout</button></center></h4>    
        ) : (<>
            <h4><center>Returning user? <Link className='link' to='/login'>Login</Link></center></h4>
            <h4><center>Don't have a account yet? <Link className='link' to="/customerSignUp">Sign Up</Link></center></h4>
        </>
        )}
    </>
    
}