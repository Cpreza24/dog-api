import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreedOne, setSelectedBreedOne] = useState('');
  const [selectedBreedTwo, setSelectedBreedTwo] = useState('');
  const [breedOneImage, setBreedOneImage] = useState('');
  const [breedTwoImage, setBreedTwoImage] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => setBreeds(Object.keys(data.message)))
      .catch((error) => console.error('Error fetching breeds:', error));
  }, []);

  const handleBreedOneChange = (event) => {
    const breed = event.target.value;
    setSelectedBreedOne(breed);
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then((data) => {
          setBreedOneImage(data.message);
        })
        .catch((error) => console.error('Error fetching breed image:', error));
    }
  };

  const handleBreedTwoChange = (event) => {
    const breed = event.target.value;
    setSelectedBreedTwo(breed);
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then((data) => {
          setBreedTwoImage(data.message);
        })
        .catch((error) => console.error('Error fetching breed image:', error));
    }
  };

  return (
    <>
      <select onChange={handleBreedOneChange} value={selectedBreedOne}>
        <option value=''>Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      {breedOneImage && (
        <div>
          <h2>{selectedBreedOne}</h2>
          <img src={breedOneImage} alt={selectedBreedOne} />
        </div>
      )}

      <select onChange={handleBreedTwoChange} value={selectedBreedTwo}>
        <option value=''>Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      {breedTwoImage && (
        <div>
          <h2>{selectedBreedTwo}</h2>
          <img src={breedTwoImage} alt={selectedBreedTwo} />
        </div>
      )}
    </>
  );
}

export default App;
