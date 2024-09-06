import React from 'react';

function PokemonDetails({ pokemon, onFeed, onWater, onPlay }) {
  return (
    <div>
      <h2>{pokemon.name} Details</h2>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p>Age: {pokemon.age}</p>
      <p>Health: {pokemon.health}</p>
      <p>Hunger: {pokemon.hunger}</p>
      <p>Mood: {pokemon.mood} {pokemon.mood >50 ?  '😊' : '😞'}</p>
      <button onClick={onFeed}>餵食</button>
      <button onClick={onWater}>喝水</button>
      <button onClick={onPlay}>玩耍</button>
    </div>
  );
}
export default PokemonDetails;