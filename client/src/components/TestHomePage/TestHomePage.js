import React from 'react';
import { Link } from 'react-router-dom';
import './TestHomePage.css';

function TestHomePage() {
  return (
    <div className="homepage">
      <div className="sidebar">
      <br/><br/>
        <Link className="sidebar-item" to="/profile">View Profile</Link>
        <br/>
        <Link className="sidebar-item" to="/ticketsPage">Buy Tickets</Link>
        <br/>
        <Link className="sidebar-item" to="/animalPage">View Animals</Link>
        <br/>
        <Link className="sidebar-item" to="/calendar">View Schedule</Link>
        <br/>
        <Link className="sidebar-item" to="/manage">Manage Data</Link>
      </div>
      <div className="main-content">
        {/* Content rendering based on route will be handled by the RouterProvider in the main index.js */}
      </div>
    </div>
  );
}

// export default function Navbar({links}){
//   return <>
//   <ul className='navbar'>
//     {links.map((link, index) => (
//       <li className='nav-link'>
//         <Link className='nav-a' to={"/"+link}>{link}</Link>
//       </li>
//     ))}
//   </ul>
//   </>;
// }

export default TestHomePage;
