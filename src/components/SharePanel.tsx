import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Download, Share2, Copy, Check, RotateCcw, Sparkles, Image, ShieldCheck, X, Loader2 } from 'lucide-react';
import { getCardBlob, getCardDataUrl } from '../utils/exportCard';

interface SharePanelProps {
  onDownloadPng: (highRes: boolean) => Promise<void>;
  onCopyCard: () => Promise<void>;
  onReset: () => void;
  participantName: string;
  hackerId?: string;
  cardRef: React.RefObject<HTMLDivElement | null>;
  showToast: (msg: string) => void;
}

export const SharePanel: React.FC<SharePanelProps> = ({
  onDownloadPng,
  onCopyCard,
  onReset,
  participantName,
  hackerId,
  cardRef,
  showToast,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const buildCaption = (name: string, id?: string) => {
    const formattedId = id ? (id.startsWith('#') ? id : `#${id}`) : '#HH-GOA-3696';
    return `Built my Hacker Goa House Builder Card!\n\n👤 ${name || 'Hacker'}\n🪪 Builder ID: ${formattedId}\n\nExcited to build, ship, and connect with amazing builders in Goa. 🚀\n\nCreate your own Builder Card:\nhttps://hhgoa-id-card-generator-beta.vercel.app/\n\n#FrameInGoa #HHGoa2026`;
  };

  const [shareCaption, setShareCaption] = useState(() => buildCaption(participantName, hackerId));

  React.useEffect(() => {
    setShareCaption(buildCaption(participantName, hackerId));
  }, [participantName, hackerId]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFE500', '#FF007A', '#00FF66', '#FFF5C7'],
    });
  };

  const handleShareToX = () => {
    triggerConfetti();
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCaption)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = async (highRes: boolean) => {
    setIsDownloading(true);
    triggerConfetti();
    await onDownloadPng(highRes);
    setIsDownloading(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(shareCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleOpenShareModal = () => {
    triggerConfetti();
    setShowShareModal(true);
  };

  return (
    <>
      {/* Primary Action Toolbar */}
      <div className="bg-[#003820] p-6 border-2 border-[#FFE500] text-[#FFE500] shadow-[6px_6px_0px_#000] space-y-4">
        <div className="flex items-center justify-between text-xs font-mono-tech font-black text-[#FF007A] uppercase tracking-widest italic">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FF007A]" /> EXPORT PASS
          </span>
          <span className="text-[10px] text-[#FFE500]">HIGH-RES PNG</span>
        </div>

        <div className="mt-auto flex flex-wrap sm:flex-nowrap gap-3">
          {/* Download Standard PNG */}
          <button
            onClick={() => handleDownload(false)}
            disabled={isDownloading}
            className="flex-1 bg-[#FFE500] text-[#004D2C] py-3.5 px-4 font-black text-sm uppercase tracking-tighter hover:bg-white transition-colors shadow-[4px_4px_0px_#FF007A] flex items-center justify-center gap-2 active:translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'GENERATING...' : 'DOWNLOAD PNG'}
          </button>

          {/* Download High Res 3x */}
          <button
            onClick={() => handleDownload(true)}
            disabled={isDownloading}
            className="px-4 py-3.5 bg-[#FF007A] text-white font-black text-xs uppercase tracking-tighter hover:bg-[#FFE500] hover:text-[#004D2C] transition-colors shadow-[4px_4px_0px_#FFE500] flex items-center justify-center gap-1.5"
            title="Download High Resolution 3X PNG"
          >
            <Image className="w-4 h-4" />
            <span>3X RES</span>
          </button>

          {/* Share Modal Trigger */}
          <button
            onClick={handleOpenShareModal}
            className="w-12 bg-transparent border-2 border-[#FFE500] flex items-center justify-center text-[#FFE500] hover:bg-[#FFE500] hover:text-[#004D2C] transition-colors shadow-[4px_4px_0px_#FF007A]"
            title="Share & Copy Caption"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="w-12 bg-transparent border-2 border-[#FF007A] flex items-center justify-center text-[#FF007A] hover:bg-[#FF007A] hover:text-white transition-colors shadow-[4px_4px_0px_#FFE500]"
            title="Reset default values"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Social Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-[#041D15]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#006B3C] border-2 border-[#FFE500] rounded-2xl max-w-md w-full p-6 text-[#FFF5C7] shadow-[8px_8px_0px_#FF007A] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full bg-[#092F24] text-[#FFE500] hover:bg-[#FF007A] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[#FFE500] mb-2 font-cinzel font-black text-lg">
              <ShieldCheck className="w-5 h-5 text-[#00FF66]" />
              YOUR HACKER ID IS READY!
            </div>

            <p className="text-xs font-sans-ui text-[#FFF5C7]/80 mb-4">
              Copy your social caption and drop your generated pass image below your HHGoa submission!
            </p>

            {/* Editable Social Caption Box */}
            <div className="mb-4">
              <label className="block text-xs font-mono-tech font-bold text-[#FFE500] mb-1">
                Suggested Social Caption:
              </label>
              <textarea
                rows={3}
                value={shareCaption}
                onChange={(e) => setShareCaption(e.target.value)}
                className="w-full bg-[#092F24] border border-[#FFE500]/50 rounded p-2.5 text-xs text-[#FFE500] font-mono-tech outline-none focus:border-[#FFE500]"
              />
            </div>

            <div className="space-y-2.5">
              {/* Direct Tweet to X */}
              <button
                onClick={handleShareToX}
                className="w-full py-3 rounded bg-[#000000] border-2 border-[#FFE500] text-[#FFE500] font-mono-tech font-black text-xs hover:bg-[#FFE500] hover:text-[#000000] transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0px_#FF007A]"
              >
                <Share2 className="w-4 h-4 text-[#FF007A]" />
                <span>SHARE TO X / TWEET (#FrameInGoa)</span>
              </button>

              <button
                onClick={handleCopyCaption}
                className="w-full py-2.5 rounded bg-[#FFE500] text-[#092F24] font-mono-tech font-bold text-xs hover:bg-[#FF007A] hover:text-white transition-all flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000]"
              >
                {copiedCaption ? <Check className="w-4 h-4 text-[#00FF66]" /> : <Copy className="w-4 h-4" />}
                {copiedCaption ? 'CAPTION COPIED TO CLIPBOARD!' : 'COPY CAPTION TEXT'}
              </button>

              <button
                onClick={() => handleDownload(true)}
                className="w-full py-2.5 rounded bg-[#FF007A] text-white font-mono-tech font-bold text-xs hover:bg-[#FFE500] hover:text-[#092F24] transition-all flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000]"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD PASS (HIGH RES)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
