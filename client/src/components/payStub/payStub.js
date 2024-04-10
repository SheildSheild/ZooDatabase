import React, { useEffect, useRef,useState } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import {getData} from '../../communication';
import { getFormHelperTextUtilityClasses } from '@mui/material';
function PayStub() {
    const pdfRef = useRef();
    const role = localStorage.getItem('role');
    const empID = localStorage.getItem('userId');
    const [fromDate, setFromDate] = useState('');
    const [empData, setEmpData] = useState('')
    const [id,setId]=useState('')
    const [toDate, setToDate] = useState('');
    const [data,setData] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    
    useEffect(()=>{
        getData('/pay_stub').then(data => setData(data)).catch(err => console.log(err.message));
    },[])
    useEffect(()=>{
        getData('/employees').then(data => setEmpData(data)).catch(err => console.log(err.message));
    },[])
    const idsForManager = ['1', '2', '3'];

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
            return (item['Employee ID'] == id && date >= startDate && date <= endDate);
        });
        setFilteredData(result);
        setIsFormSubmitted(true);
    };
    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setId('');
        setFilteredData([]);
        setIsFormSubmitted(false);
        window.location.reload();
    };
    const employees = Object.values(empData);
    return (
        <>        
        <form onSubmit={handleSubmit}>
        <label>
            From Date:
            <input required type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>
        <br/>
        <label>
            To Date:
            <input required type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </label>
        <br/>
        <label>
            ID:
            {role === 'Manager' ? (
                <select id="employee" onChange={(e) => setId(e.target.value)}>
                  <option value="" >Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.Employee_ID} value={employee.Employee_ID}>
                        {"Employee ID: " + employee.Employee_ID + " Name: "+ employee.Name}
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
        {isFormSubmitted && filteredData.length !== 0 && (
            <div>
                <table ref={pdfRef}>
                    <thead>
                        <tr>
                            {Object.keys(filteredData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, i) => (
                            <tr key={i}>
                                {Object.values(row).map((val, i) => (
                                    <td key={i}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={downloadPdf}>Download PDF</button>
            </div>
        )}
    </div>
    </>

    );
}

export default PayStub;
