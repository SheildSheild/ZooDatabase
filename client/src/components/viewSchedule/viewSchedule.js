import { useEffect, useState } from "react";
import MyCalendar from "../calendar";
import dayjs from "dayjs";
import { getData } from "../../communication";
import { getID, parseName } from "../../utils";


function ViewSchedule({route,ID}){
  const [eventList,setEventList]=useState([]);
  const [errorMessage,setErrorMessage]=useState('');

  const Schedule_ID=getID(parseName(route.substring(1)));
  useEffect(()=>{
    getData(`${route}?${ID[0]}=${ID[1]}`)
    .then(data=>{
      if(!data)
        setErrorMessage('Failed to fetch data')
      else if(data.status)
        setErrorMessage('Error: '+data.message);
      else{
        data=data.map(event => {
          return {
            title:event.Description,
            id:event[Schedule_ID],
            from:dayjs(event.Start_Time).toDate(),
            to:dayjs(event.End_Time).toDate(),
          };
        });
        setEventList(data);
      }
      console.log(data);
    })
    .catch(err=>setErrorMessage('Error: '+err))
  },[]);
  return <center>
    <h1>{errorMessage}</h1>
    <MyCalendar events={eventList}/>
  </center>;
}

export default ViewSchedule;