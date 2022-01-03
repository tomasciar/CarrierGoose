// Required External Modules
const express = require("express");
const ejs = require("ejs");
const { sendMessage } = require("./public/javascripts/send-sms");
const bodyParser = require("body-parser");

// sendMessage("hello", "nicole", "6045068684");

// App Variables
const app = express();
const port = "8000";
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// App Configuration
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Routes Definitions
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.post("/", urlencodedParser, function (req, res) {
  console.log(req.body);
});

// Server Activation
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
