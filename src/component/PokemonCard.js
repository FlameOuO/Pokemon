import React from 'react';
import '../css/App.css';

function PokemonCard({ pokemon, onClick }) {
  return (
    <div onClick={onClick} className='card'>
      <img  src={pokemon.sprite} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Age: {pokemon.age}</p>
      <p>Health: {pokemon.health}</p>
    </div>
  );
}

export default PokemonCard;