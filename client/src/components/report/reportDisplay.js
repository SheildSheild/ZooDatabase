import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const config = {
  responsive: true,
  plugins: {
    legend: {position: 'top'},
    title: {
      display: true,
      text: 'Report',
    },
  },
  scales: {
    y: {beginAtZero: true}
  }
};

function ReportDisplay( { fromDate, toDate, data }){
  if(!data||data.length==0)
    return <></>;
  let y_axis='';
  for(let prop in data[0])
    if(prop!='month')
      y_axis=prop
  console.log(data)
  fromDate=dayjs(fromDate);
  toDate=dayjs(toDate);
  data=data.filter(val=>{
    const month=dayjs(val.month);
    return month.isBefore(toDate)&&month.isAfter(fromDate);
  });
  const graph = {
      labels: data.map(d=>d.month) ,
      datasets:[{
          label: "Revenue",
          data: data.map(d=> d[y_axis])
      }]
  };
  return <div style={{width:'80%', height:'50%'}} >
      <Line data={graph} options= {config} />
    </div>;
}

export default ReportDisplay;