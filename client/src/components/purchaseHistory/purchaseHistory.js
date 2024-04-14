import { getData } from "../../communication";
import './purchaseHistory.css'
import React, {useEffect, useState} from "react";
import DisplayTable from '../displayTable';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const getID=()=>localStorage.getItem('userId'); 

export default function PurchaseHistory() {
    const [purchasesData, setPurchasesData] = useState([]);
    const [purchaseColumns, setPurchaseColumns] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=> {
        getData('/purchases?Customer_ID='+getID()) 
        .then(data=>{
            if (!data) {
                setErrorMessage('Failed to fetch purchase data');
            }
            else {
                setPurchasesData(data);
                console.log(data);
                let dataColumns = [];
                for(let prop in data[0]) {
                    dataColumns.push(prop);
                }
                setPurchaseColumns(dataColumns);
            }
        })
        .catch(err=>setErrorMessage('Error: '+err));
    },[]);

    const [ticketData, setTicketData] = useState([]);
    const [ticketColumns, setTicketColumns] = useState([]);

    useEffect(()=> {
        getData('/tickets?Customer_ID='+getID())
        .then(data=>{
            if (!data) {
                setErrorMessage('Failed to fetch ticket data');
            }
            else {
                let dataColumns = [];
                for(let prop in data[0]) {
                    dataColumns.push(prop);
                }
                setTicketData(data);
                setTicketColumns(dataColumns);
                console.log(data);
            }
        })
        .catch(err=>setErrorMessage('Error: '+err));
    },[]);
    
    if (!purchasesData || !ticketData) {
        return <><center><h1>{errorMessage}</h1></center></>
    }
    else {
        return (<>
            <div className="banner">
                <h1>Purchase History:</h1>
            </div>
            <div className = "purchase container">
                <center>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {purchaseColumns.map((prop, index) => (
                                    <TableCell key={index}>
                                        <h3>{prop}</h3>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchasesData.map((object, index) => (
                                <TableRow key={index}>            
                                    {purchaseColumns.map((prop, index) => (
                                        <TableCell key={index}>
                                            {object[prop]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </center>
            </div>
            <br/>
            <div className="banner">
                <h1>Ticket Purchase History:</h1>
            </div>
            <div className="purchase container">
                <center>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {ticketColumns.map((prop, index) => (
                                    <TableCell key={index}>
                                        <h3>{prop}</h3>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketData.map((object, index) => (
                                <TableRow key={index}>            
                                    {ticketColumns.map((prop, index) => (
                                        <TableCell key={index}>
                                            {object[prop]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </center>
                
            </div>
            
        </>
        )
    }
}
