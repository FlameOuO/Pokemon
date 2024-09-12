import React, { useState, useEffect, useReducer, useMemo } from 'react';
import PokemonGallery from './component/PokemonGallery';
import PokemonDetails from './component/PokemonDetails';
import SearchBar from './component/SearchBar';
import { PetShopProvider } from './component/Petshopcontext';
import AudioPlayer from './component/AudioPlayer';
import './css/App.css';

// 使用 pokemonReducer 管理整個寶可夢狀態
const pokemonReducer = (state, action) => {
  const MAX_HEALTH = 100;
  const MAX_HUNGER = 100; //100不餓 0餓
  const MAX_MOOD = 100;
  const MIN_HEALTH = 0;
  const MIN_HUNGER = 0;
  const MIN_MOOD = 0;
  const FEED_INCREMENT = 10;
  const HEALTH_INCREMENT_FEED = 5;
  const HEALTH_INCREMENT_WATER = 10;
  const MOOD_INCREMENT_PLAY = 15;
  const HUNGER_DECREMENT_PLAY = 5;
 
  switch (action.type) {
    case 'FEED':
      return state.map(p => 
        p.name === action.name ? { ...p, hunger: Math.min(p.hunger + FEED_INCREMENT, MAX_HUNGER), health: Math.min(p.health + HEALTH_INCREMENT_FEED,MAX_HEALTH) } : p
      );
    case 'WATER':
      return state.map(p => 
        p.name === action.name ? { ...p, health: Math.min(p.health + HEALTH_INCREMENT_WATER, MAX_HEALTH) } : p
      );
    case 'PLAY':
      return state.map(p => 
        p.name === action.name ? { ...p, mood: Math.min(p.mood + MOOD_INCREMENT_PLAY, MAX_MOOD), hunger: Math.max(p.hunger - HUNGER_DECREMENT_PLAY, MIN_MOOD) } : p
      );

    case 'UPDATE_TIME':
      return state.map(p => ({
        ...p,
        health: Math.max(p.health - 5, MIN_HEALTH),
        hunger: Math.min(Math.max(p.hunger - 5,MIN_HUNGER), MAX_HUNGER), 
        mood: Math.max(p.mood - 5, MIN_MOOD)
      }));
    case 'SET_POKEMON':
      return action.pokemon;
    default:
      return state;
  }
};


function App() {
  // 使用 useReducer 管理寶可夢列表
  const [pokemon, setpokemon] = useReducer(pokemonReducer, []);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  
  // 使用useMemo優化搜尋寶可夢
  const filteredPokemon = useMemo(() => {
    return pokemon.filter(
      p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.age.toString().includes(searchTerm)
    );
  }, [pokemon, searchTerm]);

  // 初始化資料或從 localStorage 讀取寶可夢
  useEffect(() => {
    const TIME_DECREMENT = 5000;
    const savedPokemon = JSON.parse(localStorage.getItem('pokemonData'));
    if (savedPokemon) {
      setpokemon({ type: 'SET_POKEMON', pokemon: savedPokemon });
    } else {
      const fetchPokemon = async () => {
        const response = await Promise.all(
          Array.from({ length: 10 }, (_, index) => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`).then(response => response.json())
          )
        );
        const pokemondata = response.map(p => ({
          name: p.name,
          age: Math.floor(Math.random() * 10) + 1,
          health: Math.floor(Math.random() * 100) + 1,
          hunger: Math.floor(Math.random() * 100) + 1,
          mood: Math.floor(Math.random() * 100) + 1,
          sprite: p.sprites.front_default,
          audioUrl: `/audio/${p.name.toLowerCase()}.mp3`,
        }));
        setpokemon({ type: 'SET_POKEMON', pokemon: pokemondata });
      };
      fetchPokemon();
    }

    const interval = setInterval(() => {
      setpokemon({ type: 'UPDATE_TIME' });
    }, TIME_DECREMENT);

    return () => clearInterval(interval);
  }, []);

  // 同步 localStorage
  useEffect(() => {
    if (pokemon.length > 0) {
      localStorage.setItem('pokemonData', JSON.stringify(pokemon));
    }
  }, [pokemon]);

  useEffect(() => {
    if (selectedPokemon) {
      const updatedSelected = pokemon.find(p => p.name === selectedPokemon.name);
      if (updatedSelected) {
        setSelectedPokemon(updatedSelected);
      }
    }
  }, [pokemon, selectedPokemon]);

  // 餵食、餵水、陪玩功能
  const handleFeed = () => {
    if (selectedPokemon) {
      setpokemon({ type: 'FEED', name: selectedPokemon.name });
    }
  };

  const handleWater = () => {
    if (selectedPokemon) {
      setpokemon({ type: 'WATER', name: selectedPokemon.name });
    }
  };

  const handlePlaywith = () => {
    if (selectedPokemon) {
      setpokemon({ type: 'PLAY', name: selectedPokemon.name });
    }
  };

  return (
    <PetShopProvider>
    <div className='container'>
      <div className='header'>
      <h1>Pokemon</h1>
      <SearchBar onSearch={setSearchTerm} />
      </div>
      <div className='content'>
      <div></div>
      <PokemonGallery pokemon={filteredPokemon} onSelect={setSelectedPokemon} />

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onFeed={handleFeed}
          onWater={handleWater}
          onPlay={handlePlaywith}
        />
      )}
      </div>
      {selectedPokemon && (
  <>
    <p>Current audio URL: {selectedPokemon.audioUrl}</p>
    <AudioPlayer audioUrl={selectedPokemon.audioUrl} />
  </>
)}    </div>
    </PetShopProvider>
  );
}

export default App;
