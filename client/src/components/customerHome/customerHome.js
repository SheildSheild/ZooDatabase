import "./customerHome.css"
import Navbar from '../navBar/navBar';
import { postData } from "../../communication";


export default function CustomerHome(){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];

    return     (
    <>
    <Navbar links={links} />
    <br></br>
    <center>
    <div><h1><strong>Customer Sign In</strong></h1></div>
    <div>
    <form onSubmit={(ev)=>{
        ev.preventDefault();
        const form=ev.target;
        console.log(form);
        postData('/login',{
            username:form.Email.value,
            password:form.Password.value
        }).then(val=>console.log(val))
    }}>
        <label for="Email">Email:</label>
        <input type="email" name="Email" id="Email"/>
        <br/>
        <br/>
        <label for="Password">Password:</label>
        <input type="password" name="Password" id="Password"/>
        <br/>
        <br/>
        <input type="submit" value="Go!"/>
    </form>
    </div>
    </center> 
    </>
    )
}