import React from 'react';

export const DecorativeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Forest Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041D15] via-[#005c33] to-[#041D15] opacity-95" />

      {/* Screen Print Dots Texture */}
      <div className="absolute inset-0 bg-print-texture opacity-30" />
      <div className="absolute inset-0 bg-noise-grain" />

      {/* Tropical Palm / Leaf SVG Silhouettes on Corners */}
      <svg
        className="absolute -top-10 -left-10 w-80 h-80 text-[#FFE500]/10 transform -rotate-45"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100,10 Q140,40 180,10 Q150,60 190,100 Q140,110 130,170 Q100,120 70,170 Q60,110 10,100 Q50,60 20,10 Q60,40 100,10 Z" />
      </svg>

      <svg
        className="absolute -bottom-10 -right-10 w-96 h-96 text-[#FF007A]/10 transform rotate-135"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100,10 Q140,40 180,10 Q150,60 190,100 Q140,110 130,170 Q100,120 70,170 Q60,110 10,100 Q50,60 20,10 Q60,40 100,10 Z" />
      </svg>

      {/* Glowing Ambient Flares */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#FFE500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-[#FF007A]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
