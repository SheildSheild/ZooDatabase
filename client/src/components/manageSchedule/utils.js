import dayjs from "dayjs";

function toDBTime(date){
  const dateTime=date.toISOString().slice(0, 19).replace('T', ' ');
  return dateTime;
}

function getForeignKey(ID){
  return ID.substring(0,ID.lastIndexOf('_Schedule_ID'))+'_ID';
}

function convertEventForCalendar(event,ID,i,foreignKey){
  return {
    title:event.Description+' ID: '+event[foreignKey],
    id:event[ID],
    foreignKey:event[foreignKey],
    from:dayjs(event.Start_Time).toDate(),
    to:dayjs(event.End_Time).toDate(),
    idx:i
  } 
}

function convertEventForDataEntry(event,ID,foreignKey,foreignName,map){
  let idIdx=event.title.indexOf(' ID:');
  if(idIdx<0)
    idIdx=undefined;
  return {
    [ID]:event.id,
    [foreignName]:map[foreignKey].IDToName[event.foreignKey],
    Start_Time:toDBTime(event.from),
    End_Time:toDBTime(event.to),
    Description:event.title.substring(0,idIdx)||'empty'
  };
}

function convertEventForDB(event,ID,foreignKey,foreignName,map){
  return {
    [ID]:event[ID],
    [foreignKey]:map[foreignKey].NameToID[event[foreignName]],
    Start_Time:event.Start_Time,
    End_Time:event.End_Time,
    Description:event.Description
  };
}

export {convertEventForCalendar,convertEventForDataEntry,convertEventForDB,getForeignKey}