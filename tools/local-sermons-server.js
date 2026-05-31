const fs = require('fs');
const http = require('http');
const path = require('path');
const { handler } = require('../netlify/functions/youtube-sermons.js');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 3000);
const redirects = {
  '/ask-a-pastor.html': '/pages/ask-a-pastor.html',
  '/beliefs.html': '/pages/beliefs.html',
  '/discipleship.html': '/pages/discipleship.html',
  '/glossary.html': '/pages/glossary.html',
  '/need-help.html': '/pages/need-help.html',
  '/new-believer.html': '/pages/new-believer.html',
  '/plan-your-visit.html': '/pages/plan-your-visit.html',
  '/prayer-request.html': '/pages/prayer-request.html',
  '/questions.html': '/pages/questions.html',
  '/resources.html': '/pages/resources.html',
  '/romans-road.html': '/pages/romans-road.html',
  '/sermons.html': '/pages/sermons.html',
  '/staff.html': '/pages/staff.html',
  '/style-guide.html': '/pages/style-guide.html',
  '/thank-you.html': '/pages/thank-you.html',
  '/pastor-testimony.html': '/testimonies/pastor-testimony.html',
  '/administrator-testimony.html': '/testimonies/administrator-testimony.html',
  '/pianist-testimony.html': '/testimonies/pianist-testimony.html',
  '/worship-leader-testimony.html': '/testimonies/worship-leader-testimony.html',
  '/media-director-testimony.html': '/testimonies/media-director-testimony.html'
};

// Loads local secrets from .env for previewing the sermon feed.
// The .env file is ignored by Git; .env.example shows the required names.
function loadEnv() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.slice(0, index);
    const value = trimmed.slice(index + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

// Minimal content-type map for the static files this site serves locally.
function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
  }[ext] || 'application/octet-stream';
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

loadEnv();

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Mirror Netlify redirects locally so /pages/sermons.html can call /api/sermons
  // without needing a full Netlify dev environment.
  if (url.pathname === '/api/sermons' || url.pathname === '/api/youtube-sermons') {
    try {
      const result = await handler();
      send(res, result.statusCode || 200, result.headers || {}, result.body || '');
    } catch (error) {
      send(res, 500, { 'Content-Type': 'application/json' }, JSON.stringify({ error: error.message }));
    }
    return;
  }

  if (redirects[url.pathname]) {
    send(res, 301, { Location: redirects[url.pathname] }, '');
    return;
  }

  // Serve static files from the project root, with path traversal protection.
  const requested = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = path.resolve(root, requested.replace(/^\/+/, ''));

  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not found');
    return;
  }

  send(res, 200, { 'Content-Type': contentType(filePath) }, fs.readFileSync(filePath));
}).listen(port, () => {
  console.log(`Church starter local preview server running at http://localhost:${port}/`);
  console.log('Static pages and /api/sermons are served from this one preview.');
});
