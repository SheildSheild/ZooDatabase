import './customerSignUp.css';
import Navbar from '../navBar/navBar';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import axios from 'axios';
import { response } from 'express';
import { postData } from '../../communication';

export default function CustomerSignUp(){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
    let Val = 3;
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const created_at = new Date().getTime();

    const custSignUp = aync () => {
        axios.post('/customercheck', {username: username
        }).then((response) => {
            if (response.data.message === "Error! User already exists.") {

            }
            else {
                axios.post('/customerSignUp', {
                    
                }
                )
            }
        })

    };


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