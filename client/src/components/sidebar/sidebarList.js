
import DisplayTable from '../displayTable';
import ViewSchedule from '../viewSchedule';
import ManageSchedule from '../manageSchedule';
import Report from '../report';
import CustomerProfile from '../customerProfile'
import TicketsPage from '../ticketsPage';
import PayStub from '../payStub';
import SignInOut from '../signInOut';

const passwordFilter=col=>col!='Password';

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
  { text: 'Ticket Purchase History', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route={'/tickets?Customer_ID='+userData.Customer_ID}/>);
  }},
  { group:'Schedules', text:"View Animal Schedules", onClick: (userData,setMainComponent)=>{
    setMainComponent(<ViewSchedule route='\animal_schedules' title='Animal Schedule'/>)
  }},
  { group:'Schedules', text:"View Habitat Schedules", onClick: (userData,setMainComponent)=>{
    setMainComponent(<ViewSchedule route='\habitat_schedules' title='Habitat Schedule'/>)
  }},
  { group:'Schedules', text:"View Shop Schedules", onClick: (userData,setMainComponent)=>{
    setMainComponent(<ViewSchedule route='\shop_schedules' title='Shop Schedule'/>)
  }},
];

const employeeLinks = [
  { group:'Schedules',text:"View My Schedule", onClick: (userData,setMainComponent)=>{
    setMainComponent(<ViewSchedule route='\employee_schedules' ID={['Employee_ID',userData.Employee_ID]}/>)
  }},
  { group: 'Customers', text:"Lost and Found", onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\lost_items' hasDataEntry/>)
  }},
  { group: 'Customers', text:"Complaints", onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\complaints'/>)
  }},
  { group: 'Reports', text: 'Employee Paystub', onClick: (userData,setMainComponent)=>{
    setMainComponent(<PayStub/>)
  } },
  { text: 'Clock in/Clock out', onClick: (userData,setMainComponent)=>{
    setMainComponent(<SignInOut/>)
  } },
]

const medicLinks = [
  { group:'Animals',text: 'Edit Medical Records', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\animal_health' hasDataEntry/>)
  } },
  { group: 'Reports', text: 'View Monthly Animal Health Report', onClick: (userData,setMainComponent)=>{
    setMainComponent(<Report route='/animal_health_statistics' title='Report Health of Animals'/>)
  } },
]

const managerLinks = [
  { group: 'Animals',text: 'Edit Animals List', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\animals' hasDataEntry/>)
  } },
  { group: 'Items' ,text: 'Edit Items', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\items' hasDataEntry/>)
  } },
  { group: 'Customers', text: 'Edit Purchases', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\purchases' hasDataEntry/>)
  } },
  { group: 'Employees', text: 'Employee TimeSheet', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\timesheets' hasDataEntry/>)
  } },
  { group: 'Employees', text: 'Edit Employees', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\employees' hasDataEntry columnFilter={passwordFilter}/>)
  } },
  { group: 'Locations', text: 'Edit Restaurants', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\restaurants' hasDataEntry/>)
  } },
  { group: 'Locations', text: 'Edit Shops', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\shops' hasDataEntry/>)
  } },
  { group: 'Locations', text: 'Edit Zones', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\zones' hasDataEntry/>)
  } },
  { group: 'Customers', text: 'View Customers', onClick: (userData,setMainComponent)=>{
    setMainComponent(<DisplayTable route='\customers' hasDataEntry columnFilter={passwordFilter}/>)
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
  { group: 'Reports', text: 'View Shop Revenue Report', onClick: (userData,setMainComponent)=>{
    setMainComponent(<Report route='/shop_revenue' title='Report Revenue From Shop'/>)
  } },
  { group: 'Reports', text: 'View Monthly Ticket Revenue Report', onClick: (userData,setMainComponent)=>{
    setMainComponent(<Report route='/ticket_monthly_revenue' title='Report Revenue From Tickets'/>)
  } },
];

export {customerLinks,employeeLinks,medicLinks,managerLinks};