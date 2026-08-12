import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory cache for generated cards for shareable OG link previews
interface StoredCard {
  id: string;
  dataUrl: string; // base64 PNG data URL
  name: string;
  handle: string;
  createdAt: number;
}

const cardStore = new Map<string, StoredCard>();

// Cleanup cards older than 7 days periodically
setInterval(() => {
  const now = Date.now();
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  for (const [id, card] of cardStore.entries()) {
    if (now - card.createdAt > SEVEN_DAYS) {
      cardStore.delete(id);
    }
  }
}, 60 * 60 * 1000);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));

  // API endpoint to store a generated card image for OG link previews
  app.post('/api/cards', (req, res) => {
    try {
      const { dataUrl, name, handle } = req.body;
      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Missing dataUrl' });
        return;
      }

      // Generate short unique card ID
      const id = 'hh_' + Math.random().toString(36).substring(2, 9);
      cardStore.set(id, {
        id,
        dataUrl,
        name: name || 'Hacker',
        handle: handle || '@builder',
        createdAt: Date.now(),
      });

      const host = req.get('host') || `localhost:${PORT}`;
      const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
      const baseUrl = `${protocol}://${host}`;

      res.json({
        id,
        shareUrl: `${baseUrl}/card/${id}`,
        imageUrl: `${baseUrl}/api/og-image/${id}.png`,
      });
    } catch (err) {
      console.error('Error storing card:', err);
      res.status(500).json({ error: 'Failed to create card link' });
    }
  });

  // Serve raw PNG image for OG crawler / Twitter bot
  app.get('/api/og-image/:id.png', (req, res) => {
    const card = cardStore.get(req.params.id);
    if (!card) {
      res.status(404).send('Card not found');
      return;
    }

    try {
      // Convert base64 data URL to binary Buffer
      const base64Data = card.dataUrl.replace(/^data:image\/png;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imgBuffer.length,
        'Cache-Control': 'public, max-age=86400',
      });
      res.end(imgBuffer);
    } catch (e) {
      res.status(500).send('Error serving image');
    }
  });

  // Dynamic HTML page with OpenGraph & Twitter Card meta tags for link unfurling
  app.get('/card/:id', (req, res) => {
    const card = cardStore.get(req.params.id);
    const host = req.get('host') || `localhost:${PORT}`;
    const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    const cardId = req.params.id;
    const name = card ? card.name : 'Hacker';
    const imageUrl = card ? `${baseUrl}/api/og-image/${cardId}.png` : `${baseUrl}/favicon.svg`;
    const shareUrl = `${baseUrl}/card/${cardId}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HHGoa '26 Official Pass — ${name}</title>
  <meta name="description" content="Check out my official Hacker House Goa '26 pass! #FrameInGoa" />

  <!-- Open Graph / Facebook / LinkedIn / iMessage -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${shareUrl}" />
  <meta property="og:title" content="HHGoa '26 Official Pass — ${name}" />
  <meta property="og:description" content="I've officially generated my Hacker House Goa '26 pass! 🌴💻 See you in Goa. #FrameInGoa" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter / X Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="HHGoa '26 Official Pass — ${name}" />
  <meta name="twitter:description" content="I've officially generated my Hacker House Goa '26 pass! 🌴💻 See you in Goa. #FrameInGoa" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:image:src" content="${imageUrl}" />

  <style>
    body {
      background-color: #041D15;
      color: #FFE500;
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .card-container {
      max-width: 500px;
      width: 100%;
      background: #004D2C;
      border: 3px solid #FFE500;
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      box-shadow: 6px 6px 0px #FF007A;
    }
    .preview-img {
      max-width: 100%;
      border-radius: 12px;
      border: 2px solid #FFE500;
      margin: 16px 0;
    }
    .btn {
      display: inline-block;
      background: #FFE500;
      color: #004D2C;
      padding: 12px 24px;
      font-weight: 800;
      text-decoration: none;
      border-radius: 8px;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div class="card-container">
    <h1 style="margin: 0; font-size: 22px;">HHGoa '26 Official Pass</h1>
    <p style="color: #FFF5C7; font-size: 14px; margin-top: 6px;">Pass generated for <strong>${name}</strong></p>
    <img src="${imageUrl}" alt="Pass Preview" class="preview-img" />
    <div>
      <a href="/" class="btn">Create Your Own Pass</a>
    </div>
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HHGoa Server running on http://localhost:${PORT}`);
  });
}

startServer();
