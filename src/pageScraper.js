const sendText = require('./sendText');
require('dotenv').config();

// Scraper object
const scraperObject = {
    url: process.env.URL_TO_SEARCH,
    from: process.env.TWILIO_NUMBER,
    to: process.env.NUMBER_TO_TEXT,
    
    // Async method that performs the actual scraping
    async scraper(browser) {
        let page = await browser.newPage();
        // Set user agent (override the default headless User Agent)
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36");
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('#mainCont');
        // Get the stock to all the required items (here NVIDIA RTX 3000 Series)
        let items = await page.$$eval('.buy-col-xl, .buy-col-lg', stocks => {
            // Extract the stock information from the data
            stocks = stocks.map(el => el.querySelector('.featured-buy-link, .buy-link').innerText)
            return stocks;
        });
        console.log(items.length);
        console.log(items);
        // Loop through each of those items to check if it is back in stock
        for (let item of items) {
            console.log(item);
            if (item !== 'RUPTURE DE STOCK' && item !== 'OUT OF STOCK' && item !== 'NOTIFICATIONS' && item !== 'DISPONIBLE BIENTÔT' && item !== 'PROCHAINEMENT' && item !== '') {
                const body = `Inventory has changed! Go visit NVIDIA website!`;
                // Send a text message alerting stock changes
                sendText.SMS(body, this.to, this.from);
                // Close the page
                await page.close();
                // Close the browser
                await browser.close();
                return;
            }
        }
        console.log('Inventory has not changed! Visit again!');
        // Close the page
        await page.close();
        // Close the browser
        await browser.close();
        return;
    }
}

module.exports = scraperObject;