import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import CustomerHome from './components/customerHome';
import CustomerSignUp from './components/customerSignUp';
import Homepage from './components/homepage';
import AnimalPage from './components/animalPage';
import AboutUsPage from './components/aboutUsPage';

const router = createBrowserRouter([
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