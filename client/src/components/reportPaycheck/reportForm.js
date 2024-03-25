import React ,{useState} from 'react'

function ReportForm({ onFormSubmit }) {
  const [employeeId, setEmployeeId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    };
    setErrorMessage('');
    onFormSubmit({ employeeId,firstName,lastName,fromDate, toDate });
    setIsFormSubmitted(true);
  };
  const handleReset = () => {
    setEmployeeId('');
    setFirstName('');
    setLastName('');
    setFromDate('');
    setToDate('');
    setIsFormSubmitted(false);
  }
  return (
    <>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {!isFormSubmitted ? (
      <form onSubmit={handleSubmit}>
          <label>
              Employee ID:
              <input type="number" required value={employeeId} onChange={e => setEmployeeId(e.target.value)} />
          </label>
          <label>
              First Name:
              <input type="text"  required value={firstName} onChange={e => setFirstName(e.target.value)} />
          </label>
          <label>
              Last Name:
              <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} />
          </label>
          <label>
              From Date:
              <input type="date" required value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </label>
          <label>
              To Date:
              <input type="date" required value={toDate} onChange={e => setToDate(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
    </form>):(<button onClick={handleReset}>Fill the form again</button>)
    }
    </>
  );
}

export default ReportForm