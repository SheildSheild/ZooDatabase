import './customerSignUp.css';
import Navbar from '../navBar/navBar';
import { postData } from '../../communication';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CustomerSignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, Email, address, Phone, Password } = event.target.elements;
        
        postData('/register', {
            username: Email.value,
            email: Email.value, // Assuming email as username
            password: Password.value,
            role: 'customer',
            // Include other fields as needed
        }).then((data) => {
            if (data&&data.message&&data.message === 'User registered successfully') {
                navigate('/portal'); // Redirect on success
            } else {
                console.log('reg failed',data)
                setErrorMessage('Failed to register. Please try again.');
            }
        }).catch((error) => {
            console.error('Registration error:', error);
            setErrorMessage('An error occurred during registration.');
        });
    };
    
    return     (
        
    <>
    <Navbar links={links} />
    <br></br>
        <center>
            <h1><strong>Customer Sign Up</strong></h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label for="name">Name: </label>
                <input type="text" id="name" name="name" required />
                <br />
                <br />
                <label for="Email">Email: </label>
                <input type="email" id="Email" name="Email" required />
                <br />
                <br />
                <label for="Address">Address: </label>
                <input type="address" id="address" name="address" required/>
                <br />
                <br />
                <label for="Phone">Phone Number: </label>
                <input type="phone" id="Phone" name="Phone" required/>
                <br />
                <br />
                <label for="Address">Address: </label>
                <input type="address" id="address" name="address" required/>
                <br />
                <br />
                <label for="Phone">Phone Number: </label>
                <input type="phone" id="Phone" name="Phone" required/>
                <br />
                <br />
                <label for="Password">Password: </label>
                <input type="password" id="Password" name="Password" required />
                <br />
                <br />
                <input type="submit" value="Go!" />
                </form>
        </center>
    </>
    )
}



