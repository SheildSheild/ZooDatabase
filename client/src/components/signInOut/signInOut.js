import React, { useState, useEffect } from 'react';
import { postData } from '../../communication';

function SignInOut() {
  const [signInTime, setSignInTime] = useState('07:00:00');
  const [signOutTime, setSignOutTime] = useState('07:30:00');
  const [times, setTimes] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const emp_id = localStorage.userId;

  const handleMessagesTimeout = () => {
    setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
    }, 4000);
  };

  useEffect(() => {
    const timesArray = [];
    for (let index = 0; index < (24 - 7) * 2; index++) {
      const hour = Math.floor(index / 2) + 7; 
      const minute = (index % 2) * 30;
      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minute.toString().padStart(2, '0');
      timesArray.push(`${hourStr}:${minuteStr}:00`);
    }
    setTimes(timesArray);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        Employee_ID:parseInt(emp_id),
        Start_Time: date+" "+signInTime,
        End_Time: date+" "+signOutTime,
    };

    postData('/timesheets',data).then(val=>{
      if (val['message'] === 'Error adding Timesheets') {
        console.error('Unable to add timesheet');
        setErrorMessage('Unable to add timesheet');
      }
      else {
        console.log('Successfully added timesheet');
        console.log(val);
        setErrorMessage(null);
        setSuccessMessage('Timesheet added!');
      }
    }).catch((error) => {
      setErrorMessage('An error occurred during submission. Please try again.'); // Set error message in case of promise rejection
    })
    .finally(() => {
      handleMessagesTimeout();
    });
  }

  return (
    <div>
      <h1>Sign In / Out Page</h1>
      <form>
        <label>
            Employee ID:
            <input type="number" value={emp_id} disabled/>
        </label> 
        <br/>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled/>
        </label>
        <br/>
        <label>
          Sign In Time:
          <select value={signInTime} onChange={(event) => {setSignInTime(event.target.value);}}>
            {times.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </label>
        <br/>
        <label>
          Sign Out Time:
          <select value={signOutTime} onChange={(event) => {setSignOutTime(event.target.value);}}>
            {times.filter(time => time > signInTime).map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );

}

export default SignInOut;
