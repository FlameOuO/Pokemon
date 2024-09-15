import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonGallery({ pokemon, onSelect }) {
	return (
		<div className="gallery">
			{pokemon.map((p, index) => (
				<PokemonCard
					key={index}
					pokemon={p}
					onClick={() => onSelect(p)}
				/>
			))}
		</div>
	);
}

export default PokemonGallery;
