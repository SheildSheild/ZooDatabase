
import { useState,useRef, useEffect } from 'react';

import { downloadPDF } from '../../utils';
import { getData } from '../../communication';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function Report({route,title}){
  ChartJS.register(...registerables);
  const [errorMessage,setErrorMessage] = useState('');
  const [reportData, setReportData]=useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [graph, setGraph] = useState('');
  const pdfRef = useRef();
  useEffect(()=>{
    getData(route).then(data => setReportData(data)).catch(err => console.log(err.message));
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    if (toDateObj <= fromDateObj) {
      setErrorMessage('The "To Date" must be later than the "From Date".');
      return;
    }
    const filteredData = reportData[0] && reportData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= fromDateObj && itemDate <= toDateObj;
    });
    if(filteredData){
      setGraph({
         labels: filteredData.map(item => item.date),
         datasets: [
           {
             label: title.toUpperCase(),
             data: filteredData.map(item => item.revenue),
             fill: false,
             backgroundColor: 'rgb(75, 192, 192)',
             borderColor: 'rgba(75, 192, 192, 0.2)',
           },
         ]});
     }
    setErrorMessage('');
    setIsFormSubmitted(true);
  };
  console.log(graph)
  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setIsFormSubmitted(false);
    setGraph('');
  };
  const config = {
    responsive: true,
    plugins: {
      legend: {position: 'top'},
      title: {
        display: true,
        text: 'Revenue',
      },
    },
    scales: {
      y: {beginAtZero: true}
    }
  };
  return <center>
    {errorMessage && <p>{errorMessage}</p>}
  
      <form onSubmit={handleSubmit}>
        <label>
          From Date:
          <input type="date" required value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </label>
        <label>
          To Date:
          <input type="date" required value={toDate} onChange={e => setToDate(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        <button onClick={handleReset}>Reset</button>

      </form>
    <div style={{width:'80%', height:'50%'}}ref = {pdfRef} >
    {graph && <Line data={graph} options= {config} />}
    </div>
    <button  onClick={()=>downloadPDF(pdfRef)}>Download</button>
  </center>;
  };



export default Report;