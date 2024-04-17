import { postData } from '../../communication';
import React, { useState, useEffect } from 'react';
import './makeAComplaint.css'
import Navbar from '../navBar/navBar';

export default function MakeAComplaint() {
    const [errorMessage, setErrorMessage] = useState(null);
    const token = localStorage.getItem('token');
    const getID=()=>localStorage.getItem('userId'); 
    const isLoggedIn = token != null;
    let links = [["homepage", "Home"], ["customerSignUp", "Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport", "Lost somthing?"]];
    if (isLoggedIn) 
        links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal", "User Portal"],["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport", "Lost somthing?"]];
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const data = {};
        if (getID() !== null) {
            data['Customer_ID'] = getID();
        }
        data['Description'] = form['Description'].value;
        data['Date_Created'] = new Date().toISOString().slice(0, 19).replace('T', ' ');
        postData('/complaints', data).then(val=>{
            if (val['message'] === 'Error adding Complaints') {
                console.error('Unable to add complaint');
                setErrorMessage('Unable to add complaint: Message too long.')
            }
            else {
                console.log('Successfully added complaint');
                console.log(val);
                form.reset();
            }
        }).catch((error) => {
            setErrorMessage('An error occurred during submission. Please try again.'); // Set error message in case of promise rejection
            console.log('hello');
        });
        
    }
    return (
    <>
        <center>
        <Navbar links={links}/>
        <br/>
        <br/>
        <div className = "banner">
            <h2>Post your complaint here</h2>
        </div>
        <div className="option container">
            <form onSubmit={handleSubmit}>
                <input type='text' name='Description'></input>
                <br/>
                <br/>
                <button type='submit'><b>Submit</b></button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
        </center>
    </>
    )
}