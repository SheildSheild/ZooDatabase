import React, { useEffect, useState } from 'react';
import { getData } from '../../communication';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DisplayTable from '../displayTable/displayTable';

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=> {
    getData('/alerts') 
    .then(data=>{
        if (!data) {
            setErrorMessage('Failed to fetch alerts data');
        }
        else {
          setNotifications(data);
          console.log(data);
          let dataColumns = [];
          for(let prop in data[0]) {
              dataColumns.push(prop);
          }
          setDataColumns(dataColumns);
        }
    })
    .catch(err=>setErrorMessage('Error: '+err));
  },[]);
  if (!notifications) {
    return <><center><h1>{errorMessage}</h1></center></>
  }
  else {
    return (
        <>
          <div className="notification-dropdown">
            <DisplayTable route='\alerts'/> 
          </div>
        </>
      );
  }
}

export default NotificationComponent;
