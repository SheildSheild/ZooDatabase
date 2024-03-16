import './animalPage.css';
import Navbar from '../navBar/navBar';
import React, { useState } from 'react';


const dummyAnimals = [
{ Animal_ID: 1, Habitat_ID: 10, Zone_ID: 14, Habitat_Name: 'Savannah', Name: 'Laura', Weight: 300.05, Height: 83.06, Birth_Date: '2019-03-30', Species: 'Panthera leo' },
{ Animal_ID: 2, Habitat_ID: 11, Zone_ID: 15, Habitat_Name: 'Jungle', Name: 'Tikes', Weight: 403.08, Height: 90.57, Birth_Date: '2018-04-02', Species: 'Panthera tigris' },
{ Animal_ID: 3, Habitat_ID: 12, Zone_ID: 16, Habitat_Name: 'Grasslands', Name: 'Braum', Weight: 320.09, Height: 67.08, Birth_Date: '2020-01-19', Species: 'Lycaon pictus' },
{ Animal_ID: 4, Habitat_ID: 13, Zone_ID: 17, Habitat_Name: 'Forest', Name: 'Chaser', Weight: 509.08, Height: 78.46, Birth_Date: '2018-07-24', Species: 'Puma concolor' }, ]

export default function AnimalPage() {
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


  const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
    return (
      <><Navbar links={links} />
      <br></br>
      <br></br>
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
