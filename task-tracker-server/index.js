/**
 *    Date: 05 December 2020
 *    Description: Basic server start up and API expose code
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const http = require("http");
const app = require("./app");
const { port } = require("./config");
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(">>> 🌎 Open http://localhost:%s/ in your browser.", port);
});
