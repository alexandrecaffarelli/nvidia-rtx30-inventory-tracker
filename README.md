# 🕵🐸 NVIDIA RTX 3000 Series inventory tracker

Tired of pressing F5 and seeing out of stock cards?

This bot will help you out!

Its purpose is to track inventory status of RTX 3000 Series cards on NVIDIA website. When it sees a  change, it will send a text message to your phone with the changed URL, meaning you won't need to endlessly refresh pages ever again! 😎

Using:

- [Node.js](https://nodejs.org/),
- [Puppeteer](https://pptr.dev/),
- [Twilio](https://www.twilio.com/)

## Getting Started

1. Sign up for a [twilio account](https://www.twilio.com/try-twilio).
2. Clone the repo using `git clone`.
3. Create `.env` file in the root of this project by referring to `.env.example`. For the url, I'm personally using this [one](https://www.nvidia.com/fr-fr/shop/geforce/gpu/?page=1&limit=9&locale=fr-fr&category=GPU&manufacturer=NVIDIA&manufacturer_filter=NVIDIA~3,ASUS~63,EVGA~31,GAINWARD~3,GIGABYTE~35,MSI~38,PNY~13,ZOTAC~14).
4. Launch:

```bash
npm install
npm run start
```

5. That's it - Enjoy 🎮!