import { toPng, toBlob } from 'html-to-image';

export async function exportCardAsPng(
  element: HTMLElement,
  filename: string = 'HHGoa26_Hacker_ID.png',
  highRes: boolean = false
): Promise<boolean> {
  try {
    const scale = highRes ? 3 : 2;
    
    // Convert to PNG data URL with enhanced pixel ratio
    const dataUrl = await toPng(element, {
      pixelRatio: scale,
      cacheBust: true,
      quality: 0.98,
      backgroundColor: '#006B3C',
      fontEmbedCSS: '',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Failed to export card as PNG:', error);
    return false;
  }
}

export async function copyCardToClipboard(element: HTMLElement): Promise<boolean> {
  try {
    const blob = await toBlob(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#006B3C',
      fontEmbedCSS: ''
    });

    if (!blob) return false;

    if (navigator.clipboard && 'write' in navigator.clipboard) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to copy card image to clipboard:', error);
    return false;
  }
}
