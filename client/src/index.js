import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import './index.css'

import {CustomerLogin,EmployeeLogin} from './components/login';
import CustomerSignUp from './components/customerSignUp';
import Homepage from './components/homepage';
import AnimalPage from './components/animalPage';
import TicketsPage from './components/ticketsPage';
import DataEntry from './components/dataEntry';
import AboutUsPage from './components/aboutUsPage';
import Report from './components/report';
import Portal from './components/portal';
import DisplayTable from './components/displayTable';
import LostAndFoundReport from './components/lostAndFoundReport';
import CustomerProfile from './components/customerProfile'
import SignInOut from './components/signInOut'
import PayStub from './components/payStub/payStub';
import MakeAComplaint from './components/makeAComplaint';
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
    path:"/reportRevenue",
    element: <Report path={'/ticket_monthly_revenue'} title='Monthly Revenue From Tickets'/>
  },
  {
    path:"/reportShopRevenue",
    element: <Report path={'/ticke_monthly_revenue'} title='Monthly Revenue From Shops'/>
  },
  {
    path:"/reportVisit",
    element: <Report path={'/monthly_visit'} title='Monthly Visits Report'/>
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
    path:"/lostAndFoundReport",
    element: <LostAndFoundReport/>
  },
  {
    path:"/customerProfile",
    element: <CustomerProfile/>
  },
  {
    path:"/signInOut",
    element:<SignInOut/>
  },
  {
    path:"/payStub",
    element:<PayStub/>
  },
  {
    path:"/makeAComplaint",
    element:<MakeAComplaint/>
  }
  
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
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);