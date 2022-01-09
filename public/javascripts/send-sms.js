if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

function sendMessage(question, answer, number) {
  client.messages
    .create({
      body:
        `\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n` +
        `A: ${answer}\n\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^` +
        `\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n^\n` +
        `Q: ${question}\n\nScroll up to see the answer!`,

      to: number,
      from: "+16479552565",
    })
    .then((message) => console.log(message.sid));
}

module.exports = { sendMessage };
