import { postData } from '../../communication';
import React, { useState, useEffect } from 'react';
import './makeAComplaint.css'
import Navbar from '../navBar/navBar';

export default function MakeAComplaint() {
    const token = localStorage.getItem('token');
    const getID=()=>localStorage.getItem('userId'); 
    const isLoggedIn = token != null;
    let links = [["homepage", "Home"], ["customerSignUp", "Sign Up"], ["login", "Customer Login"], ["employeeLogin", "Employee Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"]];
    if (isLoggedIn) 
        links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal", "User Portal"],["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"]];
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const data = {};
        data['Customer_ID'] = getID();
        data['Description'] = form['Description'].value;
        data['Date_Created'] = Date();
        postData('/complaints', data).then(val=>{
            if (!val) {
                console.error('Unable to add complaint');
            }
            console.log('Successfully added complaint');
        })
        form.reset();
    }
    return (
    <>
        <center>
        <Navbar links={links}/>
        <div className='complaint-form'>
            <h2>Post your complaint here.</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='Description'></input>
                <button type='submit'><b>Submit</b></button>
            </form>
        </div>
        </center>
    </>
    )
}