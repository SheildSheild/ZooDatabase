
import { useState,useRef, useEffect } from 'react';
import autoTable from 'jspdf-autotable';
import { downloadPDFGraph,downloadPDFTable } from '../../utils';
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
import DisplayTable from '../displayTable';

function Report({route,title}){
  ChartJS.register(...registerables);
  const [errorMessage,setErrorMessage] = useState('');
  const [reportData, setReportData]=useState(null);
  const [reportTable,setReportTable]=useState(<></>);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [graph, setGraph] = useState('');
  const [stats,setStats]=useState(0);
  const graphRef = useRef();
  const tableRef = useRef();

  useEffect(()=>{
    getData(route)
      .then(data => {
        if(data.status)
          setErrorMessage(data.message);
        else if(!data.columns)
          setReportData(data);
      })
      .catch(err => setErrorMessage(err.message));
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!reportData)
      return setErrorMessage('No data');
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    if (toDateObj <= fromDateObj) 
      return setErrorMessage('The "To Date" must be later than the "From Date".');
    
    let sum=0;
    const filteredData = reportData[0] && reportData.filter(item => {
      sum+=item.Revenue;
      const itemDate = new Date(item.Date);
      return itemDate >= fromDateObj && itemDate <= toDateObj;
    });
    setStats(sum);
    if(filteredData){
      setReportTable(<DisplayTable preloadedData={filteredData} route={route} removeHeader pdf={tableRef}/>)
      setGraph({
         labels: filteredData.map(item => item.Date),
         datasets: [
           {
             label: title.toUpperCase(),
             data: filteredData.map(item => item.Revenue),
             fill: false,
             backgroundColor: 'rgb(75, 192, 192)',
             borderColor: 'rgb(75, 192, 192)',
           },
         ]});
     }
    setErrorMessage('');
    setIsFormSubmitted(true);
  };

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
  const statistics=stats?<h2>{`Total Revenue: $${parseInt(stats)}.00`}<br/><br/></h2>:<></>;
  return <center>
    {errorMessage && <h3>{errorMessage}</h3>}
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
    <div style={{width:'80%', height:'50%'}}ref = {graphRef} >
      {graph && <Line data={graph} options= {config}  />}
    </div>
    <button  onClick={()=>downloadPDFGraph(graphRef)}>Save Graph</button>
    {reportTable}
    {statistics}
    <button  onClick={()=>downloadPDFTable(tableRef)}>Save Table</button>
  </center>;
  };



export default Report;