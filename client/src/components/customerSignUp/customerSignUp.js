import './customerSignUp.css';
import Navbar from '../navBar/navBar';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import axios from 'axios';
import { response } from 'express';

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
                
            }
        })

    };


    return     (
    <>
    <Navbar links={links} />
    <br></br>
    <center>
            <h1><strong>Customer Sign Up</strong></h1>
            <form>
                <label for="first_name">First Name: </label>
                <input type="text" id="first_name" name="first_name" required />
                <br />
                <br />
                <label for="last_name">Last Name: </label>
                <input type="text" id="last_name" name="last_name" required />
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