'use client';
import { useState, useEffect, useRef } from 'react';

function hexToHSL(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `${h} ${s}% ${l}%`;
}

export default function CursorColorPicker() {
  const [color, setColor] = useState('#2563eb');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle hydration and initial load from localStorage
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('cursor-accent-color') || '#2563eb';
      setColor(savedColor);
    }
  }, []);

  // Apply color changes
  useEffect(() => {
    if (!mounted) return;
    
    const hsl = hexToHSL(color);
    document.documentElement.style.setProperty('--cursor-accent', hsl);
    document.documentElement.style.setProperty('--highlight', hsl);
    document.documentElement.style.setProperty('--secondary', hsl);
    document.documentElement.style.setProperty('--accent', hsl);
    localStorage.setItem('cursor-accent-color', color);
    localStorage.setItem('highlight-color', color);
    localStorage.setItem('secondary-color', color);
    localStorage.setItem('accent-color', color);
  }, [color, mounted]);

  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-white/80 dark:bg-black/60 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <label className="text-xs mb-1">Accent Color</label>
      <div className="relative w-8 h-8 mb-1">
        <span
          className="w-8 h-8 rounded-full border-2 border-gray-300 block"
          style={{ backgroundColor: color }}
          aria-label="Pick accent color"
        />
        <input
          ref={inputRef}
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          tabIndex={0}
          aria-label="Pick accent color"
        />
      </div>
    </div>
  );
} 