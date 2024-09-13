import React, { useRef, useEffect, useState } from 'react';
import { IoMdPlay,IoMdPause  } from "react-icons/io";
import '../css/App.css';

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
    console.error('音頻文件加載失敗:', audioUrl);
    alert(`加載音頻時出錯: ${audioUrl}`);
  };

  return (
    <div className='audiocontent'>
        <div></div>
        <div onClick={isPlaying ? handlePause : handlePlay}>
        {isPlaying ? <IoMdPause size={'30px'}/> :<IoMdPlay size={'30px'}/>}
        </div>
        <input type="range" min="0" max="1" step="0.1" onChange={handleVolumeChange} />
        <audio ref={audioRef} src={audioUrl} onError={handleError}></audio>
    </div>
  );
}

export default AudioPlayer;