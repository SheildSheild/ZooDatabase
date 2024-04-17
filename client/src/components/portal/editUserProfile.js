import React, { useState } from 'react';
import { updateData } from '../../communication';
import { useNavigate } from 'react-router-dom';

function UserProfileForm({ userData }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
    email: userData.email || '',
    name: userData.name || '',
    address: userData.address || '',
    phone: userData.phone || ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('/customers', 'Customer_ID', userData.Customer_ID, formData)
      .then(response => {
        if (response && response.message && response.message.includes('successfully')) {
          toggleEditMode(); // Turn off edit mode on success
          navigate('/portal'); // Optional: Redirect or simply update the state to reflect changes
        } else {
          setErrorMessage(`Failed to update profile: ${response.message}`);
        }
      })
      .catch(error => {
        setErrorMessage(`An error occurred: ${error.message}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <button type="submit">Update Profile</button>
      <button onClick={toggleEditMode}>Cancel</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  )
}

export default UserProfileForm;
