export type FrameStyleId = 'classic-goa' | 'hacker-mode' | 'desi-cyber' | 'minimal' | 'chaos-mode';

export type QRTarget = 'github' | 'portfolio' | 'linkedin';

export type AspectRatioMode = 'standard' | 'story' | 'square';

export interface ParticipantData {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  profileImage: string | null;
  teamName?: string;
  favoriteTech?: string;
  currentlyBuilding?: string;
  hackerId: string;
  qrTarget: QRTarget;
}

export interface FrameStyleConfig {
  id: FrameStyleId;
  name: string;
  subtitle: string;
  tag: string;
  accentColor: string;
  description: string;
  bgColor: string;
  borderColor: string;
  cardBgClass: string;
}

export interface OrganizerConfig {
  eventName: string;
  eventSubName: string;
  eventYear: string;
  eventLocation: string;
  eventDates: string;
  studioName: string;
  primaryBgColor: string;
  accentYellow: string;
  accentPink: string;
  defaultTagline: string;
  cardDimensions: {
    width: number;
    height: number;
  };
}
