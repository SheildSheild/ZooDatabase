import './customerSignUp.css';
import Navbar from '../navBar/navBar';
import { postData } from '../../communication';
import { useNavigate } from 'react-router-dom';

export default function CustomerSignUp(){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
    const navigate=useNavigate();
    return (<>
    <Navbar links={links} />
    <br></br>
        <center>
            <h1><strong>Customer Sign Up</strong></h1>
            <form onSubmit={(ev)=>{
                ev.preventDefault();
                const form=ev.target;
                console.log(form);
                postData('/register',{
                    username:form.Email.value,
                    password:form.Password.value,
                    name:form.name.value,
                    address:form.address.value,
                    phone:form.phone.value,
                }).then(val=>{
                    if(val)
                        navigate('/animalPage');
                })
            }}>
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

