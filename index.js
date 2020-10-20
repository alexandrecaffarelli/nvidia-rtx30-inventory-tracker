const browserObject = require('./browser');
const scraperController = require('./pageController');
require('dotenv').config()

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance);