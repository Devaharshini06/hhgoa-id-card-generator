import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { IDCardPreview } from './components/IDCardPreview';
import { SharePanel } from './components/SharePanel';
import { HeroSection } from './components/HeroSection';
import { OrganizerModal } from './components/OrganizerModal';
import { NoticeBoardModal } from './components/NoticeBoardModal';
import { DecorativeBackground } from './components/DecorativeBackground';
import { ParticipantData, FrameStyleId, OrganizerConfig, AspectRatioMode } from './types/participant';
import { DEFAULT_ORGANIZER_CONFIG } from './data/frameStyles';
import { exportCardAsPng, copyCardToClipboard } from './utils/exportCard';
import { generateHackerId } from './utils/generateHackerId';
import { Sparkles, Maximize2, ZoomIn, ZoomOut, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';

const DEFAULT_PARTICIPANT: ParticipantData = {
  name: 'Alex Rivera',
  handle: '@alexrivera',
  role: 'AI Engineer / Builder',
  tagline: 'Building AI systems that actually do things.',
  location: 'Goa, India',
  github: 'https://github.com/alexrivera',
  linkedin: 'https://linkedin.com/in/alexrivera',
  portfolio: 'https://alexrivera.dev',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  teamName: '2:47 PM Studio',
  favoriteTech: 'Gemini / React',
  currentlyBuilding: 'Autonomous AI Agents',
  hackerId: 'HH26-ALE-88F1',
  qrTarget: 'portfolio',
  passType: 'solo',
  squadName: 'CyberGoa Hackers',
  squadId: 'SQD-GOA-709',
  squadMembers: [
    {
      id: 'mem_1',
      name: 'Alex Rivera',
      handle: '@alexrivera',
      role: 'Lead Dev',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'mem_2',
      name: 'Priya Sharma',
      handle: '@priyacodes',
      role: 'AI Architect',
      profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'mem_3',
      name: 'Rohan Verma',
      handle: '@rohanv',
      role: 'Full Stack',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'frames' | 'about'>('generator');
  const [participant, setParticipant] = useState<ParticipantData>(DEFAULT_PARTICIPANT);
  const [selectedFrameId, setSelectedFrameId] = useState<FrameStyleId>('classic-goa');
  const [organizerConfig, setOrganizerConfig] = useState<OrganizerConfig>(DEFAULT_ORGANIZER_CONFIG);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioMode>('standard');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState<boolean>(false);
  const [isNoticeBoardOpen, setIsNoticeBoardOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleParticipantChange = (updatedFields: Partial<ParticipantData>) => {
    setParticipant((prev) => {
      const next = { ...prev, ...updatedFields };
      // Auto regenerate hacker ID if name or handle changed and hacker ID was default
      if ((updatedFields.name || updatedFields.handle) && !updatedFields.hackerId) {
        next.hackerId = generateHackerId(next.name, next.handle);
      }
      return next;
    });
  };

  const handleDownloadPng = async (highRes: boolean) => {
    if (!cardRef.current) return;
    showToast('Generating high-resolution PNG pass...');
    const success = await exportCardAsPng(
      cardRef.current,
      `HHGoa26_${participant.handle.replace('@', '') || 'Hacker'}_ID.png`,
      highRes
    );
    if (success) {
      showToast('HHGoa ID Card downloaded successfully! 🌴');
    } else {
      showToast('Export failed. Please try again or copy screenshot.');
    }
  };

  const handleCopyCard = async () => {
    if (!cardRef.current) return;
    const success = await copyCardToClipboard(cardRef.current);
    if (success) {
      showToast('ID card image copied to clipboard!');
    } else {
      showToast('Clipboard copy not supported in browser.');
    }
  };

  const handleReset = () => {
    setParticipant({
      ...DEFAULT_PARTICIPANT,
      hackerId: generateHackerId(DEFAULT_PARTICIPANT.name, DEFAULT_PARTICIPANT.handle),
    });
    setSelectedFrameId('classic-goa');
    showToast('Reset to default HHGoa demo profile!');
  };

  return (
    <div className="min-h-screen bg-[#004D2C] text-[#FFE500] font-sans flex flex-col relative border-[8px] sm:border-[12px] border-[#FFE500] selection:bg-[#FF007A] selection:text-white">
      {/* Background Radial Dots Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFE500 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOrganizer={() => setIsOrganizerModalOpen(true)}
        onOpenNoticeBoard={() => setIsNoticeBoardOpen(true)}
        organizerConfig={organizerConfig}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 relative z-10 flex flex-col">
        {/* Landing Hero Section */}
        {activeTab === 'frames' && (
          <HeroSection
            onCreateClick={() => setActiveTab('generator')}
            onExploreFramesClick={() => setActiveTab('frames')}
            onSelectFrame={(f) => {
              setSelectedFrameId(f);
              setActiveTab('generator');
            }}
          />
        )}

        {/* Generator Workspace (Two Panel Layout) */}
        {activeTab === 'generator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
            {/* Top Workspace Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#003820] p-3 border-2 border-[#FFE500] shadow-[4px_4px_0px_#FF007A]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF007A] animate-pulse" />
                <span className="text-xs font-mono-tech font-black text-[#FFE500] uppercase tracking-wider">
                  BUILDER DETECTED: {participant.name || 'ANONYMOUS HACKER'}
                </span>
              </div>

              {/* Aspect Ratio Mode Toggles */}
              <div className="flex items-center gap-1 bg-[#004D2C] p-1 border border-[#FFE500]">
                <span className="text-[10px] font-mono-tech font-bold text-[#FFE500] px-2 uppercase hidden sm:inline">
                  Card Aspect:
                </span>
                {(['standard', 'story', 'square'] as AspectRatioMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setAspectRatio(mode)}
                    className={`px-2.5 py-1 text-[10px] font-mono-tech font-black uppercase transition-all ${
                      aspectRatio === mode
                        ? 'bg-[#FF007A] text-white shadow-[2px_2px_0px_#FFE500]'
                        : 'text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Column Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: Customization Controls (Form) */}
              <div className="lg:col-span-6 space-y-6">
                <GeneratorForm
                  participant={participant}
                  onChange={handleParticipantChange}
                  selectedFrameId={selectedFrameId}
                  onSelectFrame={setSelectedFrameId}
                />

                <SharePanel
                  onDownloadPng={handleDownloadPng}
                  onCopyCard={handleCopyCard}
                  onReset={handleReset}
                  participantName={participant.name}
                  hackerId={participant.hackerId}
                  cardRef={cardRef}
                  showToast={showToast}
                />
              </div>

              {/* RIGHT COLUMN: Live Card Preview (Sticky on Desktop) */}
              <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
                <div className="bg-[#003820] p-6 border-2 border-[#FFE500] shadow-[8px_8px_0px_#FF007A] space-y-4 flex flex-col items-center">
                  {/* Preview Toolbar */}
                  <div className="w-full flex items-center justify-between border-b-2 border-[#FFE500] pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono-tech font-black text-[#FFE500]">
                      <Eye className="w-4 h-4 text-[#FF007A]" />
                      <span>LIVE PREVIEW PASS</span>
                    </div>

                    {/* Zoom Level Controls */}
                    <div className="flex items-center gap-1 bg-[#004D2C] p-1 border border-[#FFE500] text-xs font-mono-tech">
                      <button
                        onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                        className="p-1 text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]"
                        title="Zoom out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-1.5 text-[#FFE500] font-black">{Math.round(zoomLevel * 100)}%</span>
                      <button
                        onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                        className="p-1 text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C]"
                        title="Zoom in"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Container with Zoom Transform */}
                  <div className="w-full overflow-hidden flex justify-center py-2">
                    <div
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'top center',
                        transition: 'transform 0.2s ease-out',
                      }}
                    >
                      <IDCardPreview
                        ref={cardRef}
                        participant={participant}
                        frameStyle={selectedFrameId}
                        organizerConfig={organizerConfig}
                        aspectRatio={aspectRatio}
                        onPhotoChange={handleParticipantChange}
                      />
                    </div>
                  </div>

                  {/* Micro Footer Hint */}
                  <div className="text-center text-[10px] font-mono-tech font-bold text-[#FFE500]/80 pt-2 border-t border-[#FFE500]/30 w-full flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#FF007A]" />
                    <span>STATUS: READY TO SHIP • NO BORING ID CARDS ALLOWED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-12 right-6 z-50 bg-[#FFE500] text-[#004D2C] px-4 py-2.5 border-2 border-[#000] font-mono-tech font-black text-xs shadow-[4px_4px_0px_#FF007A] flex items-center gap-2 animate-bounce uppercase">
          <CheckCircle2 className="w-4 h-4 text-[#FF007A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <OrganizerModal
        isOpen={isOrganizerModalOpen}
        onClose={() => setIsOrganizerModalOpen(false)}
        config={organizerConfig}
        onUpdateConfig={setOrganizerConfig}
      />

      <NoticeBoardModal
        isOpen={isNoticeBoardOpen}
        onClose={() => setIsNoticeBoardOpen(false)}
      />

      {/* Footer matching design theme */}
      <footer className="h-10 bg-[#FFE500] text-[#004D2C] flex items-center justify-between px-4 sm:px-8 z-20 relative border-t-2 border-[#FFE500] font-mono text-[9px] font-black uppercase tracking-widest">
        <div className="flex gap-4">
          <span>STATUS: READY TO SHIP</span>
          <span className="hidden sm:inline">LOCATION: GOA, INDIA</span>
          <span className="hidden md:inline">MISSION: BUILD THE FUTURE</span>
        </div>
        <div className="font-bold">© 2026 HACKER HOUSE GOA — NO BORING ID CARDS ALLOWED</div>
      </footer>
    </div>
  );
}
