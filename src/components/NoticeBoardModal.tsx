import React from 'react';
import { FileText, X, CheckCircle, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface NoticeBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoticeBoardModal: React.FC<NoticeBoardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#041D15]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#006B3C] border-2 border-[#FFE500] rounded-2xl max-w-xl w-full p-6 text-[#FFF5C7] shadow-[8px_8px_0px_#FF007A] relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-[#092F24] text-[#FFE500] hover:bg-[#FF007A] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-[#FFE500] font-cinzel font-black text-xl mb-1">
          <FileText className="w-6 h-6 text-[#FF007A]" />
          HHGOA '26 NOTICE BOARD
        </div>

        <div className="bg-[#092F24] p-3 rounded-lg border border-[#FFE500]/40 my-3 space-y-1">
          <div className="text-xs font-mono-tech font-bold text-[#FFE500] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" /> Task #1 Official Brief
          </div>
          <p className="text-xs font-sans-ui text-[#FFF5C7]/90 leading-relaxed">
            Build the official HHGoa'26 Frame & ID Card Generator. Submissions require a live link, code repository, and generated pass picture!
          </p>
        </div>

        <div className="space-y-4 my-4">
          <h3 className="text-xs font-mono-tech font-bold text-[#FFE500] uppercase tracking-wider border-b border-[#FFE500]/30 pb-1">
            Submission Checklist
          </h3>

          <ul className="space-y-2 text-xs font-sans-ui text-[#FFF5C7]/90">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#FFE500]">Visual Identity Match:</strong> Deep forest emerald background, yellow typography, hot pink Devanagari "गोवा" badge.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#FFE500]">5 Frame Styles:</strong> Classic Goa, Hacker Mode, Desi Cyber, Minimal, Chaos Mode.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#FFE500]">Dynamic QR Code:</strong> Auto-generated targeting GitHub, Portfolio, or LinkedIn.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#FFE500]">Client-Side Export:</strong> High resolution PNG download without server uploads.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#FFE500]">Organizer Mode:</strong> Configurable event metadata and custom dates.
              </span>
            </li>
          </ul>

          <div className="p-3 bg-[#FFE500] text-[#092F24] rounded-lg font-mono-tech font-bold text-xs flex items-center justify-between shadow-[3px_3px_0px_#000]">
            <span>OFFICIAL NOTICE BOARD: HTTP://HHGOA.COM</span>
            <a
              href="https://hhgoa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-[#092F24] text-[#FFE500] rounded hover:bg-[#FF007A] hover:text-white transition-colors flex items-center gap-1 text-[11px]"
            >
              Visit <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="py-2 px-6 rounded bg-[#FF007A] text-white font-mono-tech font-bold text-xs hover:bg-[#FFE500] hover:text-[#092F24] transition-colors shadow-[2px_2px_0px_#000]"
          >
            LET'S BUILD
          </button>
        </div>
      </div>
    </div>
  );
};
