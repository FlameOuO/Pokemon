import React, { useRef, useEffect, useState } from 'react';

function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();  
      audioRef.current.currentTime = 0;  
      setIsPlaying(false);
    }
  }, [audioUrl]);


  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
    }
  };
  const handleError = () => {
    console.error('Failed to load audio file:', audioUrl);
  };

  return (
    <div>
     <button onClick={isPlaying ? handlePause : handlePlay}>
     {isPlaying ? '暫停' : '播放'}
     </button>
      <input type="range" min="0" max="1" step="0.1" onChange={handleVolumeChange} />
      <audio ref={audioRef} src={audioUrl} onError={handleError}></audio>
    </div>
  );
}

export default AudioPlayer;