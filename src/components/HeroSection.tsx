import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Cpu, LayoutGrid } from 'lucide-react';
import { FrameStyleId } from '../types/participant';
import { FRAME_STYLES } from '../data/frameStyles';

interface HeroSectionProps {
  onCreateClick: () => void;
  onExploreFramesClick: () => void;
  onSelectFrame: (frameId: FrameStyleId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCreateClick,
  onExploreFramesClick,
  onSelectFrame,
}) => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {/* Hero Badge */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#092F24] border-2 border-[#FFE500] text-[#FFE500] text-xs font-mono-tech font-bold shadow-[3px_3px_0px_#FF007A]">
          <Flame className="w-4 h-4 text-[#FF007A] animate-bounce" />
          <span>HACKER HOUSE GOA 2026 • TASK #1</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-black tracking-tight text-[#FFE500] uppercase leading-none drop-shadow-[4px_4px_0px_#000]">
          MAKE YOUR <br />
          <span className="text-[#FF007A] bg-[#FFE500] px-3 py-0.5 rounded-lg inline-block transform -rotate-1 text-stroke-pink border-2 border-[#FF007A] my-1 shadow-[4px_4px_0px_#000]">
            HACKER IDENTITY
          </span> <br />
          OFFICIAL.
        </h1>

        <p className="text-base sm:text-lg font-mono-tech font-semibold text-[#FFF5C7] tracking-wider max-w-xl mx-auto pt-2">
          Build it. Hack it. Ship it. Take it to Goa.
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onCreateClick}
            className="py-3.5 px-8 rounded-xl bg-[#FFE500] text-[#092F24] font-mono-tech font-black text-sm uppercase hover:bg-[#FF007A] hover:text-white transition-all shadow-[4px_4px_0px_#000] flex items-center gap-2 active:translate-y-1"
          >
            <Sparkles className="w-5 h-5 text-[#FF007A] group-hover:text-white" />
            CREATE MY ID PASS
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreFramesClick}
            className="py-3.5 px-8 rounded-xl bg-[#006B3C] border-2 border-[#FFE500] text-[#FFE500] font-mono-tech font-bold text-sm uppercase hover:bg-[#FFE500] hover:text-[#092F24] transition-all shadow-[4px_4px_0px_#000] flex items-center gap-2"
          >
            <LayoutGrid className="w-5 h-5" />
            EXPLORE FRAMES
          </button>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-center max-w-4xl mx-auto">
        <div className="bg-[#092F24]/80 p-3 rounded-lg border border-[#FFE500]/30 shadow-[3px_3px_0px_#000]">
          <div className="text-[#FFE500] font-mono-tech font-bold text-xs uppercase">5 Frame Aesthetics</div>
          <div className="text-[11px] text-[#FFF5C7]/70 mt-0.5">Classic Goa to Chaos Mode</div>
        </div>
        <div className="bg-[#092F24]/80 p-3 rounded-lg border border-[#FFE500]/30 shadow-[3px_3px_0px_#000]">
          <div className="text-[#FFE500] font-mono-tech font-bold text-xs uppercase">Instant PNG Export</div>
          <div className="text-[11px] text-[#FFF5C7]/70 mt-0.5">Client-side 3x resolution</div>
        </div>
        <div className="bg-[#092F24]/80 p-3 rounded-lg border border-[#FFE500]/30 shadow-[3px_3px_0px_#000]">
          <div className="text-[#FFE500] font-mono-tech font-bold text-xs uppercase">Dynamic QR Code</div>
          <div className="text-[11px] text-[#FFF5C7]/70 mt-0.5">GitHub, Portfolio, LinkedIn</div>
        </div>
        <div className="bg-[#092F24]/80 p-3 rounded-lg border border-[#FFE500]/30 shadow-[3px_3px_0px_#000]">
          <div className="text-[#FFE500] font-mono-tech font-bold text-xs uppercase">Hacker ID Generator</div>
          <div className="text-[11px] text-[#FFF5C7]/70 mt-0.5">Unique event hash code</div>
        </div>
      </div>

      {/* Frame Style Quick Preview Gallery */}
      <div className="mt-12 pt-8 border-t border-[#FFE500]/20">
        <div className="text-center mb-6">
          <h2 className="text-xl font-cinzel font-black text-[#FFE500] uppercase tracking-wide">
            EXPLORE THE 5 FRAME AESTHETICS
          </h2>
          <p className="text-xs font-mono-tech text-[#FFF5C7]/70 mt-1">
            Click any frame template below to load it into the generator
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FRAME_STYLES.map((frame) => (
            <button
              key={frame.id}
              onClick={() => {
                onSelectFrame(frame.id);
                onCreateClick();
              }}
              className="group bg-[#092F24] p-4 rounded-xl border-2 border-[#FFE500]/40 hover:border-[#FFE500] transition-all text-left flex flex-col justify-between shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#FF007A] hover:-translate-y-1"
            >
              <div>
                <span className="text-[9px] font-mono-tech font-black text-[#FF007A] uppercase tracking-widest bg-[#FFE500] px-2 py-0.5 rounded inline-block mb-2">
                  {frame.tag}
                </span>
                <h3 className="text-sm font-mono-tech font-bold text-[#FFE500] group-hover:text-white">
                  {frame.name}
                </h3>
                <p className="text-[11px] font-sans-ui text-[#FFF5C7]/80 mt-1 line-clamp-3">
                  {frame.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#FFE500]/20 flex items-center justify-between text-xs font-mono-tech text-[#FFE500] font-bold">
                <span>Select Frame</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
