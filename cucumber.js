const common = `--require config/config.js 
--require setup/assertions.js 
--require setup/hooks.js 
--require step-definitions/**/*.js`;

const { chromium, firefox, webkit } = require('playwright');
require('dotenv').config();

const browserName = process.env.BROWSER || 'firefox';

async function launchBrowser(browserName) {
  let browser;

  switch (browserName) {
    case 'chromium':
      browser = await chromium.launch();
      break;
    case 'firefox':
      browser = await firefox.launch();
      break;
    case 'webkit':
      browser = await webkit.launch();
      break;
    default:
      throw new Error(`Unsupported browser: ${browserName}`);
  }

  return browser;
}

module.exports = {
  default: `${common} features/**/*.feature`,
  launchBrowser: async () => await launchBrowser(browserName),
};