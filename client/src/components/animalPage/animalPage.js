import './animalPage.css';
import Navbar from '../navBar/navBar';
import React, { useState } from 'react';


const dummyAnimals = require('./dummyAnimals');

export default function AnimalPage() {
  const token = localStorage.getItem('token');
  const isLoggedIn = token != null;
  // check if logged in!

  var links = ["homepage", "customerSignUp", "customerHome", "animalPage", "aboutUsPage"];
  if (isLoggedIn) {
      links = ["homepage", "animalPage","testhomepage","aboutUsPage"];
  }
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedHabitat, setSelectedHabitat] = useState('All');
  // const [availableHabitats, setAvailableHabitats] = useState([]);

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
    // const zoneID = event.target.value;
    // const habitatsInZone = dummyAnimals.filter(animal => animal.Zone_ID === zoneID).map(animal => animal.Habitat_ID);
    // setAvailableHabitats(habitatsInZone);
    // setSelectedHabitat('All');
  };

  const handleHabitatChange = (event) => {
    setSelectedHabitat(event.target.value);
  };

  const filteredAnimals = dummyAnimals.filter(animal => {
    if (selectedZone !== 'All' && animal.Zone_ID != selectedZone) {
      return false;
    }
    if (selectedHabitat !== 'All' && animal.Habitat_ID != selectedHabitat) {
      return false;
    }
    return true;
  });



  return (
      <><Navbar links={links} />
      <br/>
      <div className="dropdown-container">
        <label htmlFor="zone-dropdown">Select Zone:</label>
        <select id="zone-dropdown" onChange={handleZoneChange}>
          <option value="All">All</option>
          <option value="14">A</option>
          <option value="15">B</option>
          <option value="16">C</option> 
          <option value="17">D</option>
        </select>
        <br></br>
        <br></br>
        <label htmlFor="habitat-dropdown">Select Habitat:</label>
        {/* <select id="habitat-dropdown" onChange={handleHabitatChange} value={selectedHabitat}>
          <option value="All">All</option>
          {availableHabitats.map(habitat => (
            <option key={habitat} value={habitat}>{habitat}</option>
          ))}
        </select> */}
        <select id="habitat-dropdown" onChange={handleHabitatChange}>
          <option value="All">All</option>
          <option value="10">Savannah</option>
          <option value="11">Jungle</option>
          <option value="12">Grasslands</option>
          <option value="13">Forest</option>
        </select>
      </div>
      <div className="animal-container">
        {/* {dummyAnimals
          .filter(animal => (selectedZone === 'All' || animal.Zone_ID === selectedZone) && (selectedHabitat === 'All' || animal.Habitat_ID === selectedHabitat))
          .map(animal => (
            <div key={animal.Animal_ID} className="animal">
              <h3>{animal.Name}</h3>
              <p>Species: {animal.Species}</p>
              <p>{animal.Habitat_Name}</p>
            </div>
          ))} */}
        {filteredAnimals.map(animal => (
          <div key={animal.Animal_ID} className="animal">
            <h3>{animal.Name}</h3>
            <p>Species: {animal.Species}</p>
            <p>{animal.Habitat_Name}</p>
          </div>
        ))}
      </div>
      </>
    );
  }
