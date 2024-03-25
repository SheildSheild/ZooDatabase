import React, { useState } from 'react';

function ReportForm({ onFormSubmit }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    if (toDateObj <= fromDateObj) {
      setErrorMessage('The "To Date" must be later than the "From Date".');
      return;
    }

    setErrorMessage('');
    onFormSubmit({ fromDate, toDate });
    setIsFormSubmitted(true);
  };

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setIsFormSubmitted(false);
  };

  return (
    <>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            From Date:
            <input type="date" required value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </label>
          <label>
            To Date:
            <input type="date" required value={toDate} onChange={e => setToDate(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <button onClick={handleReset}>Fill the form again</button>
      )}
    </>
  );
}

export default ReportForm;
