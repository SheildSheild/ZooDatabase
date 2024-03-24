import "./customerHome.css"
import Navbar from '../navBar/navBar';
import { postData } from "../../communication";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Login({title,}){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
    const navigate = useNavigate(); // navigates to next page upon customer login
    const [errorMessage, setErrorMessage] = useState(''); // stores error

    const handleLogin = async (ev) => {
        ev.preventDefault();
        const email = ev.target.Email.value;
        const password = ev.target.Password.value;

        postData('/login', { email, password })
        .then((response) => {
            // Assuming the response contains an object with a success property
            if (response.userId) {
                console.log(email, password)

                if (response.token) {
                    localStorage.setItem('token',response.token);
                    console.log("token set")
                    localStorage.setItem('role', response.role);
                    console.log("Stored role")
                }
                navigate('/TestHomePage'); // Redirect only on successful login
            } else {
                setErrorMessage('Incorrect email or password. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login. Please try again.');
        });
    };

    return     (
    <>
    <Navbar links={links} />
    <br></br>
    <center>
    <div><h1><strong>Login</strong></h1></div>
    <div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* display error message if exists */}
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
    </>
    );
}

// function CustomerLogin(){
//     return <Login title={}/>
// }

// function CustomerLogin(){
//     return <Login title={}/>
// }