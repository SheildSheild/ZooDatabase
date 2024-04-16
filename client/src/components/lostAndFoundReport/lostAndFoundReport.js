import React from 'react';
import './lostAndFoundReport.css';
import { postData } from '../../communication';
import Navbar from '../navBar/navBar';




function LostAndFoundReport() {
    const token = localStorage.getItem('token');
    const getID=()=>localStorage.getItem('userId'); 
    const isLoggedIn = token != null;
    let links = [["homepage", "Home"], ["customerSignUp", "Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost something?"]];
    if (isLoggedIn) 
        links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal", "User Portal"],["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost something?"]];
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const data = {};
        if (getID() !== null) {
            data['Customer_ID'] = getID();
        }
        data["Description"] = form["Description"].value;
        postData('/lost_items', data).then(val=>{
            if (!val) {
                console.error('Unable to add lost item');
            }
            else {
                console.log("Successfully added lost item!");
                // console.log(val);
            }
        })
        form.reset();
    };
    return (
        <>
        <Navbar links={links}/>
        <center>
            <br/>
            <br/>
            <div className = "banner">
                <h2>Report Lost Item</h2>
            </div>
            <div className='option container'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="Description"></label>
                <input type="text" name="Description"></input>
                <br/>
                <br/>
                <button type="submit">Submit</button>
                </form>
            </div>
        </center>
        </>
    )
}

export default LostAndFoundReport;