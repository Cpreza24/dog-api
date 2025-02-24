import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedImage, setBreedImage] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => setBreeds(Object.keys(data.message)))
      .catch((error) => console.error('Error fetching breeds:', error));
  }, []);

  const handleBreedChange = (event) => {
    const breed = event.target.value;
    setSelectedBreed(breed);
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then((data) => {
          setBreedImage(data.message);
        })
        .catch((error) => console.error('Error fetching breed image:', error));
    }
  };

  return (
    <>
      <select onChange={handleBreedChange} value={selectedBreed}>
        <option value=''>Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      {breedImage && (
        <div>
          <h2>{selectedBreed}</h2>
          <img src={breedImage} alt={selectedBreed} />
        </div>
      )}
    </>
  );
}

export default App;
