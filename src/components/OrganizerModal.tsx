import React from 'react';
import { OrganizerConfig } from '../types/participant';
import { Settings, X, Save, RotateCcw, Sliders } from 'lucide-react';
import { DEFAULT_ORGANIZER_CONFIG } from '../data/frameStyles';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: OrganizerConfig;
  onUpdateConfig: (updated: OrganizerConfig) => void;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    onUpdateConfig(DEFAULT_ORGANIZER_CONFIG);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#041D15]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#092F24] border-2 border-[#FFE500] rounded-2xl max-w-lg w-full p-6 text-[#FFF5C7] shadow-[8px_8px_0px_#FF007A] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-[#041D15] text-[#FFE500] hover:bg-[#FF007A] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-[#FFE500] font-cinzel font-black text-lg mb-1">
          <Settings className="w-5 h-5 text-[#FF007A]" />
          EVENT ORGANIZER CONFIGURATION
        </div>
        <p className="text-xs font-sans-ui text-[#FFF5C7]/70 mb-4">
          Customize event metadata, dates, studio names, and default tags dynamically.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-tech text-[#FFE500] mb-1">Event Name</label>
              <input
                type="text"
                value={config.eventName}
                onChange={(e) => onUpdateConfig({ ...config, eventName: e.target.value })}
                className="w-full bg-[#041D15] border border-[#FFE500]/40 rounded p-2 text-xs text-[#FFF5C7] font-mono-tech"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-tech text-[#FFE500] mb-1">Devanagari Sub-badge</label>
              <input
                type="text"
                value={config.eventSubName}
                onChange={(e) => onUpdateConfig({ ...config, eventSubName: e.target.value })}
                className="w-full bg-[#041D15] border border-[#FFE500]/40 rounded p-2 text-xs text-[#FFE500] font-devanagari font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-tech text-[#FFE500] mb-1">Event Year</label>
              <input
                type="text"
                value={config.eventYear}
                onChange={(e) => onUpdateConfig({ ...config, eventYear: e.target.value })}
                className="w-full bg-[#041D15] border border-[#FFE500]/40 rounded p-2 text-xs text-[#FFF5C7] font-mono-tech"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-tech text-[#FFE500] mb-1">Studio / Brand Name</label>
              <input
                type="text"
                value={config.studioName}
                onChange={(e) => onUpdateConfig({ ...config, studioName: e.target.value })}
                className="w-full bg-[#041D15] border border-[#FFE500]/40 rounded p-2 text-xs text-[#FFF5C7] font-mono-tech"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-tech text-[#FFE500] mb-1">Location</label>
              <input
                type="text"
                value={config.eventLocation}
                onChange={(e) => onUpdateConfig({ ...config, eventLocation: e.target.value })}
                className="w-full bg-[#041D15] border border-[#FFE500]/40 rounded p-2 text-xs text-[#FFF5C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-tech text-[#FFE500] mb-1">Event Dates</label>
              <input
                type="text"
                value={config.eventDates}
                onChange={(e) => onUpdateConfig({ ...config, eventDates: e.target.value })}
                className="w-full bg-[#041D15] border border-[#FFE500]/40 rounded p-2 text-xs text-[#FFF5C7] font-mono-tech"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-[#FFE500] mb-1">Default Tagline</label>
            <input
              type="text"
              value={config.defaultTagline}
              onChange={(e) => onUpdateConfig({ ...config, defaultTagline: e.target.value })}
              className="w-full bg-[#041D15] border border-[#FFE500]/40 rounded p-2 text-xs text-[#FFF5C7]"
            />
          </div>

          <div className="pt-3 border-t border-[#FFE500]/20 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="py-2 px-3 rounded bg-[#041D15] text-xs font-mono-tech text-red-400 border border-red-500/30 hover:bg-red-500/20 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 rounded bg-[#FFE500] text-[#092F24] text-xs font-mono-tech font-bold hover:bg-[#FF007A] hover:text-white transition-colors flex items-center gap-1 shadow-[2px_2px_0px_#000]"
            >
              <Save className="w-3.5 h-3.5" /> Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
