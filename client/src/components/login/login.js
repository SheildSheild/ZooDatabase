import "./login.css"
import Navbar from '../navBar/navBar';
import { getData } from "../../communication";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import dayjs from "dayjs";
import parrotPic from '../imageFiles/parrots.jpg';
import danceDuck from '../imageFiles/duckdance.gif';

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
                localStorage.setItem('expirationDate',dayjs().add(1,'hour').format());
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
        <div className="navbar-comp">
            <Navbar links={links}/>
        </div>
        <br/>
        <img src={parrotPic} className="backdrop1" alt="Parrot Background" />
        <div className="overlay-content2">
                <h2>
                    <strong><em3><span>Welcome</span></em3><br />
                    <em4>Back!</em4></strong>
                </h2>
            </div>
        <div className="login-box">
        <h1><strong>Login</strong></h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="Email">Email:</label>
                <input type="email" name="Email" id="Email" required />
            </div>
            <br/> <br/>
            <div>
                <label htmlFor="Password">Password:</label>
                <input type="password" name="Password" id="Password" required/>
            </div>
            <br/> <br/>
            <input type="submit" value="Go! "/>
        </form>
            <img src={danceDuck} className="dancing-gif" alt="Dancing Duck" />
        </div>
    </>;
}

const CustomerLogin=()=><Login link='customers'/>
const EmployeeLogin=()=><Login link='employees'/>

export {EmployeeLogin,CustomerLogin};