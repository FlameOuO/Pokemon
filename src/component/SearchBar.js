import React, { useState } from 'react';

function SearchBar({ onSearch }){
    const [query, setQuery] = useState('');
  
    const handleSearch = (e) => {
      setQuery(e.target.value);
      onSearch(e.target.value);
    };
  
    return (
      <input className='searchbar' type="text" value={query} onChange={handleSearch} placeholder='搜尋寶可夢' />
    );
  }
export default SearchBar;