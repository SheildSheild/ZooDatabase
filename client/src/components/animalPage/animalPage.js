import './animalPage.css';
import Navbar from '../navBar/navBar';
import React, { useEffect, useState } from 'react';
import { getData } from '../../communication';
import zooVideo from '../imageFiles/Animal_Page.mp4';
import lion1 from '../imageFiles/animalPhotos/lion1.jpg';
import lion2 from '../imageFiles/animalPhotos/lion2.jpg';
import lion3 from '../imageFiles/animalPhotos/lion3.jpg';
import tiger1 from '../imageFiles/animalPhotos/tiger1.jpg';
import tiger2 from '../imageFiles/animalPhotos/tiger2.jpg';
import tiger3 from '../imageFiles/animalPhotos/tiger3.jpg';
import elephant1 from '../imageFiles/animalPhotos/elephant1.jpg';
import elephant2 from '../imageFiles/animalPhotos/elephant2.jpg';
import elephant3 from '../imageFiles/animalPhotos/elephant3.jpg';
import zebra1 from '../imageFiles/animalPhotos/zebra1.jpg';
import zebra2 from '../imageFiles/animalPhotos/zebra2.jpg';
import zebra3 from '../imageFiles/animalPhotos/zebra3.jpg';
import giraffe1 from '../imageFiles/animalPhotos/giraffe1.jpg';
import giraffe2 from '../imageFiles/animalPhotos/giraffe2.jpg';
import giraffe3 from '../imageFiles/animalPhotos/giraffe3.jpg';
import flamingo1 from '../imageFiles/animalPhotos/flamingo1.jpg';
import flamingo2 from '../imageFiles/animalPhotos/flamingo2.jpg';
import flamingo3 from '../imageFiles/animalPhotos/flamingo3.jpg';
import penguin1 from '../imageFiles/animalPhotos/penguin1.jpg';
import penguin2 from '../imageFiles/animalPhotos/penguin2.jpg';
import penguin3 from '../imageFiles/animalPhotos/penguin3.jpg';
import rhino1 from '../imageFiles/animalPhotos/rhino1.jpg';
import rhino2 from '../imageFiles/animalPhotos/rhino2.jpg';
import rhino3 from '../imageFiles/animalPhotos/rhino3.jpg';
import hippo1 from '../imageFiles/animalPhotos/hippo1.jpg';
import hippo2 from '../imageFiles/animalPhotos/hippo2.jpg';
import hippo3 from '../imageFiles/animalPhotos/hippo3.jpg';
import bear1 from '../imageFiles/animalPhotos/bear1.jpg';
import bear2 from '../imageFiles/animalPhotos/bear2.jpg';
import bear3 from '../imageFiles/animalPhotos/bear3.jpg';
import BearSelection from '../imageFiles/animalPhotos/bearSelect.png';
import ElephantSelection from '../imageFiles/animalPhotos/elephantSelect.png';
import FlamingoSelection from '../imageFiles/animalPhotos/flamingoSelect.png';
import GiraffeSelection from '../imageFiles/animalPhotos/giraffeSelect.png';
import HippoSelection from '../imageFiles/animalPhotos/hippoSelect.png';
import LionSelection from '../imageFiles/animalPhotos/lionSelect.png';
import PenguinSelection from '../imageFiles/animalPhotos/penguinSelect.png';
import RhinoSelection from '../imageFiles/animalPhotos/rhinoSelect.png';
import TigerSelection from '../imageFiles/animalPhotos/tigerSelect.png';
import ZebraSelection from '../imageFiles/animalPhotos/zebraSelect.png';

