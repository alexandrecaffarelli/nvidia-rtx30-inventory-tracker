const browserObject = require('./browser');
const scraperController = require('./pageController');
require('dotenv').config();

// Launch app at specified intervals (in milliseconds)
setInterval(() => {
    // Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    scraperController(browserInstance);
}, process.env.CHECK_INTERVAL_MS || 20000);