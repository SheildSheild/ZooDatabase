import './customerSignUp.css';
export default function CustomerSignUp(){
    return     <center>
    <h1><strong>Customer Sign Up</strong></h1>
    <form>
        <label for="first_name">First Name: </label>
        <input type="text" id="first_name" name="first_name" required/>
        <br/>
        <br/>
        <label for="last_name">Last Name: </label>
        <input type="text" id="last_name" name="last_name" required/>
        <br/>
        <br/>
        <label for="Email">Email: </label>
        <input type="email" id="Email" name="Email" required/>
        <br/>
        <br/>
        <label for="Password">Password: </label>
        <input type="password" id="Password" name="Password" required/>
        <br/>
        <br/>
        <input type="submit" value="Go!"/>
    </form>
    
</center>
}