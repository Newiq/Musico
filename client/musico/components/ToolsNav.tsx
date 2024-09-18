'use client';
import Metronome from "./Metronome";
import React, { useState, useRef } from 'react';
import { deleteSheet } from '../app/utils/api'; 

interface ToolsNavProps {
  sheetId: string; 
}
function ToolsNav({ sheetId }: ToolsNavProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoScroll = () => {
    if (isScrolling) {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
      setIsScrolling(false);
    } else {
      scrollIntervalRef.current = setInterval(() => {
        const currentScroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (currentScroll < maxScroll) {
          window.scrollTo({
            top: currentScroll + 2,
            behavior: 'smooth',
          });
        } else {
          clearInterval(scrollIntervalRef.current as NodeJS.Timeout);
          setIsScrolling(false);
        }
      }, scrollSpeed);
      setIsScrolling(true);
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.target.value);
    setScrollSpeed(newSpeed);

    if (isScrolling) {
      clearInterval(scrollIntervalRef.current as NodeJS.Timeout);
      scrollIntervalRef.current = setInterval(() => {
        const currentScroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (currentScroll < maxScroll) {
          window.scrollTo({
            top: currentScroll + 2,
            behavior: 'smooth',
          });
        } else {
          clearInterval(scrollIntervalRef.current as NodeJS.Timeout);
          setIsScrolling(false);
        }
      }, newSpeed);
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
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Tools</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li><a><Metronome /></a></li>
          <li><a>Highlight Tools</a></li>
          <li><a>Anotation Tools</a></li>
          <li>
            Auto Scroll
            <label className="swap" >
              <input type="checkbox" onClick={handleAutoScroll}/>
              <div className="swap-on">ON</div>
              <div className="swap-off">OFF</div>
            </label>
          </li>
          <li>
            <label className="block mb-2">Scroll Speed: {scrollSpeed}ms</label>
            <input 
              type="range" 
              min='10' 
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
