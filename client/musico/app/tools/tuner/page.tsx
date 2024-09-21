'use client';
import React from 'react';

const guitarNotes = [
  { note: 'E', frequency: 82.41 },
  { note: 'A', frequency: 110 },
  { note: 'D', frequency: 146.83 },
  { note: 'G', frequency: 196 },
  { note: 'B', frequency: 246.94 },
  { note: 'E (high)', frequency: 329.63 },
];

const violinNotes = [
  { note: 'G', frequency: 196 },
  { note: 'D', frequency: 293.66 },
  { note: 'A', frequency: 440 },
  { note: 'E', frequency: 659.25 },
];

const playTone = (frequency: number) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine'; 

  gainNode.gain.setValueAtTime(1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1); 

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 1); 
};

const playViolinTone = (frequency: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter(); 
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(audioContext.destination);
  
    osc1.frequency.value = frequency;
    osc1.type = 'sawtooth'; 
    osc2.frequency.value = frequency * 2; 
    osc2.type = 'triangle';
  
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.8, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioContext.currentTime); 
  
    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);
  

    osc1.stop(audioContext.currentTime + 2);
    osc2.stop(audioContext.currentTime + 2);
  };
  
export default function TunerPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-4">
        <h1 className="text-5xl font-bold mt-6 mb-6 w-full text-center">Tuner</h1>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mt-6 mb-4">🎸Guitar Tuning</h2>
          <div className="flex justify-center gap-4">
            {guitarNotes.map((note) => (
              <button
                key={note.note}
                onClick={() => playTone(note.frequency)}
                className="btn btn-primary"
              >
                {note.note}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold mt-6 mb-4">🎻Violin Tuning</h2>
          <div className="flex justify-center gap-4">
            {violinNotes.map((note) => (
              <button
                key={note.note}
                onClick={() => playViolinTone(note.frequency)}
                className="btn btn-secondary"
              >
                {note.note}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
