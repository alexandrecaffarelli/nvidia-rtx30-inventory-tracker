const pageScraper = require('./pageScraper');

// Async function that passes the browser instance to the scraper which uses it to scrape pages
async function scrapeAll(browserInstance){
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser);

    } catch (error) {
        console.log("Could not resolve the browser instance => ", error);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);