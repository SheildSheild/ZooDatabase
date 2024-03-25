import React, { useState } from 'react';

function ReportForm({ onFormSubmit }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [shopType, setShopType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    if (toDateObj <= fromDateObj) {
        setErrorMessage('The "To Date" must be later than the "From Date".');
        return;
    };
    setErrorMessage('');
    onFormSubmit({ fromDate, toDate, shopType });
    setIsFormSubmitted(true);
  }

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setShopType('');
    setIsFormSubmitted(false);
  }

  return (
    <>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    {!isFormSubmitted ? (
      <form onSubmit={handleSubmit}>
        <label>
          From Date:
          <input type="date" required value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </label>
        <br />
        <label>
          To Date:
          <input type="date"  required value={toDate} onChange={e => setToDate(e.target.value)} />
        </label>
        <br />
        <label>
          Shop Type:
          <select required value={shopType} onChange={e => setShopType(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="GiftShop">GiftShop</option>
            <option value="Ticket">Ticket</option>
            <option value="Restaurant">Restaurant</option>
            // Add more options as needed
          </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    ) : (
      <button onClick={handleReset}>Fill the form again</button>
    )}
    </>
  );
}

export default ReportForm;
