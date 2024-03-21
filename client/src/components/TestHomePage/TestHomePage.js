import React from 'react';
import { Link } from 'react-router-dom';
import './TestHomePage.css';
import DisplayTable from './../displayTable';
import DataEntry from './../dataEntry';



function TestHomePage({list}) {
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
        <br />
        <Link className="sidebar-item" to="/medicalRecords">View Medical Records</Link>
        <br/>
        <Link className="sidebar-item" to="/manage">Manage Data</Link>
      </div>
      <div className="main-content">
        {/* Content rendering based on route will be handled by the RouterProvider in the main index.js */}
      </div>
      <DisplayTable data={require("./../animalPage/dummyAnimals.json")}/>
      <center>
        <DataEntry className="dataentry"/>
      </center>
    </div>
  );
}

function Test(){
  return <TestHomePage list={[
    {link:'/profile',text:"View Profile"}, 
    {link:"/ticketsPage", text:"Buy Tickets"}, 
    {link:"/animalPage", text:"View Animals"},
    {link:"/calendar", text:"View Schecule"},
    {link:"/medicalRecords", text:"View Medical Records"},
    {link:"/manage", text:"Manage Data"}]}/>
}


export default TestHomePage;
