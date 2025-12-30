import React, { useState } from 'react';
import { fetchDoggos } from '../api/fetchDoggos';

export default function Doggos() {
  const [dogs, setDogs] = useState([]);

  const handleFetch = async () => {
    const data = await fetchDoggos();
    setDogs(data.message);
  };

  return (
    <div>
      <button onClick={handleFetch}>Fetch Doggos</button>
      <ul>
        {dogs.map((dog, i) => (
          <li key={i} data-testid="doggo-images">
            <img src={dog} alt="dog" width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
}
