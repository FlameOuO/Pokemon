import React from 'react';

function PokemonCard({ pokemon, onClick }) {
  return (
    <div onClick={onClick} style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Age: {pokemon.age}</p>
      <p>Health: {pokemon.health}</p>
    </div>
  );
}

export default PokemonCard;