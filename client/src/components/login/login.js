import "./login.css"
import Navbar from '../navBar/navBar';
import { getData } from "../../communication";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Login({link}){
    // const links = ["homepage", "login", "customerSignUp", "animalPage", "aboutUsPage"];
    const links = [["homepage", "Home"], ["customerSignUp", "Sign Up"], ["login", "Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"]];
    const navigate = useNavigate(); // navigates to next page upon customer login
    const [errorMessage, setErrorMessage] = useState(''); // stores error

    const handleLogin = async (ev) => {
        ev.preventDefault();
        const email = ev.target.Email.value;
        const password = ev.target.Password.value;

        getData(`/login_${link}?Email=${email}&Password=${password}`)
        .then((response) => {
            if (response&&response.user&&response.token&&response.userId) {
                localStorage.setItem('token',response.token);
                localStorage.setItem('role', response.user.Role);
                localStorage.setItem('userId',response.userId);
                console.log('stored token and role');
                navigate('/portal'); // Redirect only on successful login
            } 
            else 
                setErrorMessage('Incorrect email or password. Please try again.');
        })
        .catch((error) => {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login. Please try again.');
        });
    };

    return <>
        <Navbar links={links} />
        <br/>
        <center>
        <div><h1><strong>Login</strong></h1></div>
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
            <label htmlFor="Email">Email:</label>
            <input type="email" name="Email" id="Email" required />
            <br/> <br/>
            <label htmlFor="Password">Password:</label>
            <input type="password" name="Password" id="Password" required/>
            <br/> <br/>
            <input type="submit" value="Go! "/>
        </form>
        </div>
        </center> 
    </>;
}

const CustomerLogin=()=><Login link='customers'/>
const EmployeeLogin=()=><Login link='employees'/>

export {EmployeeLogin,CustomerLogin};