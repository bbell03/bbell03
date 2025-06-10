'use client';
import { useState, useEffect, useRef } from 'react';

export default function CursorColorPicker() {
  const [color, setColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cursor-accent-color') || '#2563eb';
    }
    return '#2563eb';
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-accent', color);
    document.documentElement.style.setProperty('--highlight', color);
    document.documentElement.style.setProperty('--secondary', color);
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('cursor-accent-color', color);
    localStorage.setItem('highlight-color', color);
    localStorage.setItem('secondary-color', color);
    localStorage.setItem('accent-color', color);
  }, [color]);

  const openColorPicker = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-white/80 dark:bg-black/60 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <label className="text-xs mb-1">Accent Color</label>
      <button
        type="button"
        className="w-8 h-8 rounded-full border-2 border-gray-300 mb-1 focus:outline-none focus:ring-2 focus:ring-accent"
        style={{ backgroundColor: color }}
        onClick={openColorPicker}
        onTouchEnd={openColorPicker}
        aria-label="Pick accent color"
      />
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        className="w-0 h-0 opacity-0 absolute pointer-events-none"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
} 