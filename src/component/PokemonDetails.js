import AudioPlayer from "./AudioPlayer";
import StatsPanel from "./StatsPanel";
function PokemonDetails({ allPokemon, pokemon, onFeed, onWater, onPlay, onSend }) {

  return (
    <div className='details'>
      <h2>{pokemon.name} Details</h2>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p>Age: {pokemon.age}</p>
      <p>Health: {pokemon.health}</p>
      <p>Hunger: {pokemon.hunger}</p>
      <p>Mood: {pokemon.mood} {pokemon.mood > 50 ? '😊' : '😞'}</p>
      <div>
        <button onClick={onFeed}>餵食</button>
        <button onClick={onWater}>喝水</button>
        <button onClick={onPlay}>玩耍</button>
        <button onClick={onSend}>送養</button>
      </div>
      <div className="audioContainer">
        <p>當前寶可夢: {pokemon.audioName}</p>

        <AudioPlayer audioName={pokemon.audioName} />
      </div>
      <div>
        <StatsPanel pokemon={allPokemon} />
      </div>

    </div>
  );
}
export default PokemonDetails;