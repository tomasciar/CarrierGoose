// Enable functionality for local and hosted builds
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Get environment variables from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);
const sender = "+16479552565";

// Function to send message
function sendMessage(todoList, number) {
  let list = "";

  for (let i = 0; i < todoList.length; i++) {
    list = list.concat("- ", todoList[i].todo, "\n");
  }

  if (todoList.length == 0) {
    client.messages
      .create({
        body:
          "\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n" +
          "HONK! False alarm, it looks like my bag is empty. " +
          "Have a great day!!",
        to: number,
        from: sender
      })
      .then((message) => console.log(message.sid));
  } else if (todoList.length === 1) {
    client.messages
      .create({
        body:
          "\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n" +
          "HONK! Only one task for today? " +
          "Hopefully it's a good one!\n\n" +
          list,
        to: number,
        from: sender
      })
      .then((message) => console.log(message.sid));
  } else if (todoList.length > 49) {
    client.messages
      .create({
        body:
          "\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n" +
          "HONK! Wow, you have a lot on your plate! " +
          "Make sure you don't burn yourself out.\n\n" +
          list,
        to: number,
        from: sender
      })
      .then((message) => console.log(message.sid));
  } else if (todoList.length > 24) {
    client.messages
      .create({
        body:
          "\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n" +
          "HONK! Wow this is a long list. I believe in you!\n\n" +
          list,
        to: number,
        from: sender
      })
      .then((message) => console.log(message.sid));
  } else if (todoList.length > 9) {
    client.messages
      .create({
        body:
          "\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n" +
          "HONK! Are you sure you have enough time to " +
          "finish all this?? Good luck!\n\n" +
          list,
        to: number,
        from: sender
      })
      .then((message) => console.log(message.sid));
  } else if (todoList.length > 4) {
    client.messages
      .create({
        body:
          "\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n" +
          "HONK! Okay today doesn't seem too bad! " +
          "Maybe you can watch a movie tonight?\n\n" +
          list,
        to: number,
        from: sender
      })
      .then((message) => console.log(message.sid));
  } else {
    client.messages
      .create({
        body:
          "\nCarrier Goose Delivery!\n\n           🦢✉️📬\n \n" +
          "HONK! Not much to do today, huh? Hopefully some time to relax!\n\n" +
          list,
        to: number,
        from: sender
      })
      .then((message) => console.log(message.sid));
  }
}

// Export function so it can be used in server.js
module.exports = { sendMessage };
