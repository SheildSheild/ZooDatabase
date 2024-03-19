
import Navbar from '../navBar/navBar';
import React, { useRef } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {DummyData} from './reportdata';
import {Chart as Chartjs} from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReportDisplay from './reportDisplay';
function Report(){
    const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
 
    // const downloadPDF = () =>{
    //         const input = pdfRef.current;
    //         html2canvas(input).then((canvas)=>{
    //             const imgData = canvas.toDataURL('image.png');
    //             console.log(imgData);
    //             const pdf = new jsPDF('p','mm','a4',true);
    //             const pdfWidth = pdf.internal.pageSize.getWidth();
    //             const pdfHeight = pdf.internal.pageSize.getHeight();
    //             const imgWidth = canvas.width;
    //             const imgHeight = canvas.height;
    //            const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
    //            const imgX = (pdfWidth-imgWidth * ratio)/2;
    //            const imgY = 30
    //            pdf.addImage(imgData, 'PNG', 0,0,pdfWidth,pdfHeight);
    //            pdf.save('report.pdf');
    //     });
    // }


  return <div>
       <Navbar links={links} />
       <div id = 'report'>
       <ReportDisplay/>
       </div>
    </div>
};

export default Report;

 // const config =  {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    //     }
    
    // const data = {
    //     labels: DummyData.map((data)=>data.month) ,
    //     datasets:[{
    //         label: "Revenue",
    //         data: DummyData.map((data)=> data.revenue)
    //     }]
    // };
    // const downloadPDF = () =>{
    //     const input = pdfRef.current;
    //     html2canvas(input).then((canvas)=>{
    //         const imgData = canvas.toDataURL('image.png');
    //         const pdf = new jsPDF('p','mm','a4',true);
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();
    //         const imgWidth = canvas.width;
    //         const imgHeight = canvas.height;
    //         const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
    //         const imgX = (pdfWidth-imgWidth * ratio)/2;
    //         const imgY = 30
    //         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio);
    //         pdf.save('report.pdf');
    //     }


    //     );
    // };

    