import React, { useMemo } from 'react';

function StatsPanel({ pokemon }) {
    // 使用 useMemo 計算總數、平均健康度、和已收養數量
    const totalPokemon = useMemo(() =>
        Array.isArray(pokemon) ? pokemon.length : 0,
        [pokemon]
    );

    const avgHealth = useMemo(() => {
        if (pokemon.length === 0) return 0;

        const totalHealth = Array.isArray(pokemon)
            ? pokemon.reduce((acc, p) => acc + (p.health || 0), 0)
            : 0;
        return totalPokemon > 0 ? (totalHealth / totalPokemon).toFixed(2) : 0;
    }, [pokemon, totalPokemon]);

    const adoptedCount = useMemo(() => {
        return Array.isArray(pokemon) ?
            pokemon.filter(p => p && p.adopted === true).length
            : 0;
    }, [pokemon]);


    return (
        <div className='stats-panel'>
            <h2>寵物店統計數據</h2>
            <p>寶可夢總數: {totalPokemon}</p>
            <p>平均健康度: {avgHealth}</p>
            <p>已收養的寶可夢: {adoptedCount}</p>
        </div>
    );
}

export default StatsPanel;