export default function AnimalPage() {
  const token = localStorage.getItem('token');
  const isLoggedIn = token != null;
  // check if logged in!

  // let links = ["homepage", "customerSignUp", "customerHome", "animalPage", "aboutUsPage"];
  let links = [["homepage", "Home"], ["customerSignUp", "Sign Up"], ["login", "Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"]];
  if (isLoggedIn) {
      links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal", "User Portal"],["aboutUsPage", "About Us"]];
  }
  const [selectedHabitat, setSelectedHabitat] = useState('All');
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [animals, setAnimals] = useState([]);

  const speciesImages = {
    Lion: [lion1, lion2, lion3],
    Tiger: [tiger1, tiger2, tiger3],
    Elephant: [elephant1, elephant2, elephant3],
    Zebra: [zebra1, zebra2, zebra3],
    Giraffe: [giraffe1, giraffe2, giraffe3],
    Flamingo: [flamingo1, flamingo2, flamingo3],
    Penguin: [penguin1, penguin2, penguin3],
    Rhino: [rhino1, rhino2, rhino3],
    Hippo: [hippo1, hippo2, hippo3],
    Bear: [bear1, bear2, bear3],
  }

  const speciesList = [
    { name: "Lion", image: LionSelection },
    { name: "Tiger", image: TigerSelection },
    { name: "Bear", image: BearSelection},
    { name: "Elephant", image: ElephantSelection},
    { name: "Flamingo", image: FlamingoSelection},
    { name: "Giraffe", image: GiraffeSelection},
    { name: "Hippo", image: HippoSelection},
    { name: "Penguin", image: PenguinSelection},
    { name: "Rhino", image: RhinoSelection},
    { name: "Zebra", image: ZebraSelection},
  ];
  
  function getRandomImage(species) {

    const images = speciesImages[species];

    if (!images || images.length === 0) {
        console.error("No images found for species:", species);
        return `No images found for species:", ${species}`;
    }

    const imageNumber = Math.floor(Math.random() * images.length);
    return images[imageNumber];
}

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

  return (
  <div className="background-animal-page">
      <>
      <div className="video-container">
            <video autoPlay loop muted className="background-video">
                <source src={zooVideo} type="video/mp4" />
            </video>
            <div className="overlay-content2">
                <h1>
                    <strong><em3><span>Meet</span></em3><br />
                    <em2>Our</em2><br />
                    <em3><span>Animals</span></em3></strong><br />
                    <em2>Below!</em2>
                </h1>
            </div>
        </div>
      <br/>
      <div className="dropdown-container">
        <label htmlFor="habitat-dropdown" className="g5">Select Habitat:</label>
        <select id="habitat-dropdown" value={selectedHabitat} onChange={handleHabitatChange}>
          <option value="All">All</option>
          <option value="4">Tundra</option>
          <option value="5">Desert</option>
          <option value="6">Mountain</option>
          <option value="7">Wetlands</option>
          <option value="8">Savannah</option>
          <option value="9">Jungle</option>
          <option value="10">Grasslands</option>
          <option value="11">Forest</option>
        </select>
      </div>
      <br />
      <button onClick={() => {setSelectedSpecies('All'); setSelectedHabitat('All');}}>Show All Animals</button>
      <br />
      {selectedSpecies === 'All' ? (
        <div className="animal-container">
                {speciesList.map(species => (
                    <div key={species.name} className="select-contain" onClick={() => setSelectedSpecies(species.name)}>
                        <img src={species.image} alt={species.name} />
                        <h3>{species.name}</h3>
                    </div>
                ))}
            </div>
        ) : (
          <div className="animal-container">
                {animals.filter(animal => (selectedSpecies === 'All' || animal.Species === selectedSpecies) &&
                  (selectedHabitat === 'All' || animal.Habitat_ID.toString() === selectedHabitat)).map(animal => (
                    <div key={animal.Animal_ID} className="animal">
                        <img src={getRandomImage(animal.Species)} alt={animal.Name} />
                        <h3>{animal.Name}</h3>
                        <p><g5>Animal ID: {animal.Animal_ID}</g5></p>
                        <p><g5>Species: {animal.Species}</g5></p>
                        <p><g5>Habitat : {animal.Habitat_ID}</g5></p>
                    </div>
                ))}
            </div>
        )}
      </>
      <Navbar links={links} />
      </div>
    );
  }
