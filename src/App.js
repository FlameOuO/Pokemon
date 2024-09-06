import React, { useState, useEffect, useReducer, useMemo } from 'react';
import PokemonGallery from './component/PokemonGallery';
import PokemonDetails from './component/PokemonDetails';

// 使用 pokemonReducer 管理整個寶可夢列表
const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'FEED':
      return state.map(p => 
        p.name === action.name ? { ...p, hunger: Math.min(p.hunger + 10, 100), health: Math.min(p.health + 5,100) } : p
      );
    case 'WATER':
      return state.map(p => 
        p.name === action.name ? { ...p, health: Math.min(p.health + 10, 100) } : p
      );
    case 'PLAY':
      return state.map(p => 
        p.name === action.name ? { ...p, mood: Math.min(p.mood + 15, 100), hunger: Math.max(p.hunger - 5, 0) } : p
      );

    case 'UPDATE_TIME':
      return state.map(p => ({
        ...p,
        health: Math.max(p.health - 5, 0),
        hunger: Math.min(Math.max(p.hunger - 5,0), 100),
        mood: Math.max(p.mood - 5, 0)
      }));
    case 'SET_POKEMON':
      return action.pokemon;
    default:
      return state;
  }
};

function SearchBar({ onSearch }){
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input type="text" value={query} onChange={handleSearch} placeholder='搜尋寶可夢' />
  );
}

function App() {
  // 使用 useReducer 管理寶可夢列表
  const [pokemon, setpokemon] = useReducer(pokemonReducer, []);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 過濾寶可夢
  const filteredPokemon = useMemo(() => {
    return pokemon.filter(
      p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.age.toString().includes(searchTerm)
    );
  }, [pokemon, searchTerm]);

  // 初始化資料或從 localStorage 讀取寶可夢
  useEffect(() => {
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
          sprite: p.sprites.front_default
        }));
        setpokemon({ type: 'SET_POKEMON', pokemon: pokemondata });
      };
      fetchPokemon();
    }

    const interval = setInterval(() => {
      setpokemon({ type: 'UPDATE_TIME' }); // 更新寶可夢的時間邏輯可以根據需求擴展
    }, 5000);

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

  const handlePlay = () => {
    if (selectedPokemon) {
      setpokemon({ type: 'PLAY', name: selectedPokemon.name });
    }
  };

  return (
    <div>
      <h1>Pokemon</h1>
      <SearchBar onSearch={setSearchTerm} />
      <PokemonGallery pokemon={filteredPokemon} onSelect={setSelectedPokemon} />
      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onFeed={handleFeed}
          onWater={handleWater}
          onPlay={handlePlay}
        />
      )}
    </div>
  );
}

export default App;
