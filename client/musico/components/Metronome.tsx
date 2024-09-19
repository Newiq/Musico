'use client';

import React, { useState, useRef } from 'react';

function Metronome() {
  const [bpm, setBpm] = useState(70);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const playTone = (frequency: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext)();
    }

    if (oscRef.current) {
      oscRef.current.stop();
    }

    oscRef.current = audioContextRef.current.createOscillator();
    gainNodeRef.current = audioContextRef.current.createGain();

    oscRef.current.frequency.value = frequency;
    oscRef.current.type = 'sine';

    gainNodeRef.current.gain.setValueAtTime(0.8, audioContextRef.current.currentTime);
    gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.2);

    oscRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);

    oscRef.current.start(audioContextRef.current.currentTime);
    oscRef.current.stop(audioContextRef.current.currentTime + 0.2); 
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
    setIsPlaying(!isPlaying);
  };

  const startMetronome = () => {
    const interval = 60000 / bpm;
    const id = window.setInterval(() => {
      playTone(440);
    }, interval);
    setIntervalId(id);
  };

  const stopMetronome = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (oscRef.current) {
      oscRef.current.stop();
    }
  };

  const changeBpm = (newBpm: number) => {
    setBpm(newBpm);
    if (isPlaying) {
      stopMetronome();
      startMetronome(); 
    }
  };

  return (
    <div className="metronome flex justify-center items-center">
      <div className="join">
        <button 
          className="btn join-item" 
          onClick={() => changeBpm(bpm - 1)}
          disabled={bpm <= 40} 
        >
          «
        </button>
        <span className="join-item btn">{bpm} BPM</span>
        <button 
          className="btn join-item" 
          onClick={() => changeBpm(bpm + 1)}
          disabled={bpm >= 200}
        >
          »
        </button>
      </div>

      <div className="join mt-4">
        <label className="swap">
        <input type="checkbox" onClick={togglePlay}/>

        <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24">
            <path
            d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
        </svg>

        <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24">
            <path
            d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
        </svg>
        </label>
      </div>
    </div>
  );
}

export default Metronome;
