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
                console.log(purchasesData);
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
                //console.log(data);
                console.log(ticketData);
            }
        })
        .catch(err=>setErrorMessage('Error: '+err));
    },[]);
    if (!purchasesData || !ticketData) {
        return <><center><h1>{errorMessage}</h1></center></>
    }
    else {
        return (<>
            <div>
                <center>
                <h1>Purchase History:</h1>
                <Table>
                    <TableHead><TableRow>{
                        //purchaseColumns.map(prop=><TableCell key={prop}>{prop+' '}</TableCell>)
                        //purchaseColumns[0].map(prop => console.log(prop))
                        // console.log(purchasesData)
                        // purchasesData.map(prop =><TableCell key={prop}>{purchasesData[prop]+' '}</TableCell>)
                    }</TableRow></TableHead>
                    {/* <TableBody>{
                        // purchasesData.map((val,idx) => <>
                        // <TableRow>{
                        //     purchaseColumns.map((prop)=>
                        //     <TableCell>{val[prop]+' '}</TableCell>)
                        // }</TableRow>
                        // </>)
                    }</TableBody> */}
                </Table>
                </center>
                

            </div>
            <div>

            </div>
            
        </>
        )
    }
}
