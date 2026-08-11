import React, { useRef, useState } from 'react';
import { Upload, Camera, Trash2, RefreshCw, User, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
];

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono-tech font-bold text-[#FFE500] uppercase tracking-wider flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-[#FF007A]" />
          Profile Picture
        </label>
        {image && (
          <button
            onClick={() => onImageChange(null)}
            className="text-[11px] font-mono-tech text-[#FF007A] hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Remove
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
          isDragging
            ? 'border-[#00FF66] bg-[#00FF66]/10 scale-[1.01]'
            : image
            ? 'border-[#FFE500]/50 bg-[#005c33]/40 hover:border-[#FFE500]'
            : 'border-[#FFE500]/30 bg-[#092F24]/60 hover:border-[#FFE500] hover:bg-[#005c33]/30'
        }`}
      >
        {image ? (
          <div className="flex items-center gap-4 w-full">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FFE500] shrink-0 shadow-[2px_2px_0px_#FF007A]">
              <img src={image} alt="Hacker Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs font-mono-tech font-bold text-[#FFE500] truncate">Photo Uploaded</p>
              <p className="text-[11px] font-sans-ui text-[#FFF5C7]/70">Click or drag another image to replace</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="p-2 bg-[#FFE500] text-[#092F24] rounded font-mono-tech text-xs font-bold hover:bg-[#FF007A] hover:text-white transition-colors shrink-0 shadow-[2px_2px_0px_#000]"
              title="Replace photo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#FFE500]/10 border border-[#FFE500]/40 flex items-center justify-center text-[#FFE500]">
              <Upload className="w-5 h-5 text-[#FFE500]" />
            </div>
            <div>
              <p className="text-xs font-mono-tech font-bold text-[#FFF5C7]">
                Drag & drop your photo or <span className="text-[#FFE500] underline">browse</span>
              </p>
              <p className="text-[10px] font-sans-ui text-[#FFF5C7]/60 mt-0.5">
                PNG, JPG or WebP (Client-side processed)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preset Avatar Selection */}
      <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#FFF5C7]/70 pt-1">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#FFE500]" /> Quick avatars:
        </span>
        <div className="flex gap-1.5">
          {DEFAULT_AVATARS.map((avatar, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onImageChange(avatar)}
              className="w-6 h-6 rounded-full overflow-hidden border border-[#FFE500]/40 hover:border-[#FF007A] hover:scale-110 transition-all"
              title={`Use preset avatar ${idx + 1}`}
            >
              <img src={avatar} alt="Preset" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
