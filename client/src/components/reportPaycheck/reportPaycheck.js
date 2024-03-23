
import { useState } from 'react';
import Navbar from '../navBar/navBar';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function ReportPaycheck(){
    const [reportData, setReportData] = useState(null);
    const links = ["homepage", "reportRevenue","reportPaycheck","reportVisit"];
    const pdfRef = useRef();
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


  return <div>

<Navbar links={links} />


    </div>
};