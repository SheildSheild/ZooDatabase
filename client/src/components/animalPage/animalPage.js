import './animalPage.css';
import Navbar from '../navBar/navBar';
import React, { useEffect, useState } from 'react';
import { getData } from '../../communication';

export default function AnimalPage() {
  const token = localStorage.getItem('token');
  const isLoggedIn = token != null;
  // check if logged in!

  let links = ["homepage", "customerSignUp", "customerHome", "animalPage", "aboutUsPage"];
  if (isLoggedIn) {
      links = ["homepage", "animalPage","testhomepage","aboutUsPage"];
  }
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedHabitat, setSelectedHabitat] = useState('All');
  const [animals, setAnimals]=useState([]);

  useEffect(()=>{
    getData('/animals')
    .then(data=>{
      if(data)
        setAnimals(data);
    })
  },[]);

  if(animals.length==0)
    return <>Loading...</>;

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleHabitatChange = (event) => {
    setSelectedHabitat(event.target.value);
  };

  const filteredAnimals = animals.filter(animal => {
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
        <select id="habitat-dropdown" onChange={handleHabitatChange}>
          <option value="All">All</option>
          <option value="10">Savannah</option>
          <option value="11">Jungle</option>
          <option value="12">Grasslands</option>
          <option value="13">Forest</option>
        </select>
      </div>
      <div className="animal-container">
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
