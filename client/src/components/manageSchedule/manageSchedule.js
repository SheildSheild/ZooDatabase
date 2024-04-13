import { useEffect, useState } from "react";
import MyCalendar from "../calendar";
import { convertEventForCalendar,convertEventForDB,convertEventForDataEntry,getForeignKey } from "./utils";
import { getData } from "../../communication";
import { Add,Modify,Delete,parseName,getID,fetchNames } from '../../utils';


function ManageSchedule({route}){
  const [eventList,setEventList]=useState([]);
  const [dataEntry,setDataEntry]=useState(<></>);
  const [map,setMap]=useState({});
  const [selected,setSelected]=useState(false);
  const [state,_]=useState({current:null,idx:-1});
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);

  const Name=parseName(route.substring(1));
  const ID=getID(Name);
  const foreignKey=getForeignKey(ID);
  const foreignName=foreignKey.substring(0,foreignKey.length-2)+'ID';

  const convertDataForDisplay=(data,idx)=>convertEventForCalendar(data,ID,idx,foreignKey);
  const convertDataForDataEntry=()=>convertEventForDataEntry(state.current,ID,foreignKey,foreignName,map);
  const convertDataForDB=(data)=>convertEventForDB(data,ID,foreignKey,foreignName,map);

  const add=()=>Add(route,setDataEntry,reRender,eventList,convertDataForDisplay,convertDataForDB,map);
  const modify=()=>Modify(route,convertDataForDataEntry(),setDataEntry,reRender,eventList,state.idx,convertDataForDisplay,convertDataForDB,map);
  const remove=()=>Delete(route,convertDataForDataEntry(),setDataEntry,reRender,eventList,state.idx);
  
  const onSelect=(event)=>{
    state.current=event;
    state.idx=event.idx;
    setSelected(true)
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

  useEffect(() => {
    (async ()=>{
      const newData=await getData(route);
      if(newData.status){
        setDataEntry('Error: '+newData.message);
        return;
      }
      let columns=[]
      if(newData.columns)
        columns=newData.columns;
      else
        for(let prop in newData[0])
          columns.push(prop);
      const newMap=await fetchNames(columns,ID);
      setMap(newMap);
      if(newData.map)
        setEventList(newData.map(convertDataForDisplay));
    })().catch(err => setDataEntry(<div>Error: {err.message}</div>))
  },[]);

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

export default ManageSchedule;