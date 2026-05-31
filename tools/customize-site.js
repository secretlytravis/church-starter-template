const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'config', 'church.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const replacements = {
  'Example Church': config.churchName,
  'Your City': config.city,
  'addressRegion: \'ST\'': `addressRegion: '${config.state}'`,
  'ST 00000': `${config.state} ${config.postalCode}`,
  ' ST.': ` ${config.state}.`,
  ' ST ': ` ${config.state} `,
  'ST,': `${config.state},`,
  '123 Church Street': config.streetAddress,
  '555-555-5555': config.phoneDisplay,
  '5555555555': config.phoneHref,
  'hello@examplechurch.org': config.email,
  'examplechurch.org': config.domain,
  '@examplechurch': `@${config.youtubeHandle}`,
  'YOUR_YOUTUBE_CHANNEL_ID': config.youtubeChannelId,
  'https://www.facebook.com/examplechurch': config.facebookUrl,
  'https://www.google.com/maps?q=123%20Church%20Street%2C%20Your%20City%2C%20ST%2000000&output=embed':
    `https://www.google.com/maps?q=${encodeURIComponent(`${config.streetAddress}, ${config.city}, ${config.state} ${config.postalCode}`)}&output=embed`,
  'Pastor First Last': config.pastorName,
  'First Last': config.pastorName.replace(/^Pastor\s+/i, ''),
  'First and his wife Spouse Name': `${config.pastorShortName} and his wife ${config.pastorSpouseName}`,
  'First grew up': `${config.pastorShortName} grew up`,
  'since YEAR': `since ${config.pastorStartYear}`
};

const textExtensions = new Set([
  '.bat',
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.ps1',
  '.svg',
  '.toml',
  '.txt',
  '.xml'
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') return [];
      return walk(fullPath);
    }
    return [fullPath];
  });
}

let changed = 0;
for (const filePath of walk(root)) {
  if (!textExtensions.has(path.extname(filePath))) continue;
  if (filePath === configPath) continue;

  const original = fs.readFileSync(filePath, 'utf8');
  let next = original;
  for (const [from, to] of Object.entries(replacements)) {
    next = next.split(from).join(to);
  }

  if (next !== original) {
    fs.writeFileSync(filePath, next);
    changed += 1;
  }
}

console.log(`Customized ${changed} files using config/church.json.`);
