import React from 'react';
import { ParticipantData, QRTarget } from '../types/participant';
import { ImageUploader } from './ImageUploader';
import { FrameSelector } from './FrameSelector';
import { FrameStyleId } from '../types/participant';
import { User, AtSign, Briefcase, Quote, MapPin, Github, Linkedin, Globe, Users, Cpu, RefreshCw, QrCode, Sparkles } from 'lucide-react';
import { rerollHackerId } from '../utils/generateHackerId';

interface GeneratorFormProps {
  participant: ParticipantData;
  onChange: (updated: Partial<ParticipantData>) => void;
  selectedFrameId: FrameStyleId;
  onSelectFrame: (frameId: FrameStyleId) => void;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  participant,
  onChange,
  selectedFrameId,
  onSelectFrame, }) => {
  const handleRerollId = () => {
    const newId = rerollHackerId(participant.name || 'HACKER');
    onChange({ hackerId: newId });
  };

  return (
    <div className="space-y-6 bg-[#003820] p-6 sm:p-8 border-2 border-[#FFE500] text-[#FFE500] shadow-[6px_6px_0px_#000]">
      {/* Form Header */}
      <div className="border-b-2 border-[#FFE500] pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black text-[#FF007A] uppercase tracking-widest italic flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF007A]" /> BUILDER IDENTITY
          </h2>
          <p className="text-sm text-[#FFF5C7] opacity-80 mt-1">
            Enter your details to generate your official hacker pass.
          </p>
        </div>
        <span className="text-[10px] font-mono-tech font-black text-[#004D2C] bg-[#FFE500] px-2.5 py-1 border border-[#FF007A] uppercase">
          LIVE PREVIEW ON
        </span>
      </div>

      {/* Frame Selector */}
      <FrameSelector
        selectedFrameId={selectedFrameId}
        onSelectFrame={onSelectFrame}
      />

      {/* Profile Image Uploader */}
      <ImageUploader
        image={participant.profileImage}
        onImageChange={(img) => onChange({ profileImage: img })}
      />

      {/* Primary Details Section */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-mono-tech font-black text-[#FF007A] uppercase tracking-widest italic border-b border-[#FFE500]/30 pb-1">
          PERSONAL DATA
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FF007A]" /> Full Name
            </label>
            <input
              type="text"
              value={participant.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Alex Rivera"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-sm text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>

          {/* Builder Handle */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1.5">
              <AtSign className="w-3.5 h-3.5 text-[#FF007A]" /> Handle / Username
            </label>
            <input
              type="text"
              value={participant.handle}
              onChange={(e) => onChange({ handle: e.target.value })}
              placeholder="e.g. @alexrivera"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-sm text-[#FFE500] font-mono font-bold focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#FF007A]" /> Role / Track
            </label>
            <input
              type="text"
              value={participant.role}
              onChange={(e) => onChange({ role: e.target.value })}
              placeholder="e.g. AI Engineer / Builder"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-sm text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF007A]" /> Location
            </label>
            <input
              type="text"
              value={participant.location}
              onChange={(e) => onChange({ location: e.target.value })}
              placeholder="e.g. Goa, India"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-sm text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-[#FF007A]" /> Tagline
          </label>
          <input
            type="text"
            value={participant.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            placeholder="e.g. Building AI systems that actually do things."
            maxLength={75}
            className="bg-transparent border border-[#FFE500] px-3 py-2 text-sm text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
          />
          <span className="text-[10px] font-mono text-[#FFE500]/60 float-right mt-0.5">
            {participant.tagline.length}/75
          </span>
        </div>
      </div>

      {/* Social Links & QR Target */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-mono-tech font-black text-[#FF007A] uppercase tracking-widest italic border-b border-[#FFE500]/30 pb-1">
          LINKS & QR DESTINATION
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* GitHub */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1">
              <Github className="w-3 h-3 text-[#FF007A]" /> GitHub
            </label>
            <input
              type="text"
              value={participant.github}
              onChange={(e) => onChange({ github: e.target.value })}
              placeholder="https://github.com/..."
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-xs text-[#FFE500] font-mono focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>

          {/* Portfolio */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#FF007A]" /> Portfolio
            </label>
            <input
              type="text"
              value={participant.portfolio}
              onChange={(e) => onChange({ portfolio: e.target.value })}
              placeholder="https://yourportfolio.com"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-xs text-[#FFE500] font-mono focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-[#FF007A]" /> LinkedIn
            </label>
            <input
              type="text"
              value={participant.linkedin}
              onChange={(e) => onChange({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-xs text-[#FFE500] font-mono focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>
        </div>

        {/* QR Target Selector */}
        <div>
          <label className="block text-[10px] font-bold uppercase text-[#FFE500] mb-1.5 flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-[#FF007A]" /> QR Code Target
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['github', 'portfolio', 'linkedin'] as QRTarget[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange({ qrTarget: t })}
                className={`py-2 px-3 text-[10px] font-black uppercase transition-all flex items-center justify-center gap-1.5 border-2 ${
                  participant.qrTarget === t
                    ? 'border-[#FF007A] bg-[#FF007A] text-white shadow-[2px_2px_0px_#FFE500]'
                    : 'border-[#FFE500] bg-transparent text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Hacker Metadata */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-mono-tech font-black text-[#FF007A] uppercase tracking-widest italic border-b border-[#FFE500]/30 pb-1">
          HACKER METADATA
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1">
              <Users className="w-3 h-3 text-[#FF007A]" /> Team Name
            </label>
            <input
              type="text"
              value={participant.teamName || ''}
              onChange={(e) => onChange({ teamName: e.target.value })}
              placeholder="e.g. 2:47 PM Studio"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-xs text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1">
              <Cpu className="w-3 h-3 text-[#FF007A]" /> Tech Stack
            </label>
            <input
              type="text"
              value={participant.favoriteTech || ''}
              onChange={(e) => onChange({ favoriteTech: e.target.value })}
              placeholder="e.g. Gemini / Rust"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-xs text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase opacity-80 text-[#FFE500] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF007A]" /> Project
            </label>
            <input
              type="text"
              value={participant.currentlyBuilding || ''}
              onChange={(e) => onChange({ currentlyBuilding: e.target.value })}
              placeholder="e.g. Autonomous AI Agents"
              className="bg-transparent border border-[#FFE500] px-3 py-2 text-xs text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Hacker ID Controls */}
      <div className="pt-2 flex items-center justify-between bg-[#004D2C] p-3 border-2 border-[#FFE500]">
        <div>
          <span className="text-[9px] font-mono-tech font-bold uppercase text-[#FFE500]/70 block">
            Participant ID
          </span>
          <span className="text-base font-mono-tech font-black text-[#FFE500]">
            {participant.hackerId}
          </span>
        </div>
        <button
          type="button"
          onClick={handleRerollId}
          className="px-3 py-1.5 bg-[#FF007A] border-2 border-[#FFE500] text-white font-mono-tech text-xs font-black uppercase hover:bg-[#FFE500] hover:text-[#004D2C] transition-colors flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reroll ID
        </button>
      </div>
    </div>
  );
};
