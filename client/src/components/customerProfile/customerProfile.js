import './customerProfile.css'
import { getData } from '../../communication';
import DisplayTable from '../displayTable';
import React, { useEffect, useState } from 'react';

function CustomerProfile({Customer_ID}) {
    const [customer, setCustomer] = useState({});
    const [errorMessage,setErrorMessage]=useState('');
    useEffect(()=> {
        getData('/customers?Customer_ID='+Customer_ID)
        .then(data=>{
            if(!data) {
            setErrorMessage('Failed to fetch data')
            }
            else{
                setCustomer(data);
            }
            console.log(data);
        })
        .catch(err=>setErrorMessage('Error: '+err))
    },{});
    return <>
        <center>
        <h1>{errorMessage}</h1>
        <h1>My Profile</h1>
        </center>
        <h2>{customer.Name}</h2>
        <h3>{customer.Email}</h3>
        <h4>{customer.Address}</h4>
        <h4>{customer.Phone}</h4>
        <center>
        <h4>Purchase History:</h4>
        <DisplayTable id={Customer_ID}></DisplayTable> 
        {/* Purchase History */}
        </center>
    </>
}