if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Get environment variables from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

// Function to send message
function sendMessage(todoList, number) {
  let list = "";

  for (let i = 0; i < todoList.length; i++) {
    list = list.concat("- ", todoList[i].todo, "\n");
  }

  client.messages
    .create({
      body: "Here is a list of todo items:\n" + list,
      to: number,
      from: "+16479552565",
    })
    .then((message) => console.log(message.sid));
}

// Export function so it can be used in server.js
module.exports = { sendMessage };
