import { useEffect, useState } from "react";
import MyCalendar from "../calendar";
import dayjs from "dayjs";
import { getData } from "../../communication";
import { Add,Modify,Delete,parseName,getID } from '../../utils';


function ManagerSchedule({link}){
  const [eventList,setEventList]=useState([]);
  const [dataEntry,setDataEntry]=useState(<></>);
  const [selected,setSelected]=useState(false)
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);
  const [state,_]=useState({current:null,idx:-1});
  const Name=parseName(link.substring(1));
  const ID=getID(Name);

  const add=()=>()=>Add(link,setDataEntry,reRender,eventList,data=>convertEventForCalendar(data,ID,state.idx));
  const modify=()=>Modify(link,convertEventForDB(state.current,ID),setDataEntry,reRender,eventList,state.idx,data=>convertEventForCalendar(data,ID,state.idx));
  const remove=()=>Delete(link,convertEventForDB(state.current,ID),setDataEntry,reRender,eventList,state.idx);
  const onSelect=(event)=>{
    console.log(event)
    state.current=event;
    state.idx=event.idx;
    setSelected(true)
    console.log(state)
  };
  const onChange=(event)=>{
    state.idx=event.event.idx;
    state.current=eventList[state.idx];
    state.current.from=event.start;
    state.current.to=event.end;
    state.current.color='red';
    setSelected(true);
    modify();
  };
  

  useEffect(()=>{
    getData(link)
    .then(data=>{
      if(!data)
        setDataEntry('Failed to fetch data')
      else
        setEventList(data.map((event,i)=>convertEventForCalendar(event,ID,i)));
    })
    .catch(err=>setDataEntry('Error: '+err))
  },[]);
  console.log(eventList)
  return <center>
    <MyCalendar events={eventList} canDrag onSelect={onSelect} onDrop={onChange} onResize={onChange}/>
    <button onClick={add}>Add</button>
    {selected&&<>
      <button onClick={modify}>Modify</button>
      <button onClick={remove}>Delete</button>
    </>}
    <br/>
    {dataEntry}
  </center>;
}
const title=(event,ID)=>{
  for(let prop in event)
    if(prop.endsWith('_ID')&&prop!=ID)
      return 'ID: '+event[prop];
};
function convertEventForCalendar(event,ID,i){
  return {
    title:title(event,ID),
    id:event[ID],
    from:dayjs(event.Start_Time).toDate(),
    to:dayjs(event.End_Time).toDate(),
    description:event.Description,
    idx:i
  } 
}

function toDBTime(date){
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function convertEventForDB(event,ID){
  return {
    [ID]:event.id,
    Start_Time:toDBTime(event.from),
    End_Time:toDBTime(event.to),
    Description:event.description||'empty'
  };
}

export default ManagerSchedule;