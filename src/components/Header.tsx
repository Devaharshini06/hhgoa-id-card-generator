import React from 'react';
import { Sparkles, Settings, FileText, LayoutGrid, Cpu } from 'lucide-react';
import { OrganizerConfig } from '../types/participant';

interface HeaderProps {
  activeTab: 'generator' | 'frames' | 'about';
  setActiveTab: (tab: 'generator' | 'frames' | 'about') => void;
  onOpenOrganizer: () => void;
  onOpenNoticeBoard: () => void;
  organizerConfig: OrganizerConfig;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenOrganizer,
  onOpenNoticeBoard,
  organizerConfig,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#004D2C] border-b-2 border-[#FFE500] text-[#FFE500]">
      {/* Top Notice Ticker */}
      <div className="bg-[#FFE500] text-[#004D2C] px-4 py-1 text-xs font-mono-tech font-black flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="bg-[#FF007A] text-white px-2 py-0.5 uppercase font-black italic tracking-wider text-[10px]">
            TASK #1 LIVE
          </span>
          <span className="truncate uppercase font-extrabold tracking-wide">
            HHGOA '26 — BUILD & SHIP YOUR OFFICIAL HACKER ID CARD
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] font-mono-tech font-black">
          <span>GOA, INDIA</span>
          <span>•</span>
          <span>{organizerConfig.eventDates}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('generator')}>
          <div className="bg-[#FF007A] text-white px-3 py-1 font-black text-xl italic shadow-[2px_2px_0px_#FFE500]">
            HH
          </div>
          <h1 className="font-black text-xl sm:text-2xl tracking-tighter uppercase text-[#FFE500] flex items-center gap-1.5">
            GOA<span className="text-[#FF007A]">'26</span>
            <span className="text-xs font-mono-tech font-bold text-[#FFF5C7] opacity-80 hidden sm:inline-block border-l-2 border-[#FFE500] pl-2 ml-1">
              ID GENERATOR
            </span>
          </h1>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono-tech font-black text-xs tracking-widest uppercase">
          <button
            onClick={() => setActiveTab('generator')}
            className={`py-1 transition-all flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'border-b-2 border-[#FF007A] text-[#FFE500]'
                : 'text-[#FFF5C7] hover:text-[#FFE500]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#FF007A]" />
            Generator
          </button>
          <button
            onClick={() => setActiveTab('frames')}
            className={`py-1 transition-all flex items-center gap-1.5 ${
              activeTab === 'frames'
                ? 'border-b-2 border-[#FF007A] text-[#FFE500]'
                : 'text-[#FFF5C7] hover:text-[#FFE500]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#FF007A]" />
            Frames
          </button>
          <button
            onClick={onOpenNoticeBoard}
            className="py-1 text-[#FFF5C7] hover:text-[#FFE500] transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF007A]" />
            Notice Board
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNoticeBoard}
            className="md:hidden p-2 bg-[#003820] border-2 border-[#FFE500] text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C] transition-colors"
            title="View Notice Board"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenOrganizer}
            className="px-3 py-1.5 bg-[#003820] border-2 border-[#FFE500] text-[#FFE500] hover:bg-[#FF007A] hover:text-white transition-all text-xs font-mono-tech font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#FFE500]"
            title="Organizer Configuration Mode"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Organizer</span>
          </button>

          <a
            href="https://hhgoa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#FFE500] text-[#004D2C] font-mono-tech font-black text-xs hover:bg-[#FF007A] hover:text-white transition-all shadow-[2px_2px_0px_#FF007A] flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">HHGoa.com</span>
          </a>
        </div>
      </div>
    </header>
  );
};
