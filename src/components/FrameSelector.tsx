import React from 'react';
import { FrameStyleConfig, FrameStyleId } from '../types/participant';
import { FRAME_STYLES } from '../data/frameStyles';
import { LayoutGrid, Check, Sparkles } from 'lucide-react';

interface FrameSelectorProps {
  selectedFrameId: FrameStyleId;
  onSelectFrame: (frameId: FrameStyleId) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  selectedFrameId,
  onSelectFrame,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-[#FF007A]" />
          Frame Style
        </label>
        <span className="text-[9px] font-mono-tech font-bold uppercase text-[#004D2C] bg-[#FFE500] px-2 py-0.5 border border-[#FF007A]">
          5 STYLES
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FRAME_STYLES.map((frame: FrameStyleConfig) => {
          const isSelected = frame.id === selectedFrameId;
          return (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(frame.id)}
              className={`py-2 px-3 text-[10px] font-black uppercase transition-all relative text-center border-2 ${
                isSelected
                  ? 'border-[#FF007A] bg-[#FF007A] text-white shadow-[2px_2px_0px_#FFE500]'
                  : 'border-[#FFE500] bg-transparent text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]'
              }`}
            >
              {frame.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
