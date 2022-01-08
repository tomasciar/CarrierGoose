// Required External Modules
const express = require("express");
const ejs = require("ejs");
const { sendMessage } = require("./public/javascripts/send-sms");
const bodyParser = require("body-parser");

// sendMessage("hello", "nicole", "6045068684");

// App Variables
const app = express();
const port = "8000";
app.use(bodyParser.urlencoded({ extended: true }));

// App Configuration
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Routes Definitions
app
  .route("/")

  .get((req, res) => {
    res.render("pages/index");
  })

  .post((req, res) => {
    const phoneNumber = req.body.number;
    console.log(phoneNumber);
    console.log(req.body);
    console.log(req.url);
    console.log(req.headers);

    // sendMessage(question, answer, phoneNumber);
  });

// Server Activation
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
