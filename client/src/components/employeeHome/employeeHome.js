import MyCalendar from "../calendar";
import dayjs from "dayjs";


function EmployeeHome(){
  const eventList=[{start:dayjs().toDate(),end:dayjs().add(1, "days").toDate()}];
  console.log(eventList,dayjs().day(0));
  return <MyCalendar events={eventList}/>
}

export default EmployeeHome;