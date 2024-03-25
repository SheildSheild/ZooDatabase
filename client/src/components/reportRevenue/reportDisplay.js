import React, { useRef } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {DummyData} from './reportdata';
import {Chart as Chartjs} from 'chart.js/auto';

const ReportDisplay = ( { fromDate, toDate, shopType }) => {
    const config =  {
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Report',
            },
          },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    const data = {
        labels: DummyData.map((data)=>data.month) ,
        datasets:[{
            label: "Revenue",
            data: DummyData.map((data)=> data.revenue)
        }]
    };
    return  <> <h1 style={{margin: 60}}>Cougar  Zoo Revenue Report</h1>
        <div style={{width:1000}} >
        <Line data={data} options= {config} />

        </div>
{/* 
        <table>
        <tr>
            <th>Month</th>
            <th>Revenue</th>
        </tr>
        {
        DummyData.map(data =>(
            <tr>
                <td>{data.month}</td>
                <td>${data.revenue}</td>
            </tr>
        )
        )
    }
    </table> */}
   
    </> 
    
}

export default ReportDisplay;