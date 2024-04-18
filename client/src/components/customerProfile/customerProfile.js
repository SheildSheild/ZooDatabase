import React, { useEffect, useState } from 'react';
import { getData } from '../../communication';
import UserProfileForm from '../portal/editUserProfile.js';
import user from './user.png';

const getID = () => localStorage.getItem('userId');

export default function CustomerProfile() {
    const [customer, setCustomer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getData(`/customers?Customer_ID=${getID()}`)
        .then(data => {
            if (data && data.length > 0) {
                setCustomer(data[0]);
            } else {
                setErrorMessage('No data found');
            }
        })
        .catch(err => setErrorMessage('Error: ' + err.message));
    }, []);

    const handleEditToggle = () => {
        setEditMode(!editMode);
        setSuccessMessage('');
    };

    if (errorMessage) {
        return <center><h1>{errorMessage}</h1></center>;
    }

    if (!customer) {
        return <center><h1>Loading...</h1></center>;
    }

    return (
        <div className='customer-profile'>
            <div className='banner'>
                <h1>Welcome {customer.Name}!</h1>
            </div>
            <center className='option container'>
                {!editMode ? (
                    <>
                        <div>
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            <img src={user} alt='Default user' />
                            <h2>Name: {customer.Name}</h2>
                            <h3>Email: {customer.Email}</h3>
                            <h4>Address: {customer.Address}</h4>
                            <h4>Phone: {customer.Phone}</h4>
                            <button onClick={handleEditToggle}>Edit Profile</button>
                        </div>
                    </>
                ) : (
                    <UserProfileForm
                        userData={customer}
                        onSuccess={(msg) => {
                            setSuccessMessage(msg || 'Profile updated successfully!');
                            setEditMode(false);
                        }}
                        onCancel={() => setEditMode(false)}
                        onError={(msg) => setErrorMessage(msg)}
                />
                )}
            </center>
        </div>
    );
}
