
import { useState,useRef, useEffect } from 'react';
import ReportForm from './reportForm';
import ReportDisplay from './reportDisplay';
import { downloadPDF } from '../../utils';
import { getData } from '../../communication';

function Report({route,title}){
  const [reportConfig, setReportConfig] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [errorMessage,setErrorMessage] = useState('');
  const pdfRef = useRef();

  useEffect(()=>{
    getData(route)
      .then(data=>setReportData(data))
      .catch(err=>setErrorMessage(err));
  },[]);

  return <center>
    <h1>{errorMessage}</h1>
    <h1>{title}</h1>
    <ReportForm onFormSubmit={data=>setReportConfig(data)} />
    {reportConfig && reportData && <>
      <div ref={pdfRef}>
        <ReportDisplay
          data={reportData}
          fromDate={reportConfig.fromDate}
          toDate={reportConfig.toDate}
        />
      </div>
      <button className='btn btn-primary' onClick={()=>downloadPDF(pdfRef)}>Download</button>
    </>}
  </center>;
};

export default Report;