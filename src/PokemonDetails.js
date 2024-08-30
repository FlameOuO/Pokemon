import React from 'react';

function PokemonDetails({ pokemon }) {
  return (
    <div>
      <h2>{pokemon.name} Details</h2>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p>Age: {pokemon.age}</p>
      <p>Health: {pokemon.health}</p>
      <p>Hunger: {pokemon.hunger}</p>
      <p>Mood: {pokemon.mood}</p>
    </div>
  );
}
export default PokemonDetails;