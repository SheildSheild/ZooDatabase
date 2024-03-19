import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useState } from 'react';

const localizer = dayjsLocalizer(dayjs)
const DnDCalendar = withDragAndDrop(Calendar);

function MyCalendar({events}){
  const [render,reRender]=useState(0);
  return <DnDCalendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    resizable
    onEventResize = {(data) => {
      const { start, end } = data;
      events[0].start = start;
      events[0].end = end;
      reRender(render+1);
    }}
    onEventDrop = {(data) => {
      console.log(data);
    }}
    style={{ height: 500 }}
  />
};

export default MyCalendar;