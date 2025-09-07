const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());

// Mount all routes
app.use("/api", routes);

module.exports = app;
