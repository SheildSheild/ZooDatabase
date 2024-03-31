import { useEffect, useState } from "react";
import MyCalendar from "../calendar";
import dayjs from "dayjs";
import { getData } from "../../communication";


function ManagerSchedule({type}){
  const [eventList,setEventList]=useState([]);
  const [errorMessage,setErrorMessage]=useState('');
  const state={current:null};
  useEffect(()=>{
    getData('/schedules?Type='+type)
    .then(data=>{
      if(!data)
        setErrorMessage('Failed to fetch data')
      else
        setEventList(data);
      console.log(data);
    })
    .catch(err=>setErrorMessage('Error: '+err))
  },[]);
  return <center>
    <h1>{errorMessage}</h1>
    <MyCalendar events={eventList} canDrag={true}/>
    <button onClick={Add}>Add</button>
    <button onClick={Modify}>Submit Changes</button>
    <button onClick={Delete}>Delete</button>
  </center>;
}
function convertEventForCalendar(events,type){
  let getTitle=(event)=>{};
  switch(type){
    
  }
  return events.map(event=>{
    return {
      title:getTitle(event),
      id:event.Schedule_ID,
      from:dayjs(event.Start_Time),
      to:dayjs(event.End_Time),
      description:event.Description,
      group:event.Type
    } 
  });
}

function convertEventForDB(){

}

function Add(){}
function Modify(){}
function Delete(){}

export default ManagerSchedule;