import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useState } from 'react';

const localizer = dayjsLocalizer(dayjs)
const DnDCalendar = withDragAndDrop(Calendar);

function MyCalendar({events,canDrag,onSelect,onResize,onDrop}){
  const [render,reRender]=useState(0);
  const sharedProps={
    localizer,
    events,
    startAccessor:"from",
    endAccessor:"to",
    resizable:true,
    style:{ height: 500 }
  };
  if(canDrag)
    return <DnDCalendar
      {...sharedProps}
      onSelectEvent={event => onSelect(event)}
      onEventResize = {event => onResize(event)}
      onEventDrop = {event => onDrop(event)}
    />
  return <Calendar
    {...sharedProps}
    onSelectEvent={(data)=>console.log('selected',data)}
    onSelecting={()=>console.log('selecting')}
  />
};

export default MyCalendar;