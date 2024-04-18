import React, { useState } from 'react';
import { updateData } from '../../communication';
import { useNavigate } from 'react-router-dom';
import DataEntry from '../dataEntry';

function UserProfileForm({ userData, onSuccess, onError, onCancel }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = data => {
    updateData('/customers', 'Customer_ID', userData.Customer_ID, data)
      .then(response => {
        if (response && response.message && response.message.includes('successfully')) {
          onSuccess('Profile updated successfully!');
          setErrorMessage('Success!');
          for(let prop in data)
            userData[prop]=data[prop];
          navigate('/portal'); // Redirect on successful update
        } else {
          setErrorMessage(`Failed to update profile: ${response.message}`);
          if (onError) onError(`Failed to update profile: ${response.message}`);
        }
      })
      .catch(error => {
        setErrorMessage(`An error occurred: ${error.message}`);
        if (onError) onError(`An error occurred: ${error.message}`);
      });
  };

  return <>
      <DataEntry title="Edit Profile" name="Customers" onSubmit={handleSubmit} preFilled={userData}/>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>;
}

export default UserProfileForm;
