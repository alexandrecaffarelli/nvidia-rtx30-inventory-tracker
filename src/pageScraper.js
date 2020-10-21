const sendText = require('./sendText');
require('dotenv').config();

const scraperObject = {
    url: process.env.URL_TO_SEARCH,
    from: process.env.TWILIO_NUMBER,
    to: process.env.NUMBER_TO_TEXT,
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.waitForSelector('#mainCont');
        let items = await page.$$eval('.buy', stocks => {
            stocks = stocks.map(el => el.querySelector('.featured-buy-link').innerText)
            return stocks;
        });
        console.log(items.length);
        console.log(items);
        for (let item of items) {
            if (item !== 'OUT OF STOCK' && item !== 'NOTIFICATIONS') {
                const body = `Inventory has changed! Go visit the website: ${this.url}`;
                console.log(body);
                sendText.SMS(body, this.to, this.from);
                await page.close();
                await browser.close();
                return;
            } else {
                console.log('Inventory has not changed! Visit again!');
                await page.close();
                await browser.close();
                return;
            }
        }

    }
}

module.exports = scraperObject;