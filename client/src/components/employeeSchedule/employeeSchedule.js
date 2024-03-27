import { useEffect, useState } from "react";
import MyCalendar from "../calendar";
import dayjs from "dayjs";
import { getData } from "../../communication";


function EmployeeSchedule({Employee_ID}){
  const [eventList,setEventList]=useState([]);
  const [errorMessage,setErrorMessage]=useState('');
  useEffect(()=>{
    getData('/schedules?Employee_ID='+Employee_ID)
    .then(data=>{
      if(!data)
        setErrorMessage('Failed to fetch data')
      else
        setEventList(data);
      console.log(data);
    })
    .catch(err=>setErrorMessage('Error: '+err))
  },[]);
  return <>
    {errorMessage}
    <MyCalendar events={eventList}/>
  </>;
}

export default EmployeeSchedule;