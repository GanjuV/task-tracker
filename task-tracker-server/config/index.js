/**
 *    Date: 24 Feburary 2021
 *    Description: Config file
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
};
