require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    to: "+16045068684",
    from: "+16479552564",
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
  })
  .then((message) => console.log(message.sid));
