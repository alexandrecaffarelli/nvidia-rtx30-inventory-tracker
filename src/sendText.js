const Twilio = require("twilio");
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_TOKEN;
const client = new Twilio(accountSid, authToken); 

function SMS(body, to, from) {
    console.log("Sending the message...");
    client.messages
        .create({
            body,
            to,
            from
        })
        .then(() => {
            console.log(`👍 Success! Message has been sent to ${to}`);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = {
    SMS
};

