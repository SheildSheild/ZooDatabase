import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createHashRouter
} from "react-router-dom";


import {CustomerLogin,EmployeeLogin} from './components/login';
import CustomerSignUp from './components/customerSignUp';
import Homepage from './components/homepage';
import AnimalPage from './components/animalPage';
import TicketsPage from './components/ticketsPage';
import DataEntry from './components/dataEntry';
import AboutUsPage from './components/aboutUsPage';
import EmployeeSchedule from './components/employeeSchedule';
import ReportRevenue from './components/reportRevenue';
import ReportPaycheck from './components/reportPaycheck';
import ReportVisit from './components/reportVisit';
import Portal from './components/portal';
import DisplayTable from './components/displayTable';
import MedicalRecords from './components/medicalRecords';
import LostAndFoundReport from './components/lostAndFoundReport';

const router = createHashRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/login",
    element: <CustomerLogin/>,
  },
  {
    path: "/employeeLogin",
    element: <EmployeeLogin/>,
  },
  {
    path: "/customerSignUp",
    element: <CustomerSignUp/>,
  },
  {
    path: "/homepage",
    element: <Homepage/>,
  },
  {
    path :"/animalPage",
    element: <AnimalPage/>,
  },
  {
    path:"/ticketsPage",
    element: <TicketsPage/>,
  },
  {
    path:"/dataEntry",
    element: <DataEntry name='animals'/>,
  },
  {
    path :"/aboutUsPage",
    element: <AboutUsPage/>,
  },
  {
    path:"/employeeSchedule",
    element: <EmployeeSchedule/>
  },
  {
    path:"/reportRevenue",
    element: <ReportRevenue/>
  },
  {
    path:"/reportPaycheck",
    element: <ReportPaycheck/>
  },
  {
    path:"/reportVisit",
    element: <ReportVisit/>
  },
  {
    path:"/portal",
    element: <Portal/>,
  },
  {
    path:"/displayTable",
    element: <DisplayTable link="/animals"/>
  },
  {
    path:"/medicalRecords",
    element: <MedicalRecords/>,
  },
  {
    path:"/lostAndFoundReport",
    element: <LostAndFoundReport/>
  }
  
  // data={[{"Animal_ID":1,"Habitat_ID":10,"Zone_ID":14,"Habitat_Name":"Savannah","Name":"Laura","Weight":300.05,"Height":83.06,"Birth_Date":"2019-03-30","Species":"Panthera leo"},{"Animal_ID":2,"Habitat_ID":11,"Zone_ID":15,"Habitat_Name":"Jungle","Name":"Tikes","Weight":403.08,"Height":90.57,"Birth_Date":"2018-04-02","Species":"Panthera tigris"},{"Animal_ID":3,"Habitat_ID":12,"Zone_ID":16,"Habitat_Name":"Grasslands","Name":"Braum","Weight":320.09,"Height":67.08,"Birth_Date":"2020-01-19","Species":"Lycaon pictus"},{"Animal_ID":4,"Habitat_ID":13,"Zone_ID":17,"Habitat_Name":"Forest","Name":"Chaser","Weight":509.08,"Height":78.46,"Birth_Date":"2018-07-24","Species":"Puma concolor"}]}
]);
/*
more pages we need:
report page
employee schedule page
animal schedule page
every instance for display table

*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);