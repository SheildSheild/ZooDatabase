import "../login/login.css"
import Navbar from '../navBar/navBar';
import { getData } from "../../communication";
import { postData } from '../../communication';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dayjs from "dayjs";
import parrotPic from '../imageFiles/parrots.jpg';
import danceDuck from '../imageFiles/duckdance.gif';
import arrowSignIn from '../imageFiles/arrow2.png';
import arrowLogin from '../imageFiles/arrow3.png';

function ToggleForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState(null); // null initially, 'customers' or 'employees'
    const links = [["homepage", "Home"], ["customerSignUp", "Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost somthing?"]];
    
    return (
        <>
            <Navbar links={links}/>
            <br/>
            <img src={parrotPic} className="backdrop1" alt="Parrot Background" />
            <div className="overlay-content2">
                <h2>
                    <strong><em3><span>Welcome</span></em3><br />
                    <em4>Back!</em4></strong>
                </h2>
            </div>
            <div className="form-container">
                {!userType ? (
                    <div className="user-selection">
                        <h2>Please select your login type:</h2>
                        <button onClick={() => setUserType('customers')}>Customer</button>
                        <button onClick={() => setUserType('employees')}>Employee</button>
                    </div>
                ) : (
                    <>
                    <img src={danceDuck} className="dancing-gif" alt="Dancing Duck" />
                    {userType === 'customers' && isLogin && <img src={arrowSignIn} className="arrow-pointing" alt="Pointing arrow" />}
                    {userType === 'customers' && !isLogin && <img src={arrowLogin} className="arrow-pointing2" alt="Pointing arrow" />}
                        <div className="toggle-buttons">
                            {userType === 'customers' && (
                                <>
                                    <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>Login</button>
                                    <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>Sign Up</button>
                                </>
                            )}
                            {userType === 'employees' && (
                                <button onClick={() => setIsLogin(true)} className="active">Login</button>
                            )}
                        </div>
                        {isLogin ? <LoginForm link={userType} /> : userType === 'customers' && <SignUpForm link={userType} />}
                    </>
                )}
            </div>
        </>
    );
}

function LoginForm({link}) {
    const navigate = useNavigate(); // navigates to next page upon customer login
    const [errorMessage, setErrorMessage] = useState(''); // stores error

    const handleLogin = async (ev) => {
        ev.preventDefault();
        const email = ev.target.Email.value;
        const password = ev.target.Password.value;

        getData(`/login_${link}?Email=${email}&Password=${password}`)
        .then((response) => {
            console.log('stored token and role',response);
            if (response&&response.user&&response.token&&response.userId) {
                localStorage.setItem('token',response.token);
                localStorage.setItem('role', response.user.Role);
                localStorage.setItem('userId',response.userId);
                localStorage.setItem('expirationDate',dayjs().add(1,'hour').format());
                console.log('stored token and role',response);
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

    return (
        <form onSubmit={handleLogin} className="login-form">
            <div>
                <label htmlFor="Email">Email:</label>
                <input type="email" name="Email" id="Email" required />
            </div>
            <div>
                <label htmlFor="Password">Password:</label>
                <input type="password" name="Password" id="Password" required />
            </div>
            <div>
                <input type="submit" value="Login" />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
    
}

function SignUpForm() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    // const links = [["homepage", "Home"], ["customerSignUp", "Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost somthing?"]];

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
    {/* <Navbar links={links} /> */}
    {/* <br></br>
    <br/>
    <br/> */}
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

const CustomerLogin=()=><LoginForm link='customers'/>
const EmployeeLogin=()=><LoginForm link='employees'/>
export default ToggleForm;
export {EmployeeLogin,CustomerLogin};