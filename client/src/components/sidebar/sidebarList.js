
import DisplayTable from '../displayTable';
import ViewSchedule from '../viewSchedule';
import ManageSchedule from '../manageSchedule';
import Report from '../report';
import CustomerProfile from '../customerProfile'
import TicketsPage from '../ticketsPage';
import PayStub from '../payStub';

const customerLinks = [
  { text: 'View Profile', onClick: (userData,setMainComponent)=>{
    setMainComponent(<CustomerProfile/>);
  }},
  { text: 'Buy Tickets', onClick: (userData,setMainComponent)=>{
    setMainComponent(<TicketsPage/>);
  }},
  { text: 'Purchase History', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route={'/purchases?Customer_ID='+userData.Customer_ID}/>);
  }},
  { group:'Schedules', text:"View Animal Schedules", onClick: (userData,setMainComponent)=>{
    setMainComponent(<ViewSchedule route='\animal_schedules'/>)
  }},
];

const employeeLinks = [
  { group:'Schedules',text:"View My Schedule", onClick: (userData,setMainComponent)=>{
    setMainComponent(<ViewSchedule route='\employee_schedules' ID={['Employee_ID',userData.Employee_ID]}/>)
  }},
]

const medicLinks = [
  { group:'Animals',text: 'Edit Medical Records', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\animal_health' hasDataEntry/>)
  } },
]

const managerLinks = [
  { group:'Animals',text: 'Edit Animals List', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\animals' hasDataEntry/>)
  } },
  { text: 'Edit Purchases', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\purchases' hasDataEntry/>)
  } },
  { text: 'Employee TimeSheet', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\timesheets' hasDataEntry/>)
  } },
  { group:'Schedules',text: 'Edit Employee Schedules', onClick: (userData,setMainComponent)=>{
    setMainComponent(<ManageSchedule route='\employee_schedules'/>)
  } },
  { group:'Schedules',text: 'Edit Shop Schedules', onClick: (userData,setMainComponent)=>{
    setMainComponent(<ManageSchedule route='\shop_schedules'/>)
  } },
  { group:'Schedules',text: 'Edit Habitat Schedules', onClick: (userData,setMainComponent)=>{
    setMainComponent(<ManageSchedule route='\habitat_schedules'/>)
  } },
  { group:'Schedules',text: 'Edit Animal Schedules', onClick: (userData,setMainComponent)=>{
    setMainComponent(<ManageSchedule route='\animal_schedules'/>)
  } },
  { text: 'Employee Paystub', onClick: (userData,setMainComponent)=>{
    setMainComponent(<PayStub/>)
  } },
  { text: 'View Revenue Report', onClick: (userData,setMainComponent)=>{
    setMainComponent(<Report route='/shop_revenue' title='Report Revenue From Shop'/>)
  } },
];

export {customerLinks,employeeLinks,medicLinks,managerLinks};