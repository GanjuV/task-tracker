/**
 *    Date: 24 Feburary 2021
 *    Description: Mail routes
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const mailController = require("../../controllers/mail-controller");
module.exports = (app) => {
  // Mail details

  app.get("/mails", async (req, res) => {
    try {
      const tasks = await mailController.getAllMail();
      return res.send(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  });
};
