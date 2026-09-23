import React from 'react';

interface DBLogoProps {
  className?: string;
  size?: number;
}

export default function DBLogo({ className = 'w-6 h-6 text-white', size }: DBLogoProps) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Slanted D stem */}
        <path d="M 190 170 L 90 370" strokeWidth="24" />
        
        {/* D loop */}
        <path d="M 78 230 C 110 160, 180 110, 260 110 C 305 110, 315 150, 275 210 C 235 270, 160 360, 95 385" strokeWidth="22" />

        {/* B spine */}
        <path d="M 205 400 L 285 215" strokeWidth="22" />

        {/* B upper loop */}
        <path d="M 285 215 C 340 175, 390 180, 395 210 C 400 235, 365 255, 280 260" strokeWidth="22" />

        {/* B lower loop */}
        <path d="M 280 260 C 365 245, 420 260, 420 305 C 418 350, 355 370, 275 360" strokeWidth="22" />
      </g>
    </svg>
  );
}
