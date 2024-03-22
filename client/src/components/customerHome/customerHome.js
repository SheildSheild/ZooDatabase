import "./customerHome.css"
import Navbar from '../navBar/navBar';
import { postData } from "../../communication";
import { useNavigate } from "react-router-dom";

export default function Login({title,}){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
    const navigate=useNavigate();
    return (
    <>
    <Navbar links={links} />
    <br></br>
    <center>
    <div><h1><strong>{title}</strong></h1></div>
    <div>
    <form onSubmit={(ev)=>{
        ev.preventDefault();
        const form=ev.target;
        console.log(form);
        postData('/login',data).then(val=>{
            if(val){
                navigate('/customerHome');
                localStorage.setItem('auth',{
                    username:
                })
            }
        })
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

// function CustomerLogin(){
//     return <Login title={}/>
// }