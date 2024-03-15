import './animalPage.css';
import Navbar from '../navBar/navBar';


const dummyAnimals = [
{ id: 1, name: 'Lion', habitat: 'Savannah', description: 'The lion is known as the king of the jungle.' },
{ id: 2, name: 'Tiger', habitat: 'Forest', description: 'Tigers are the largest cat species in the world.' },
{ id: 3, name: 'Elephant', habitat: 'Grasslands', description: 'Elephants are the largest land animals on Earth.' },
{ id: 4, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 5, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 6, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 7, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 8, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 9, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 10, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },
{ id: 11, name: 'Cheetah', habitat: 'Savannah', description: 'Cheetahs are the fastest land animal on the earth' },  ]

export default function AnimalPage() {
  const links = ["homepage", "customerHome", "customerSignUp", "animalPage", "aboutUsPage"];
    return (
      <><Navbar links={links} />
      <div className="animal-container">
        {dummyAnimals.map(animal => (
          <div key={animal.id} className="animal">
            <h3>{animal.name}</h3>
            <p>Habitat: {animal.habitat}</p>
            <p>{animal.description}</p>
          </div>
        ))}
      </div>
      </>
    );
  }
