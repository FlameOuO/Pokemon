import React, { useState } from 'react';
import '../css/form.css';

function PokemonForm({ onAdopt }) {
    const [pokemonId, setPokemonId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pokemonId) {
            alert('請輸入寶可夢ID');
            return;
        }

        try {
            setLoading(true);

            // 從 PokeAPI 抓取寶可夢數據
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const data = await response.json();

            // 隨機生成飢餓度、健康度、心情
            const newPokemon = {
                name: data.name,
                age: Math.floor(Math.random() * 10) + 1,
                health: Math.floor(Math.random() * 100) + 1,
                hunger: Math.floor(Math.random() * 100) + 1,
                mood: Math.floor(Math.random() * 100) + 1,
                sprite: data.sprites.front_default,
                audioUrl: `${data.name.toLowerCase()}.mp3`,
                adopted: true,
            };

            // 調用父組件的函數來新增寶可夢
            alert('成功抓取寶可夢！');
            onAdopt(newPokemon);
            // 清空表單
            setPokemonId('');
            setShowForm(false);
        } catch (error) {
            console.error('從API抓取寶可夢數據失敗:', error);
            alert('抓取失敗，請確認輸入的ID是否正確');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <button className='formbutton' onClick={() => setShowForm(!showForm)}>
                    {showForm ? '隱藏表單' : '新增寶可夢'}
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>寶可夢ID：</label>
                            <input
                                type="number"
                                value={pokemonId}
                                onChange={(e) => setPokemonId(e.target.value)}
                            />
                        </div>
                        <button className='formbutton' type="submit" disabled={loading}>
                            {loading ? '抓取中...' : '領養寶可夢'}
                        </button>
                    </form>
                )}
            </div>


        </>
    );
}

export default PokemonForm;