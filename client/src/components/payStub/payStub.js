import React, { useEffect, useRef,useState } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import {getData} from '../../communication';
import "./payStub.css"
import DisplayTable from '../displayTable';
function PayStub() {
    const pdfRef = useRef();
    const role = localStorage.getItem('role');
    const empID = localStorage.getItem('userId');
    const [errorMessage,setErrorMessage] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [empData, setEmpData] = useState('')
    const [id,setId]=useState('')
    const [toDate, setToDate] = useState('');
    const [data,setData] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    
    useEffect(()=>{
        let payStubRoute='/pay_stub?Employee_ID='+empID;
        if(role==="Manager"){
            payStubRoute='/pay_stub';
            getData('/employees')
                .then(data => {
                    if(data.status)
                        setErrorMessage(data.message);
                    else if(data.columns)
                        setErrorMessage('no employees')
                    else
                        setEmpData(data)
                })
                .catch(err => setErrorMessage(err.message));
        }
        else
            setId(localStorage.userId);
        getData(payStubRoute)
            .then(data => {
                if(data.status)
                    setErrorMessage(data.message);
                else if(data.columns)
                    setErrorMessage('no pay stubs')
                else
                    setData(data)
            })
            .catch(err => setErrorMessage(err.message));
    },[])

    const downloadPdf = () => {
        const doc = new jsPDF();
        if (data) {
            autoTable(doc, { html: pdfRef.current });
            doc.save("table.pdf");
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        
        const result = data.filter(item =>{
            const date = new Date(item.Date);
            return (item.Employee_ID == id && date >= startDate && date <= endDate);
        });
        setFilteredData(result);
        setIsFormSubmitted(true);
        console.log(result,data,id,startDate,endDate);
    };
    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setId('');
        setFilteredData([]);
        setIsFormSubmitted(false);
    };
    const employees = Object.values(empData);
    return (
        <div className='PayStub'>        
        <form onSubmit={handleSubmit}>
        <label>
            From Date:
            <br/>
            <input required type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>
        <br/>
        <label>
            To Date:
            <br/>
            <input required type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </label>
        <br/>
        <label>
            ID:
            <br/>
            {role === 'Manager' ? (
                <select id="employee" onChange={(e) => setId(e.target.value)}>
                  <option value="" >Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.Employee_ID} value={employee.Employee_ID}>
                        {employee.Name + " ID: " + employee.Employee_ID}
                    </option>
                  ))}
                </select>
            ) : (
                <input type="number" value={empID} onChange={(e) => setId(e.target.value)} />
            )}
        </label>
        <br/>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
    </form>
        <div>
        {isFormSubmitted && filteredData.length !== 0 && <>
            <div >
                <DisplayTable preloadedData={filteredData} route='/employees' removeHeader pdf ={pdfRef}/>
            </div>
            <button onClick={downloadPdf}>Download PDF</button>
        </>}
    </div>
    <h1>{errorMessage}</h1>
    </div>
    );
}

export default PayStub;
