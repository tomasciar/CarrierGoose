if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Required External Modules
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const { sendMessage } = require("./public/javascripts/send-sms");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

// Configure express application
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// const mongoose = require("mongoose");
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;

// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("Connected to Mongoose"));

let todos = null;

// Routes Definitions
app.post("/todos", (req, res) => {
  todos = req.body;
  res.end();
});

app.post("/", (req, res) => {
  sendMessage(todos, req.body.number);
  res.redirect("/");
});

// Server Activation
app.use("/", indexRouter);

app.listen(process.env.PORT || 8000);
