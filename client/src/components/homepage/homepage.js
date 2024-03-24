import './homepage.css';
import cougar from './cougar.png';
import Navbar from '../navBar/navBar';
import { Link } from 'react-router-dom';

export default function Homepage(){
    const token = localStorage.getItem('token');
    const isLoggedIn = token != null;
    // check if logged in!

    var links = ["homepage", "customerSignUp", "customerHome", "animalPage", "aboutUsPage"];
    if (isLoggedIn) {
        links = ["homepage", "animalPage","testhomepage","aboutUsPage"];
    }
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from storage
        localStorage.removeItem('userRole'); // Remove user role
        window.location.reload(); // Optionally, force a reload to clear app state
    };

    return     <>
    <Navbar links={links}/>
    <h1><center><strong>Weclome to the <em>Cougar Zoo</em> Database!</strong></center></h1>
    <h2><center><img src={cougar} alt="cougar at our Zoo"></img></center></h2>
    {isLoggedIn ? (
                <>
                    <h4><center><Link className='link' to='/customerHome'>Returning Customer</Link></center></h4>
                    <h4><center><button onClick={handleLogout}>Logout</button></center></h4>
                </>
            ) : (
                <h4><center><Link className='link' to='/customerHome'>Returning Customer</Link></center></h4>
            )}
    <h4><center>Don't have a account yet? <Link className='link' to="/customerSignUp">Click Here To Sign Up...</Link></center></h4>
    </>
    
}