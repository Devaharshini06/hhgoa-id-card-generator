import { FrameStyleConfig, OrganizerConfig } from '../types/participant';

export const FRAME_STYLES: FrameStyleConfig[] = [
  {
    id: 'classic-goa',
    name: 'CLASSIC GOA',
    subtitle: 'Poster Heritage',
    tag: 'OFFICIAL POSTER',
    accentColor: '#FFE500',
    description: 'Traditional screen-printed poster aesthetic with ornamental lotus arches, gold dotted borders, and Devanagari Goa stamp.',
    bgColor: '#006B3C',
    borderColor: '#FFE500',
    cardBgClass: 'bg-[#005c33] text-[#FFF5C7]'
  },
  {
    id: 'hacker-mode',
    name: 'HACKER MODE',
    subtitle: 'Terminal & Circuitry',
    tag: 'CYBER GREEN',
    accentColor: '#00FF66',
    description: 'Monospace terminal layout with LED status tags, code comment metadata, and high-tech circuitry framing.',
    bgColor: '#041F16',
    borderColor: '#00FF66',
    cardBgClass: 'bg-[#031811] text-[#A3E635]'
  },
  {
    id: 'desi-cyber',
    name: 'DESI CYBER',
    subtitle: 'Rangoli & Neon',
    tag: 'NEON RANGOLI',
    accentColor: '#FF007A',
    description: 'Futuristic fusion of intricate Indian rangoli geometric motifs and neon yellow-pink wireframe accents.',
    bgColor: '#092F24',
    borderColor: '#FF007A',
    cardBgClass: 'bg-[#07241B] text-[#FFE500]'
  },
  {
    id: 'minimal',
    name: 'MINIMAL',
    subtitle: 'Clean & Precision',
    tag: 'LUXURY SERIF',
    accentColor: '#FFF5C7',
    description: 'Ultra-refined card with delicate gold foil dotted borders, spacious typography, and subtle event emblem.',
    bgColor: '#092F24',
    borderColor: '#FFF5C7',
    cardBgClass: 'bg-[#0B3A2C] text-[#FFF5C7]'
  },
  {
    id: 'chaos-mode',
    name: 'CHAOS MODE',
    subtitle: 'Stickers & Collage',
    tag: '100X BUILDER',
    accentColor: '#FF007A',
    description: 'Playful experimental layout with retro stamp badges, tape graphics, tilted photo, and hacker culture stickers.',
    bgColor: '#004D2B',
    borderColor: '#FFE500',
    cardBgClass: 'bg-[#004225] text-[#FFE500]'
  }
];

export const DEFAULT_ORGANIZER_CONFIG: OrganizerConfig = {
  eventName: "HACKER HOUSE",
  eventSubName: "गोवा",
  eventYear: "2026",
  eventLocation: "GOA, INDIA",
  eventDates: "28 — 31 OCT 2026",
  studioName: "2:47 PM STUDIO",
  primaryBgColor: "#006B3C",
  accentYellow: "#FFE500",
  accentPink: "#FF007A",
  defaultTagline: "Building AI systems that actually do things.",
  cardDimensions: {
    width: 520,
    height: 720
  }
};
