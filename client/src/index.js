import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createHashRouter
} from "react-router-dom";


import CustomerHome from './components/customerHome';
import CustomerSignUp from './components/customerSignUp';
import Homepage from './components/homepage';
import AnimalPage from './components/animalPage';
import TicketsPage from './components/ticketsPage';
import DataEntry from './components/dataEntry';
import AboutUsPage from './components/aboutUsPage';
import EmployeeHome from './components/employeeHome';
import TestHomePage from './components/TestHomePage';
import Report from './components/report';
import DisplayTable from './components/displayTable'

const router = createHashRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/customerHome",
    element: <CustomerHome/>,
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
    path:"/employeeHome",
    element: <EmployeeHome/>
  },
  {
    path:"/TestHomePage",
    element: <TestHomePage/>,
  },
  {
    path:"/report",
    element: <Report/>
  },
  {
    path:"/displayTable",
    element: <DisplayTable link = '/animals'/>
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