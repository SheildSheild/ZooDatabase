import './homepage.css';
import cougar from './cougar.png';
import Navbar from '../navBar/navBar';
import { Link } from 'react-router-dom';

export default function Homepage(){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "ticketsPage", "dataEntry","employeeHome", "aboutUsPage"];
    return     <>
    <Navbar links={links}/>
    <br></br>
    <h1><center><strong>Weclome to the <em>Cougar Zoo</em> Database!</strong></center></h1>
    <h2><center><img src={cougar} alt="cougar at our Zoo"></img></center></h2>
    <h4><center><Link to='/customerHome'>Returning Customer</Link></center></h4>
    <h4><center>Don't have a account yet? <Link to="/customerSignUp">Click Here To Sign Up...</Link></center></h4>
    </>
    
}