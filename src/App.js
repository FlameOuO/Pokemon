import React, { useState, useEffect } from 'react';
import PokemonGallery from './component/PokemonGallery';
import PokemonDetails from './component/PokemonDetails';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all(Array.from({ length: 10 }, (_, index) => fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`).then(response => response.json())));
      const pokemondata = response.map(p => ({
        name: p.name,
        age: Math.floor(Math.random() * 10) + 1,
        health: Math.floor(Math.random() * 100) + 1,
        hunger: Math.floor(Math.random() * 100) + 1,
        mood: Math.floor(Math.random() * 100) + 1,
        sprite: p.sprites.front_default
      }));
      setPokemon(pokemondata);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPokemon(pokemon => pokemon.map(p => ({
        ...p,
        hunger: Math.min(p.hunger + 10, 100),
        mood: Math.max(p.mood - 10, 0),
      })));
    }
    , 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      const updatedSelected = pokemon.find(p => p.name === selectedPokemon.name);
      if (updatedSelected) {
        setSelectedPokemon(updatedSelected);
      }
    }
  }, [pokemon, selectedPokemon]);

  return (
    <div>
      <h1>Pokemon</h1>
      <PokemonGallery pokemon={pokemon} onSelect={setSelectedPokemon} />
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
    </div>
  );
}
export default App;
