'use client';
import Metronome from "./Metronome";
import React, { useState, useRef, useEffect } from 'react';
import { deleteSheet } from '../app/utils/api'; 

interface ToolsNavProps {
  sheetId: string; 
}

function ToolsNav({ sheetId }: ToolsNavProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(30);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoScroll = () => {
    if (isScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  const startAutoScroll = () => {
    const scrollAmount = 1; 
    scrollIntervalRef.current = setInterval(() => {
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScroll < maxScroll) {
        window.scrollTo({
          top: currentScroll + scrollAmount,
          behavior: 'smooth',
        });
      } else {
        stopAutoScroll(); 
      }
    }, scrollSpeed);
    setIsScrolling(true);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setIsScrolling(false);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.target.value);
    setScrollSpeed(newSpeed);

    if (isScrolling) {
      stopAutoScroll();
      startAutoScroll();
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this sheet?');
    if (confirmDelete) {
      try {
        await deleteSheet(sheetId); 
        alert('Sheet deleted successfully.');
        window.location.replace('/sheets'); 
      } catch (error) {
        console.error('Error deleting sheet:', error);
        alert('Failed to delete the sheet.');
      }
    }
  };

  return (
    <div className="drawer max-w-40 mt-5">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate drawer-button">
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <polygon
              points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>Metronome<Metronome /></li>
          <li>
            Auto Scroll
            <label className="swap">
              <input type="checkbox" onClick={handleAutoScroll} />
              <div className="swap-on">ON</div>
              <div className="swap-off">OFF</div>
            </label>
          </li>
          <li>
            <label className="block mb-2">Scroll Speed: {scrollSpeed} (lower is slower)</label>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={scrollSpeed} 
              onChange={handleSpeedChange} 
              className="range range-secondary mb-5" 
            />
          </li>
          <li>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete Sheet
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ToolsNav;
