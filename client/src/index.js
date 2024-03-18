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
    element: <DataEntry/>,
  },
  {
    path :"/aboutUsPage",
    element: <AboutUsPage/>,
  },

]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);