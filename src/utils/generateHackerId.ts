/**
 * Generates a unique hacker ID for HHGoa'26
 * Format: HH26-DEV-7F42
 */
export function generateHackerId(name: string, handle?: string): string {
  const cleanName = (handle?.replace(/^@/, '') || name || 'HACKER')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  const prefixCode = cleanName.slice(0, 3).padEnd(3, 'X');

  // Generate 4-character hex suffix based on string hash or random hex
  let hash = 0;
  const sourceStr = (name + (handle || '') + 'HHGOA2026');
  for (let i = 0; i < sourceStr.length; i++) {
    hash = (hash << 5) - hash + sourceStr.charCodeAt(i);
    hash |= 0;
  }

  const hexSuffix = Math.abs(hash).toString(16).toUpperCase().padStart(4, '7F42').slice(-4);

  return `HH26-${prefixCode}-${hexSuffix}`;
}

export function rerollHackerId(name: string): string {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const prefixCode = cleanName.slice(0, 3).padEnd(3, 'HACK');
  const randomHex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
  return `HH26-${prefixCode}-${randomHex}`;
}
