const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'config', 'church.json');

function readConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function writeConfig(config) {
  fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
}

function cleanDomain(value) {
  return value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '');
}

function cleanPhoneHref(value) {
  return value.replace(/[^\d+]/g, '');
}

function cleanYoutubeHandle(value) {
  return value.trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?youtube\.com\/@?/i, '');
}

function ask(rl, question, currentValue, options = {}) {
  const suffix = currentValue ? ` [${currentValue}]` : '';
  return new Promise((resolve) => {
    rl.question(`${question}${suffix}: `, (answer) => {
      const value = answer.trim() || currentValue || '';
      resolve(options.clean ? options.clean(value) : value);
    });
  });
}

async function main() {
  const config = readConfig();

  if (process.argv.includes('--defaults')) {
    writeConfig(config);
    console.log('Saved config/church.json using the current values.');
    const customize = spawnSync(process.execPath, [path.join(root, 'tools', 'customize-site.js')], {
      cwd: root,
      stdio: 'inherit'
    });
    process.exit(customize.status || 0);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('');
  console.log('Church Starter Template Setup');
  console.log('--------------------------------');
  console.log('Press Enter to keep the value shown in brackets.');
  console.log('You can leave YouTube fields as placeholders if you are not ready.');
  console.log('');

  config.churchName = await ask(rl, 'Church name', config.churchName);
  config.shortName = await ask(rl, 'Short church name', config.shortName || config.churchName);
  config.tagline = await ask(rl, 'Short tagline', config.tagline);
  config.domain = await ask(rl, 'Website domain, without https://', config.domain, { clean: cleanDomain });
  config.streetAddress = await ask(rl, 'Street address', config.streetAddress);
  config.city = await ask(rl, 'City', config.city);
  config.state = (await ask(rl, 'State abbreviation', config.state)).toUpperCase();
  config.postalCode = await ask(rl, 'ZIP or postal code', config.postalCode);
  config.phoneDisplay = await ask(rl, 'Phone number as people should see it', config.phoneDisplay);
  config.phoneHref = await ask(rl, 'Phone number with digits only', config.phoneHref || cleanPhoneHref(config.phoneDisplay), { clean: cleanPhoneHref });
  config.email = await ask(rl, 'Church email address', config.email);
  config.facebookUrl = await ask(rl, 'Facebook page URL', config.facebookUrl);
  config.youtubeHandle = await ask(rl, 'YouTube handle without @', config.youtubeHandle, { clean: cleanYoutubeHandle });
  config.youtubeChannelId = await ask(rl, 'YouTube channel ID, or leave placeholder', config.youtubeChannelId);
  config.pastorName = await ask(rl, 'Pastor name', config.pastorName);
  config.pastorShortName = await ask(rl, 'Pastor first name', config.pastorShortName);
  config.pastorSpouseName = await ask(rl, 'Pastor spouse name, or leave placeholder', config.pastorSpouseName);
  config.pastorStartYear = await ask(rl, 'Year pastor started, or leave placeholder', config.pastorStartYear);

  writeConfig(config);
  console.log('');
  console.log('Saved config/church.json.');

  const customize = spawnSync(process.execPath, [path.join(root, 'tools', 'customize-site.js')], {
    cwd: root,
    stdio: 'inherit'
  });

  if (customize.status !== 0) {
    rl.close();
    process.exit(customize.status || 1);
  }

  console.log('');
  console.log('The starter placeholders were updated.');
  console.log('');
  console.log('Next steps:');
  console.log('1. Replace the placeholder images in assets/images/.');
  console.log('2. Edit the words on the main pages.');
  console.log('3. Preview the site at http://localhost:3000/.');
  console.log('');

  const startPreview = process.argv.includes('--no-preview')
    ? 'n'
    : await ask(rl, 'Start the preview server now? Type y for yes', 'y');
  rl.close();

  if (startPreview.toLowerCase().startsWith('y')) {
    console.log('');
    console.log('Starting preview server. Leave this window open while previewing.');
    console.log('Open http://localhost:3000/ in your web browser.');
    console.log('Press Ctrl+C in this window to stop the server.');
    spawnSync(process.execPath, [path.join(root, 'tools', 'local-sermons-server.js')], {
      cwd: root,
      stdio: 'inherit'
    });
  }
}

main().catch((error) => {
  console.error('');
  console.error('Setup stopped because something went wrong:');
  console.error(error.message);
  process.exit(1);
});
