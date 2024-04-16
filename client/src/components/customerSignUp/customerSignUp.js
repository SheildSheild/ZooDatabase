import './customerSignUp.css';
import Navbar from '../navBar/navBar';
import { postData } from '../../communication';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CustomerSignUp() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const links = [["homepage", "Home"], ["customerSignUp", "Customer Sign Up"], ["login", "Customer Login"], ["employeeLogin", "Employee Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost somthing?"]];
    const handleSubmit = (event) => {
        event.preventDefault();
        const { Name, Email, Address, Phone, Password } = event.target.elements;
        
        postData('/customers', {
            Name: Name.value,
            Address: Address.value,
            Phone: Phone.value,
            Email: Email.value, // Assuming email as username
            Password: Password.value,
        })
        .then((data) => {
            if (data&&data.message&&data.message?.endsWith('successfully')) 
                navigate('/login'); // Redirect on success
            else 
                setErrorMessage('Failed to register. Please try again.');
        })
        .catch((error) => {
            console.error('Registration error:', error);
            setErrorMessage('An error occurred during registration.');
        });
    };
    
    return     (
        
    <>
    <Navbar links={links} />
    <br></br>
    <br/>
    <br/>
        <center>
            <div className='banner'>
                <h1><strong>Customer Sign Up</strong></h1>
            </div>
            
            <div className='option container'>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label for="name">Name: </label>
                    <input type="text" id="name" name="Name" required />
                    <br />
                    <br />
                    <label for="Email">Email: </label>
                    <input type="email" id="Email" name="Email" required />
                    <br />
                    <br />
                    <label for="Address">Address: </label>
                    <input type="address" id="address" name="Address" required/>
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
            </div>
        </center>
    </>
    )
}



