import React, { forwardRef } from 'react';
import { ParticipantData, FrameStyleId, AspectRatioMode, OrganizerConfig } from '../types/participant';
import { QRGenerator } from './QRGenerator';
import { Sparkles, MapPin, Code2, Users, Cpu, ShieldCheck, Terminal, Flame, Zap } from 'lucide-react';

interface IDCardPreviewProps {
  participant: ParticipantData;
  frameStyle: FrameStyleId;
  organizerConfig: OrganizerConfig;
  aspectRatio?: AspectRatioMode;
}

export const IDCardPreview = forwardRef<HTMLDivElement, IDCardPreviewProps>(
  ({ participant, frameStyle, organizerConfig, aspectRatio = 'standard' }, ref) => {
    const avatarImage =
      participant.profileImage ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';

    // Outer aspect ratio styling
    const getCardDimensions = () => {
      switch (aspectRatio) {
        case 'story':
          return 'w-[360px] h-[640px]'; // 9:16
        case 'square':
          return 'w-[440px] h-[440px]'; // 1:1
        case 'standard':
        default:
          return 'w-[440px] min-h-[620px]'; // Standard event badge
      }
    };

    /* =========================================================================
       1. CLASSIC GOA FRAME
       Informed directly by the official poster:
       Deep emerald green background, intricate yellow/pink lotus/paisley arch frame,
       yellow dotted border, "HACKER HOUSE" elongated serif typography with hot pink "गोवा" badge.
       ========================================================================= */
    const renderClassicGoa = () => (
      <div
        className="relative w-full h-full bg-[#006B3C] text-[#FFF5C7] p-5 flex flex-col justify-between overflow-hidden font-sans-ui bg-print-texture select-none"
        style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)' }}
      >
        {/* Outer Yellow Dotted Border */}
        <div className="absolute inset-2.5 border-2 border-dotted border-[#FFE500] rounded-sm pointer-events-none z-10" />
        <div className="absolute inset-3 border border-[#FFE500]/40 rounded-sm pointer-events-none z-10" />

        {/* Decorative Corner Ornaments (Indian Vintage Arch Motif) */}
        <svg className="absolute top-3 left-3 w-8 h-8 text-[#FFE500] z-20" viewBox="0 0 40 40">
          <path d="M0,0 L18,0 C12,6 6,12 0,18 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FF007A" />
        </svg>
        <svg className="absolute top-3 right-3 w-8 h-8 text-[#FFE500] z-20 transform rotate-90" viewBox="0 0 40 40">
          <path d="M0,0 L18,0 C12,6 6,12 0,18 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FF007A" />
        </svg>
        <svg className="absolute bottom-3 left-3 w-8 h-8 text-[#FFE500] z-20 transform -rotate-90" viewBox="0 0 40 40">
          <path d="M0,0 L18,0 C12,6 6,12 0,18 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FF007A" />
        </svg>
        <svg className="absolute bottom-3 right-3 w-8 h-8 text-[#FFE500] z-20 transform rotate-180" viewBox="0 0 40 40">
          <path d="M0,0 L18,0 C12,6 6,12 0,18 Z" fill="currentColor" />
          <circle cx="8" cy="8" r="2" fill="#FF007A" />
        </svg>

        {/* Header Branding Block */}
        <div className="text-center pt-2 relative z-20">
          <div className="flex items-center justify-between text-[10px] font-mono-tech font-bold text-[#FFE500] px-2 mb-1">
            <span>{organizerConfig.studioName}</span>
            <span className="bg-[#FF007A] text-white px-2 py-0.5 rounded-full uppercase text-[9px] font-extrabold tracking-wider shadow-sm">
              OFFICIAL PASS
            </span>
            <span>{organizerConfig.eventLocation}</span>
          </div>

          {/* HACKER HOUSE + Devanagari "गोवा" Overlay */}
          <div className="relative my-1 inline-block w-full">
            <h1 className="text-3xl sm:text-4xl font-serif-display font-black tracking-tight text-[#FFE500] uppercase leading-none drop-shadow-[2px_2px_0px_#000]">
              HACKER HOUSE
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-2xl sm:text-3xl font-devanagari font-black text-[#FF007A] bg-[#FFE500] text-stroke-pink px-3 py-0.5 rounded-full transform -rotate-6 shadow-[3px_3px_0px_#000] border-2 border-[#FF007A] leading-none">
                {organizerConfig.eventSubName}
              </span>
            </div>
          </div>

          <p className="text-[10px] font-mono-tech font-bold text-[#FFF5C7] tracking-widest uppercase mt-2">
            {organizerConfig.eventDates}
          </p>
        </div>

        {/* Center Section: Photo + Main Participant Info */}
        <div className="my-3 relative z-20 flex flex-col items-center">
          {/* Profile Picture with Ornamental Arch Frame */}
          <div className="relative p-1.5 bg-[#092F24] border-2 border-[#FFE500] rounded-xl shadow-[4px_4px_0px_#FF007A] mb-3">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-[#FFE500]/60 relative">
              <img
                src={avatarImage}
                alt={participant.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stamp Overlay */}
            <div className="absolute -bottom-2 -right-3 bg-[#FF007A] text-[#FFE500] font-mono-tech text-[9px] font-black px-2 py-0.5 rounded border border-[#FFE500] transform rotate-6 shadow-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED
            </div>
          </div>

          {/* Participant Info */}
          <div className="text-center w-full px-2">
            <h2 className="text-2xl font-serif-display font-black text-[#FFE500] leading-tight tracking-wide drop-shadow-sm">
              {participant.name || 'Your Name Here'}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-xs font-mono-tech font-bold text-[#FF007A] bg-[#FFE500] px-2 py-0.5 rounded shadow-sm">
                {participant.handle || '@builder'}
              </span>
              <span className="text-xs font-mono-tech text-[#FFF5C7] bg-[#092F24] px-2 py-0.5 rounded border border-[#FFE500]/30">
                {participant.role || 'Hacker / Builder'}
              </span>
            </div>

            <p className="text-xs font-sans-ui italic text-[#FFF5C7]/90 mt-2 max-w-xs mx-auto line-clamp-2 bg-[#092F24]/60 p-1.5 rounded border border-[#FFE500]/20">
              "{participant.tagline || organizerConfig.defaultTagline}"
            </p>

            {/* Extra Metadata Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-[10px] font-mono-tech text-[#FFF5C7]">
              {participant.location && (
                <span className="flex items-center gap-1 bg-[#092F24] px-2 py-0.5 rounded border border-[#FFE500]/20">
                  <MapPin className="w-3 h-3 text-[#FF007A]" />
                  {participant.location}
                </span>
              )}
              {participant.teamName && (
                <span className="flex items-center gap-1 bg-[#092F24] px-2 py-0.5 rounded border border-[#FFE500]/20 text-[#FFE500]">
                  <Users className="w-3 h-3 text-[#00FF66]" />
                  {participant.teamName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section: Hacker ID + QR Code */}
        <div className="pt-2 border-t-2 border-dashed border-[#FFE500]/40 flex items-center justify-between relative z-20 bg-[#092F24]/70 p-2.5 rounded-lg border border-[#FFE500]/30">
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono-tech text-[#FFF5C7]/70 uppercase tracking-widest">
              PASS IDENTIFIER
            </span>
            <span className="text-sm font-mono-tech font-black text-[#FFE500] tracking-wider my-0.5">
              {participant.hackerId}
            </span>
            <span className="text-[10px] font-mono-tech text-[#00FF66] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              STATUS: CONFIRMED
            </span>
          </div>

          <QRGenerator
            github={participant.github}
            portfolio={participant.portfolio}
            linkedin={participant.linkedin}
            target={participant.qrTarget}
            accentColor="#FFE500"
            size={68}
          />
        </div>
      </div>
    );

    /* =========================================================================
       2. HACKER MODE FRAME
       Cyber / Matrix / Terminal style:
       Deep obsidian-green `#031811`, glowing neon lime `#00FF66`, monospace layout,
       brackets `<HH26>`, scanlines, LED indicators, circuitry corner geometry.
       ========================================================================= */
    const renderHackerMode = () => (
      <div className="relative w-full h-full bg-[#031811] text-[#00FF66] p-5 flex flex-col justify-between overflow-hidden font-mono-tech border-2 border-[#00FF66] rounded-sm shadow-[0_0_20px_rgba(0,255,102,0.2)]">
        {/* Terminal Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />

        {/* Header */}
        <div className="relative z-20 border-b border-[#00FF66]/40 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00FF66]" />
            <span className="text-xs font-bold tracking-widest text-[#00FF66]">
              &lt;HH26_TERMINAL&gt;
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
            <span className="text-[#FFE500] uppercase font-bold">SYSTEM_ONLINE</span>
          </div>
        </div>

        {/* Content */}
        <div className="my-4 relative z-20 flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded border-2 border-[#00FF66] p-1 bg-[#000] relative shadow-[0_0_15px_rgba(0,255,102,0.3)]">
              <img src={avatarImage} alt={participant.name} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all" />
              {/* Corner tech ticks */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FFE500]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#FFE500]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#FFE500]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FFE500]" />
            </div>
            <div className="mt-1 text-center text-[10px] text-[#FFE500]">
              [IMG_HASH_OK]
            </div>
          </div>

          <div className="text-center w-full space-y-1">
            <div className="text-[10px] text-[#00FF66]/70 uppercase">BUILDER_NAME:</div>
            <h2 className="text-2xl font-black text-[#FFE500] tracking-tight uppercase">
              {participant.name || 'ANONYMOUS_HACKER'}
            </h2>
            <div className="text-xs text-[#00FF66] font-bold">
              {participant.handle} • {participant.role}
            </div>

            <p className="text-xs text-[#FFF5C7]/90 bg-[#000]/60 p-2 rounded border border-[#00FF66]/30 max-w-xs mx-auto mt-2">
              // {participant.tagline || organizerConfig.defaultTagline}
            </p>

            {participant.favoriteTech && (
              <div className="text-[10px] text-[#FF007A] bg-[#FF007A]/10 border border-[#FF007A]/40 px-2 py-0.5 rounded inline-block mt-2 font-bold">
                STACK: {participant.favoriteTech}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20 pt-2 border-t border-[#00FF66]/40 flex items-center justify-between bg-[#000]/80 p-2 rounded">
          <div>
            <div className="text-[9px] text-[#00FF66]/70 uppercase">SYS_UID</div>
            <div className="text-sm font-black text-[#FFE500]">{participant.hackerId}</div>
            <div className="text-[9px] text-[#FFF5C7]/60">LOC: {participant.location || 'GOA_HUB'}</div>
          </div>

          <QRGenerator
            github={participant.github}
            portfolio={participant.portfolio}
            linkedin={participant.linkedin}
            target={participant.qrTarget}
            accentColor="#00FF66"
            size={64}
          />
        </div>
      </div>
    );

    /* =========================================================================
       3. DESI CYBER FRAME
       Rangoli / Mandala line art meets neon pink & yellow cyberpunk wireframe.
       Intricate Indian geometry + holographic badge overlays.
       ========================================================================= */
    const renderDesiCyber = () => (
      <div className="relative w-full h-full bg-[#07241B] text-[#FFE500] p-5 flex flex-col justify-between overflow-hidden font-sans-ui border-2 border-[#FF007A] rounded-xl shadow-[6px_6px_0px_#FFE500]">
        {/* Background Mandala / Rangoli SVG Line Art */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none text-[#FFE500]" viewBox="0 0 400 600" fill="none">
          <circle cx="200" cy="300" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="300" r="120" stroke="#FF007A" strokeWidth="1.5" />
          <polygon points="200,100 350,300 200,500 50,300" stroke="currentColor" strokeWidth="1" />
          <polygon points="200,120 330,300 200,480 70,300" stroke="#FF007A" strokeWidth="1" />
        </svg>

        {/* Top Cyber Badge */}
        <div className="relative z-20 flex items-center justify-between border-b-2 border-[#FF007A] pb-2">
          <span className="text-xs font-mono-tech font-black text-[#FF007A] bg-[#FFE500] px-2 py-0.5 rounded shadow-[2px_2px_0px_#000]">
            DESI CYBER '26
          </span>
          <span className="text-xs font-serif-display font-bold text-[#FFE500]">
            HACKER HOUSE GOA
          </span>
        </div>

        {/* Profile Card */}
        <div className="my-3 relative z-20 flex flex-col items-center">
          <div className="relative p-2 bg-[#092F24] border-2 border-[#FFE500] rounded-2xl shadow-[4px_4px_0px_#FF007A] mb-3">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden">
              <img src={avatarImage} alt={participant.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-3 -left-3 bg-[#FFE500] text-[#092F24] text-[10px] font-mono-tech font-extrabold px-2 py-0.5 rounded border border-[#FF007A]">
              GOA 2026
            </div>
          </div>

          <h2 className="text-2xl font-serif-display font-black text-[#FFE500] tracking-wide text-center">
            {participant.name || 'Hacker Name'}
          </h2>
          <div className="text-xs font-mono-tech text-[#FF007A] font-bold my-1">
            {participant.handle} • {participant.role}
          </div>

          <p className="text-xs text-[#FFF5C7] text-center bg-[#092F24]/80 p-2 rounded-lg border border-[#FF007A]/40 max-w-xs mt-1">
            {participant.tagline || organizerConfig.defaultTagline}
          </p>

          {participant.currentlyBuilding && (
            <div className="text-[10px] font-mono-tech text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/40 px-2 py-1 rounded-md mt-2 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#FFE500]" /> BUILDING: {participant.currentlyBuilding}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-20 pt-2 border-t-2 border-[#FFE500] flex items-center justify-between bg-[#092F24] p-2.5 rounded-lg">
          <div>
            <div className="text-[9px] font-mono-tech text-[#FF007A] font-bold">CYBER ID PASS</div>
            <div className="text-sm font-mono-tech font-black text-[#FFE500]">{participant.hackerId}</div>
            <div className="text-[10px] font-mono-tech text-[#FFF5C7]/80">{participant.location}</div>
          </div>

          <QRGenerator
            github={participant.github}
            portfolio={participant.portfolio}
            linkedin={participant.linkedin}
            target={participant.qrTarget}
            accentColor="#FF007A"
            size={68}
          />
        </div>
      </div>
    );

    /* =========================================================================
       4. MINIMAL FRAME
       Clean, spacious, ultra-refined serif card with gold foil dotted frame & subtle emblem.
       ========================================================================= */
    const renderMinimal = () => (
      <div className="relative w-full h-full bg-[#0B3A2C] text-[#FFF5C7] p-6 flex flex-col justify-between overflow-hidden font-sans-ui border border-[#FFE500]/40 rounded-xl shadow-xl">
        <div className="absolute inset-3 border border-dotted border-[#FFE500]/60 rounded-lg pointer-events-none z-10" />

        {/* Top Header */}
        <div className="flex items-center justify-between relative z-20">
          <div>
            <h1 className="text-xs font-cinzel font-bold text-[#FFE500] tracking-widest uppercase">
              HACKER HOUSE GOA
            </h1>
            <p className="text-[10px] font-mono-tech text-[#FFF5C7]/70">2026 EDITION</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono-tech font-bold text-[#FF007A] bg-[#FFE500] px-2 py-0.5 rounded">
              PASS
            </span>
          </div>
        </div>

        {/* Center Profile */}
        <div className="my-4 relative z-20 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#FFE500] shadow-md p-1 bg-[#092F24] mb-3">
            <img src={avatarImage} alt={participant.name} className="w-full h-full object-cover rounded-full" />
          </div>

          <h2 className="text-2xl font-serif-display font-bold text-[#FFE500]">
            {participant.name || 'Participant Name'}
          </h2>
          <p className="text-xs font-mono-tech text-[#FF007A] font-semibold mt-0.5">
            {participant.handle} — {participant.role}
          </p>

          <p className="text-xs font-sans-ui text-[#FFF5C7]/90 max-w-xs mt-3 leading-relaxed">
            "{participant.tagline || organizerConfig.defaultTagline}"
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-20 flex items-center justify-between border-t border-[#FFE500]/30 pt-3">
          <div>
            <div className="text-[9px] font-mono-tech text-[#FFF5C7]/60 uppercase">PASS ID</div>
            <div className="text-xs font-mono-tech font-bold text-[#FFE500]">{participant.hackerId}</div>
          </div>

          <QRGenerator
            github={participant.github}
            portfolio={participant.portfolio}
            linkedin={participant.linkedin}
            target={participant.qrTarget}
            accentColor="#FFE500"
            size={60}
          />
        </div>
      </div>
    );

    /* =========================================================================
       5. CHAOS MODE FRAME
       Playful experimental poster collage with sticker badges, tilted photo,
       stamps ("SHIP IT", "GOA MODE ENABLED", "100X BUILDER"), tape graphics!
       ========================================================================= */
    const renderChaosMode = () => (
      <div className="relative w-full h-full bg-[#004225] text-[#FFE500] p-5 flex flex-col justify-between overflow-hidden font-sans-ui border-4 border-[#FFE500] rounded-sm shadow-[8px_8px_0px_#FF007A]">
        {/* Background diagonal warning tape */}
        <div className="absolute -top-12 -right-12 w-48 h-8 bg-[#FFE500] text-[#092F24] font-mono-tech font-black text-[10px] flex items-center justify-center transform rotate-45 border border-[#000] z-10 uppercase tracking-widest shadow-md">
          GOA MODE ENABLED
        </div>

        {/* Sticker Badges */}
        <div className="absolute top-2 left-2 bg-[#FF007A] text-white text-[9px] font-mono-tech font-black px-2 py-0.5 rounded border border-[#000] transform -rotate-12 z-20 shadow-[2px_2px_0px_#000]">
          🔥 100X BUILDER
        </div>

        {/* Header */}
        <div className="relative z-20 pt-3 text-center">
          <div className="text-xs font-mono-tech font-bold text-[#FFE500] tracking-widest">
            HACKER HOUSE GOA '26
          </div>
          <div className="text-2xl font-serif-display font-black text-[#FF007A] bg-[#FFE500] px-3 py-1 inline-block rounded transform rotate-1 shadow-[3px_3px_0px_#000] border-2 border-[#000] my-1">
            OFFICIAL ID CARD
          </div>
        </div>

        {/* Tilted Photo Collage */}
        <div className="my-2 relative z-20 flex flex-col items-center">
          <div className="relative bg-[#FFF5C7] p-2 rounded shadow-[5px_5px_0px_#000] transform -rotate-3 border-2 border-[#000]">
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#000] overflow-hidden border border-[#000]">
              <img src={avatarImage} alt={participant.name} className="w-full h-full object-cover" />
            </div>
            {/* Fake Washi Tape */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#FFE500]/80 border border-[#000]/30 rotate-3" />
            <div className="text-center font-mono-tech font-bold text-[10px] text-[#092F24] mt-1">
              {participant.handle || '@hacker'}
            </div>
          </div>

          <div className="mt-3 text-center">
            <h2 className="text-2xl font-serif-display font-black text-[#FFE500] drop-shadow-[2px_2px_0px_#000]">
              {participant.name || 'Hacker Name'}
            </h2>
            <div className="inline-block bg-[#FF007A] text-white text-xs font-mono-tech font-bold px-2 py-0.5 rounded border border-[#000] shadow-[2px_2px_0px_#000] my-1">
              {participant.role}
            </div>
            <p className="text-xs font-sans-ui text-[#FFF5C7] bg-[#092F24] p-1.5 rounded border border-[#FFE500] max-w-xs mx-auto mt-1 font-semibold">
              "{participant.tagline || organizerConfig.defaultTagline}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20 pt-2 border-t-2 border-[#FFE500] flex items-center justify-between bg-[#092F24] p-2 rounded border border-[#FFE500]">
          <div>
            <div className="text-[9px] font-mono-tech text-[#FF007A] font-black">HACKER IDENTIFIER</div>
            <div className="text-sm font-mono-tech font-black text-[#FFE500]">{participant.hackerId}</div>
          </div>

          <QRGenerator
            github={participant.github}
            portfolio={participant.portfolio}
            linkedin={participant.linkedin}
            target={participant.qrTarget}
            accentColor="#FFE500"
            size={64}
          />
        </div>
      </div>
    );

    const renderCardByStyle = () => {
      switch (frameStyle) {
        case 'hacker-mode':
          return renderHackerMode();
        case 'desi-cyber':
          return renderDesiCyber();
        case 'minimal':
          return renderMinimal();
        case 'chaos-mode':
          return renderChaosMode();
        case 'classic-goa':
        default:
          return renderClassicGoa();
      }
    };

    return (
      <div
        ref={ref}
        id="hhgoa-id-card-element"
        className={`relative ${getCardDimensions()} transition-all duration-300 mx-auto select-none`}
      >
        {renderCardByStyle()}
      </div>
    );
  }
);

IDCardPreview.displayName = 'IDCardPreview';
