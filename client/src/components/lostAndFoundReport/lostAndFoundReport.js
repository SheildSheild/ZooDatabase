import React from 'react';
import './lostAndFoundReport.css';
import { postData } from '../../communication';
import Navbar from '../navBar/navBar';




function LostAndFoundReport() {
    const token = localStorage.getItem('token');
    const getID=()=>localStorage.getItem('userId'); 
    const isLoggedIn = token != null;
    let links = [["homepage", "Home"], ["customerSignUp", "Customer Sign Up"], ["login", "Customer Login"],  ["employeeLogin", "Employee Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost somthing?"]];
    if (isLoggedIn) 
        links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal", "User Portal"],["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost somthing?"]];
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const data = {};
        data["Description"] = form["Description"].value;
        // onSubmit(data);
        postData('/lost_items', data).then(val=>{
            if (!val) {
                console.error('Unable to add lost item');
            }
            else {
                console.log("Successfully added lost item!");
            }
        })
        // console.log(data);
        form.reset();
    };
    return (
        <>
        <Navbar links={links}/>
        <center>
        <h1>Report Lost Item</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="Description"></label>
        <input type="text" name="Description"></input>
        <br/>
        <br/>
        <button type="submit">Submit</button>
        </form>
        </center>
        </>
    )
}

export default LostAndFoundReport;