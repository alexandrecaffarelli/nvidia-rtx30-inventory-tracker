const browserObject = require('./browser');
const scraperController = require('./pageController');
require('dotenv').config()

setInterval(() => {
    let browserInstance = browserObject.startBrowser();
    scraperController(browserInstance);
}, 20000);