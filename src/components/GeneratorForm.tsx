import React from 'react';
import { ParticipantData, QRTarget, SquadMember, FrameStyleId } from '../types/participant';
import { ImageUploader } from './ImageUploader';
import { FrameSelector } from './FrameSelector';
import { User, AtSign, Briefcase, Quote, MapPin, Github, Linkedin, Globe, Users, Cpu, RefreshCw, QrCode, Sparkles, Plus, Trash2 } from 'lucide-react';
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
  onSelectFrame,
}) => {
  const handleRerollId = () => {
    const newId = rerollHackerId(participant.name || 'HACKER');
    onChange({ hackerId: newId });
  };

  const handleSquadMemberChange = (index: number, updatedMember: Partial<SquadMember>) => {
    const currentMembers = participant.squadMembers || [];
    const updated = currentMembers.map((m, i) => (i === index ? { ...m, ...updatedMember } : m));
    onChange({ squadMembers: updated });
  };

  const handleAddSquadMember = () => {
    const currentMembers = participant.squadMembers || [];
    if (currentMembers.length >= 3) return;
    const count = currentMembers.length + 1;
    const newMember: SquadMember = {
      id: 'mem_' + Date.now(),
      name: `Builder ${count}`,
      handle: `@builder${count}`,
      role: 'HH Goa Builder',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    };
    onChange({ squadMembers: [...currentMembers, newMember] });
  };

  const handleRemoveSquadMember = (index: number) => {
    const currentMembers = participant.squadMembers || [];
    if (currentMembers.length <= 1) return;
    const updated = currentMembers.filter((_, i) => i !== index);
    onChange({ squadMembers: updated });
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

      {/* Format Selection (Format A vs Format B) */}
      <div className="space-y-2">
        <label className="text-xs font-mono-tech font-bold text-[#FFE500] uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF007A]" /> Graphic Format
          </span>
          <span className="text-[10px] text-[#FFF5C7]/70 font-normal">Choose Graphic Layout</span>
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#004D2C] border border-[#FFE500]">
          <button
            type="button"
            onClick={() => onChange({ graphicFormat: 'pfp' })}
            className={`py-2 px-3 text-xs font-mono-tech font-bold uppercase transition-colors flex items-center justify-center gap-1.5 ${
              participant.graphicFormat === 'pfp'
                ? 'bg-[#FF007A] text-white shadow-[2px_2px_0px_#FFE500]'
                : 'text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]'
            }`}
          >
            <span>Format A: PFP Frame</span>
          </button>
          <button
            type="button"
            onClick={() => onChange({ graphicFormat: 'card' })}
            className={`py-2 px-3 text-xs font-mono-tech font-bold uppercase transition-colors flex items-center justify-center gap-1.5 ${
              participant.graphicFormat !== 'pfp'
                ? 'bg-[#FF007A] text-white shadow-[2px_2px_0px_#FFE500]'
                : 'text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]'
            }`}
          >
            <span>Format B: Builder ID Card</span>
          </button>
        </div>
      </div>

      {/* Pass Type Selection (Solo vs Squad) */}
      <div className="space-y-2">
        <label className="text-xs font-mono-tech font-bold text-[#FFE500] uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#FF007A]" /> Pass Category
          </span>
          <span className="text-[10px] text-[#FFF5C7]/70 font-normal">Solo vs Squad Pass</span>
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#004D2C] border border-[#FFE500]">
          <button
            type="button"
            onClick={() => onChange({ passType: 'solo' })}
            className={`py-2 px-3 text-xs font-mono-tech font-bold uppercase transition-colors flex items-center justify-center gap-1.5 ${
              participant.passType !== 'squad'
                ? 'bg-[#00FF66] text-[#003820] shadow-[2px_2px_0px_#FF007A]'
                : 'text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Solo Pass (1 Person)</span>
          </button>
          <button
            type="button"
            onClick={() => onChange({ passType: 'squad' })}
            className={`py-2 px-3 text-xs font-mono-tech font-bold uppercase transition-colors flex items-center justify-center gap-1.5 ${
              participant.passType === 'squad'
                ? 'bg-[#00FF66] text-[#003820] shadow-[2px_2px_0px_#FF007A]'
                : 'text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Squad Pass (Max 3)</span>
          </button>
        </div>
      </div>

      {/* Frame Selector (Show in Card mode or both, when not in Squad mode or with Squad mode) */}
      {participant.graphicFormat !== 'pfp' && participant.passType !== 'squad' && (
        <FrameSelector
          selectedFrameId={selectedFrameId}
          onSelectFrame={onSelectFrame}
        />
      )}

      {/* Squad Pass Controls (When Squad Mode is active) */}
      {participant.passType === 'squad' && (
        <div className="bg-[#004D2C] p-4 border-2 border-[#FFE500] space-y-4 rounded shadow-[3px_3px_0px_#000]">
          <div className="border-b border-[#FFE500]/30 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-mono-tech font-black text-[#FFE500] uppercase tracking-widest flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#FF007A]" /> SQUAD DETAILS & TEAM MEMBERS (MAX 3)
            </h3>
            <span className="text-[10px] font-mono-tech font-bold bg-[#FF007A] text-white px-2 py-0.5 rounded uppercase">
              SQUAD MODE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Squad Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase text-[#FFE500]">
                Squad / Team Name
              </label>
              <input
                type="text"
                value={participant.squadName || ''}
                onChange={(e) => onChange({ squadName: e.target.value })}
                placeholder="e.g. CyberGoa Hackers"
                className="bg-[#092F24] border border-[#FFE500] px-3 py-2 text-xs text-[#FFE500] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
              />
            </div>

            {/* Squad ID */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase text-[#FFE500] flex items-center justify-between">
                <span>Squad ID Tag</span>
                <button
                  type="button"
                  onClick={() => onChange({ squadId: 'SQD-GOA-' + Math.floor(100 + Math.random() * 900) })}
                  className="text-[9px] text-[#FF007A] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> Reroll ID
                </button>
              </label>
              <input
                type="text"
                value={participant.squadId || 'SQD-GOA-709'}
                onChange={(e) => onChange({ squadId: e.target.value })}
                placeholder="SQD-GOA-709"
                className="bg-[#092F24] border border-[#FFE500] px-3 py-2 text-xs font-mono font-bold text-[#00FF66] focus:bg-[#FFE500] focus:text-[#004D2C] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Squad Members List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-[#FFE500]/20 pb-1.5">
              <span className="text-[11px] font-mono-tech font-bold text-[#FFE500] uppercase">
                SQUAD MEMBERS ({(participant.squadMembers || []).length}/3 MAX)
              </span>
              {(participant.squadMembers || []).length < 3 && (
                <button
                  type="button"
                  onClick={handleAddSquadMember}
                  className="bg-[#FFE500] text-[#004D2C] font-mono-tech font-black text-[10px] px-2.5 py-1 rounded hover:bg-[#FF007A] hover:text-white transition-colors shadow-[2px_2px_0px_#000] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Member
                </button>
              )}
            </div>

            {(participant.squadMembers || []).map((member, idx) => (
              <div key={member.id || idx} className="bg-[#092F24] border border-[#FFE500]/60 p-3 rounded space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#FFE500]/20 pb-1.5">
                  <span className="text-[11px] font-mono-tech font-bold text-[#FF007A] flex items-center gap-1">
                    <span>MEMBER 0{idx + 1}</span>
                    {idx === 0 && <span className="text-[9px] bg-[#00FF66] text-[#003820] px-1.5 py-0.2 rounded font-mono font-bold uppercase">CAPTAIN</span>}
                  </span>
                  {(participant.squadMembers || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSquadMember(idx)}
                      className="text-[10px] text-red-400 hover:text-red-200 font-mono font-bold uppercase flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[9px] font-mono text-[#FFF5C7]/70 block mb-0.5">NAME</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleSquadMemberChange(idx, { name: e.target.value })}
                      placeholder="Member Name"
                      className="w-full bg-[#003820] border border-[#FFE500]/40 px-2.5 py-1 text-xs text-[#FFE500]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#FFF5C7]/70 block mb-0.5">HANDLE</label>
                    <input
                      type="text"
                      value={member.handle}
                      onChange={(e) => handleSquadMemberChange(idx, { handle: e.target.value })}
                      placeholder="@handle"
                      className="w-full bg-[#003820] border border-[#FFE500]/40 px-2.5 py-1 text-xs text-[#FFE500] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#FFF5C7]/70 block mb-0.5">ROLE / STACK</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleSquadMemberChange(idx, { role: e.target.value })}
                      placeholder="e.g. Lead Dev"
                      className="w-full bg-[#003820] border border-[#FFE500]/40 px-2.5 py-1 text-xs text-[#FFE500]"
                    />
                  </div>
                </div>

                {/* Member Photo Uploader */}
                <div className="pt-1">
                  <label className="text-[9px] font-mono text-[#FFF5C7]/80 uppercase block mb-1">
                    Member Photo
                  </label>
                  <ImageUploader
                    image={member.profileImage}
                    onImageChange={(img) => handleSquadMemberChange(idx, { profileImage: img })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Image Uploader */}
      <div className="space-y-3">
        <ImageUploader
          image={participant.profileImage}
          onImageChange={(img) => onChange({ profileImage: img })}
        />

        {/* Photo Crop/Fit Controls (Zoom & Shift) */}
        {participant.profileImage && (
          <div className="bg-[#004D2C] p-3 border border-[#FFE500]/50 space-y-2.5 text-xs font-mono-tech">
            <div className="flex items-center justify-between text-[#FFE500] font-bold border-b border-[#FFE500]/20 pb-1.5">
              <span>PHOTO ADJUSTMENT & CROP FIT</span>
              <button
                type="button"
                onClick={() => onChange({ photoZoom: 100, photoOffsetX: 0, photoOffsetY: 0 })}
                className="text-[10px] text-[#FF007A] hover:underline uppercase font-bold"
              >
                Reset Position
              </button>
            </div>

            {/* Drag helper hint requested by user */}
            <div className="bg-[#092F24] border border-[#FFE500]/40 p-2 rounded text-[#FFE500] text-[11px] font-sans-ui flex items-center justify-between">
              <span>💡 Drag inside the circle to position your photo.</span>
              <span className="text-[10px] font-mono-tech text-[#00FF66] font-bold uppercase">Interactive</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {/* Zoom Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#FFF5C7]">
                  <span>ZOOM ({participant.photoZoom || 100}%)</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={250}
                  step={5}
                  value={participant.photoZoom || 100}
                  onChange={(e) => onChange({ photoZoom: Number(e.target.value) })}
                  className="w-full accent-[#FFE500] cursor-pointer"
                />
              </div>

              {/* Horizontal Shift Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#FFF5C7]">
                  <span>HORIZ SHIFT ({participant.photoOffsetX || 0}px)</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={2}
                  value={participant.photoOffsetX || 0}
                  onChange={(e) => onChange({ photoOffsetX: Number(e.target.value) })}
                  className="w-full accent-[#00FF66] cursor-pointer"
                />
              </div>

              {/* Vertical Shift Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#FFF5C7]">
                  <span>VERT SHIFT ({participant.photoOffsetY || 0}px)</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={2}
                  value={participant.photoOffsetY || 0}
                  onChange={(e) => onChange({ photoOffsetY: Number(e.target.value) })}
                  className="w-full accent-[#FF007A] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>

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
