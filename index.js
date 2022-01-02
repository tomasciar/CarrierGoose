// Required External Modules
const express = require("express");
const ejs = require("ejs");

// App Variables
const app = express();
const port = process.env.PORT || "8000";

// App Configuration
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes Definitions
app.get("/", function (req, res) {
  res.render("pages/index");
});

// Server Activation
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
