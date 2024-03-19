import './customerSignUp.css';
import Navbar from '../navBar/navBar';
import { postData } from '../../communication';

export default function CustomerSignUp(){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
    return     (
    <>
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
                    name:form.name.value
                }).then(val=>console.log(val))
            }}>
                <label for="name">Name: </label>
                <input type="text" id="name" name="name" required />
                <br />
                <br />
                <label for="Email">Email: </label>
                <input type="email" id="Email" name="Email" required />
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