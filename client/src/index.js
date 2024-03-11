import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import DisplayTable from './components/displayTable';

const x={
  animal:'donkey',
  weight:'100kg',
  stature: '89in',
  name: 'grunk',
  healthRecords:'empty'
};
const data=Array(10).fill(x);

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path:'/table',
    element: <DisplayTable data={data}/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);