
import { useState,useEffect } from 'react';
import Navbar from '../navBar/navBar';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReportForm from './reportForm';
import ReportDisplay from './reportDisplay';
export default  function ReportPaycheck(){
    const [reportData, setReportData] = useState(null);
    const links = ["homepage", "reportRevenue","reportPaycheck","reportVisit"];
    const pdfRef = useRef();
    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);

    const downloadPDF = () =>{
            const input = pdfRef.current;
            html2canvas(input).then((canvas)=>{
                const imgData = canvas.toDataURL('image.png');
                console.log(imgData);
                const pdf = new jsPDF('p','mm','a4',true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
               const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
               const imgX = (pdfWidth-imgWidth * ratio)/2;
               const imgY = 30
               pdf.addImage(imgData, 'PNG',imgX,imgY,imgWidth*ratio, imgHeight*ratio );
               pdf.save('report.pdf');
        });
    }
    const handleFormSubmit = (data) => {
        setReportData(data);
    };
    useEffect(() => {
        fetch('http://158.101.102.104:3301/api/animals')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error:', error));
          fetch('http://158.101.102.104:3301/api/employees')
          .then(response => response.json())
          .then(data => setData1(data))
          .catch(error => console.error('Error:', error));
      }, [])
    console.log(data && data[0]);
    console.log(data1 && data1[0]);


  return <div>
        <Navbar links={links} />
        <h1>HEYYYY</h1>
        <ReportForm onFormSubmit={handleFormSubmit} />
        {reportData != null && <><div ref={pdfRef}><ReportDisplay
            employeeId={reportData.employeeId}
            lastName={reportData.lastName}
            firstName = {reportData.firstName}
            fromDate={reportData.formDate}
            toDate={reportData.toDate}
            />
            </div>
            <button className='btn btn-primary' onClick={downloadPDF}>DOWNLOAD</button>
            </>
        }
    </div>
};
