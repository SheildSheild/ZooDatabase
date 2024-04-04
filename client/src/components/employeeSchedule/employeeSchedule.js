import { useEffect, useState } from "react";
import MyCalendar from "../calendar";
import dayjs from "dayjs";
import { getData } from "../../communication";


function EmployeeSchedule({Employee_ID}){
  const [eventList,setEventList]=useState([{title:'hi',description:'poo',from:dayjs().toDate(),to:dayjs().add(3,'day').toDate()}]);
  const [errorMessage,setErrorMessage]=useState('');
  // useEffect(()=>{
  //   getData(`/schedules?Employee_ID=${Employee_ID}&Type=Work`)
  //   .then(data=>{
  //     if(!data)
  //       setErrorMessage('Failed to fetch data')
  //     else{
  //       data=data.map(event => {
  //         return {
  //           title:'shift',
  //           id:event.Schedule_ID,
  //           from:dayjs(event.Start_Time),
  //           to:dayjs(event.End_Time),
  //           description:event.Description,
  //         };
  //       });
  //       setEventList(data);
  //     }
  //     console.log(data);
  //   })
  //   .catch(err=>setErrorMessage('Error: '+err))
  // },[]);
  return <center>
    <h1>{errorMessage}</h1>
    <MyCalendar events={eventList}/>
  </center>;
}

export default EmployeeSchedule;