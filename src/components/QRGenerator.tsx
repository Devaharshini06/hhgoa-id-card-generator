import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QRTarget } from '../types/participant';
import { Github, Globe, Linkedin, QrCode } from 'lucide-react';

interface QRGeneratorProps {
  github: string;
  portfolio: string;
  linkedin: string;
  target: QRTarget;
  accentColor?: string;
  bgColor?: string;
  size?: number;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  github,
  portfolio,
  linkedin,
  target,
  accentColor = '#FFE500',
  bgColor = '#005c33',
  size = 76,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const getTargetUrl = (): string => {
    switch (target) {
      case 'github':
        return github || 'https://github.com';
      case 'portfolio':
        return portfolio || github || 'https://hhgoa.com';
      case 'linkedin':
        return linkedin || 'https://linkedin.com';
      default:
        return github || 'https://hhgoa.com';
    }
  };

  useEffect(() => {
    const url = getTargetUrl();
    QRCode.toDataURL(url, {
      width: size * 2,
      margin: 1,
      color: {
        dark: accentColor === '#00FF66' ? '#00FF66' : '#FFE500',
        light: '#092F24'
      },
      errorCorrectionLevel: 'M'
    })
      .then((dataUri) => setQrDataUrl(dataUri))
      .catch((err) => console.error('QR code generation error:', err));
  }, [github, portfolio, linkedin, target, accentColor, bgColor, size]);

  const renderIcon = () => {
    switch (target) {
      case 'github':
        return <Github className="w-3 h-3 text-[#FFE500]" />;
      case 'portfolio':
        return <Globe className="w-3 h-3 text-[#FFE500]" />;
      case 'linkedin':
        return <Linkedin className="w-3 h-3 text-[#FFE500]" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-1.5 bg-[#092F24] border border-[#FFE500]/50 rounded shadow-sm">
      {qrDataUrl ? (
        <img
          src={qrDataUrl}
          alt={`QR Code to ${target}`}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-sm p-0.5 bg-[#092F24]"
        />
      ) : (
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="bg-[#092F24] animate-pulse flex items-center justify-center rounded text-[#FFE500]"
        >
          <QrCode className="w-6 h-6 animate-spin" />
        </div>
      )}
      <div className="flex items-center gap-1 mt-1 text-[9px] font-mono-tech font-bold text-[#FFE500] uppercase tracking-wider">
        {renderIcon()}
        <span>{target}</span>
      </div>
    </div>
  );
};
