import './homepage.css';
import Navbar from '../navBar/navBar';

export default function Homepage(){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "ticketsPage", "dataEntry", "aboutUsPage"];
    return     <>
    <Navbar links={links}/>
    <br></br>
    <h1><center><strong>Weclome to the <em>Cougar Zoo</em> Database!</strong></center></h1>
    <h2><center><img src="\public" alt="cougar at our Zoo"></img></center></h2>
    <h4><a href="ZooDatabase\client\public\cougar.png"><center><button>Returning Customer</button></center></a></h4>
    <h4><center><a>Don't have a account yet?</a> <a href="\customerSignUp">Click Here To Sign Up...</a></center></h4>
    <a href="\animalPage"></a>
    <a href="\ticketsPage"></a>
    <a href="\dataEntry"></a>
    <a href="\aboutUsPage"></a>
    </>
    
}