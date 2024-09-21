import React, { useRef, useEffect, useState } from 'react';
import { IoMdPlay, IoMdPause } from 'react-icons/io';

function AudioPlayer({ audioName }) {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// Initialize audio only once when the component mounts
	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio();
		}

		// Clean up when the component unmounts
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = ''; // Reset the audio source
			}
		};
	}, []);

	// Load the new audio file when the audioName changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = require(`../assets/${audioName}`);
			audioRef.current.pause(); // Ensure audio starts paused
			audioRef.current.currentTime = 0; // Reset play time
			setIsPlaying(false); // Reset playing state
		}
	}, [audioName]);

	const handlePlay = () => {
		if (audioRef.current) {
			audioRef.current
				.play()
				.then(() => {
					setIsPlaying(true);
				})
				.catch((error) => {
					console.error('Error while playing the audio:', error);
				});
		}
	};

	const handlePause = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			setIsPlaying(false); // Pause is instant, no promise to wait for
		}
	};

	const handleVolumeChange = (e) => {
		if (audioRef.current) {
			audioRef.current.volume = e.target.value;
		}
	};

	useEffect(() => {
		if (audioRef.current) {
			const handleError = () => {
				console.error('Audio file failed to load:', audioName);
				alert(`Error loading audio: ${audioName}`);
			};
			audioRef.current.onerror = handleError;
		}
	}, [audioName]);

	return (
		<div className="audioContent">
			<div onClick={isPlaying ? handlePause : handlePlay}>
				{isPlaying ? (
					<IoMdPause size={'30px'} />
				) : (
					<IoMdPlay size={'30px'} />
				)}
			</div>
			<input
				type="range"
				min="0"
				max="1"
				step="0.1"
				onChange={handleVolumeChange}
			/>
		</div>
	);
}

export default AudioPlayer;
