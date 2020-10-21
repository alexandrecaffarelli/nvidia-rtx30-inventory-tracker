const browserObject = require('./browser');
const scraperController = require('./pageController');
require('dotenv').config();

setInterval(() => {
    let browserInstance = browserObject.startBrowser();
    scraperController(browserInstance);
}, process.env.CHECK_INTERVAL_MS || 20000);