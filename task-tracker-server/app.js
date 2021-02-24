/**
 *    Date: 24 Feburary 2021
 *    Description: Basic application file.
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const express = require("express");
const { cors } = require("./config/config");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors);
require("./routes")(app);

module.exports = app;
