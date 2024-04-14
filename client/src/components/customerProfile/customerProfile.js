import './customerProfile.css'
import { getData } from '../../communication';
import React, { useEffect, useState } from 'react';
import user from './user.png';

const getID=()=>localStorage.getItem('userId');

export default function CustomerProfile() {
    const [customer, setCustomer] = useState(null);
    const [errorMessage,setErrorMessage]=useState('');
    useEffect(()=> {
        getData('/customers?Customer_ID='+getID())
        .then(data=>{
            if(!data) {
            setErrorMessage('Failed to fetch data')
            }
            else{
                setCustomer(data);
                console.log(data);
            }
        })
        .catch(err=>setErrorMessage('Error: '+err))
    },[]);

    if(!customer) {
        return <><center><h1>{errorMessage}</h1></center></>;
    }
    else {
        return <>
            <div>
            <center>
            <h1>My Profile</h1>
            <img src={user} alt='Default user photo'></img>
            <h2>Name: {customer[0].Name}</h2>
            <h3>Email: {customer[0].Email}</h3>
            <h4>Address: {customer[0].Address}</h4>
            <h4>Phone: {customer[0].Phone}</h4>
            </center>
            </div>
        </>
    }
}