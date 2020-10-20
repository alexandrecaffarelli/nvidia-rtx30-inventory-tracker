const sendText = require('./sendText')
require('dotenv').config()

const scraperObject = {
    url: 'https://www.nvidia.com/fr-fr/shop/geforce/gpu/?page=1&limit=9&locale=fr-fr&category=GPU&manufacturer=NVIDIA&manufacturer_filter=NVIDIA~3,ASUS~63,EVGA~31,GAINWARD~3,GIGABYTE~35,MSI~38,PNY~13,ZOTAC~14',
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
            if (item != 'OUT OF STOCK' && item != 'NOTIFICATIONS') {
                const body = `Inventory has changed! Go visit the website: ${this.url}`;
                console.log(body);
                sendText.SMS(body, this.to, this.from);
                await page.close();
                await browser.close();
                return true;
            } else {
                console.log('Inventory has not changed! Visit again!');
                await page.close();
                await browser.close();
                return false;
            }
        }

    }
}

module.exports = scraperObject;