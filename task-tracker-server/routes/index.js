/**
 *    Date: 24 Feburary 2021
 *    Description: Routes file
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const fs = require("fs");
module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + "/api/").forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf("."))}`)(app);
  });
};
