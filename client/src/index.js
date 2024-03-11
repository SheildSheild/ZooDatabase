import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import CustomerHome from './components/customerHome';
import CustomerSignUp from './components/customerSignUp';
import Homepage from './components/homepage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "ZooDatabase/client/src/components/customerHome",
    element: <CustomerHome/>,
  },
  {
    path: "ZooDatabase/client/src/components/customerSignUp",
    element: <CustomerSignUp/>,
  },
  {
    path: "/homepage",
    element: <Homepage/>,
  },

]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);