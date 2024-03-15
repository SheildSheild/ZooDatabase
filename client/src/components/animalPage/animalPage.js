import './animalPage.css';

const dummyAnimals = [
{ id: 1, name: 'Lion', habitat: 'Savannah', description: 'The lion is known as the king of the jungle.' },
{ id: 2, name: 'Tiger', habitat: 'Forest', description: 'Tigers are the largest cat species in the world.' },
{ id: 3, name: 'Elephant', habitat: 'Grasslands', description: 'Elephants are the largest land animals on Earth.' },]

export default function AnimalPage() {
    return (
      <div className="animal-container">
        {dummyAnimals.map(animal => (
          <div key={animal.id} className="animal">
            <h3>{animal.name}</h3>
            <p>Habitat: {animal.habitat}</p>
            <p>{animal.description}</p>
          </div>
        ))}
      </div>
    );
  }
