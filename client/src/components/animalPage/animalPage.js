import './animalPage.css';
import Navbar from '../navBar/navBar';
import React, { useEffect, useState } from 'react';
import { getData } from '../../communication';

export default function AnimalPage() {
  const token = localStorage.getItem('token');
  const isLoggedIn = token != null;
  // check if logged in!

  // let links = ["homepage", "customerSignUp", "customerHome", "animalPage", "aboutUsPage"];
  let links = [["homepage", "Home"], ["customerSignUp", "Customer Sign Up"], ["login", "Customer Login"], ["employeeLogin", "Employee Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost somthing?"]];
  if (isLoggedIn) {
      links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal", "User Portal"],["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport","Lost somthing?"]];
  }
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


  const handleHabitatChange = (event) => {
    setSelectedHabitat(event.target.value);
  };

  const filteredAnimals = animals.filter(animal => {
    if (selectedHabitat !== 'All' && animal.Habitat_ID != selectedHabitat) {
      return false;
    }
    return true;
  });



  return (
      <><Navbar links={links} />
      <br/>
      <div className="dropdown-container">
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
