/**
 *    Date: 24 Feburary 2021
 *    Description: Mail controller code
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */

const { storage } = require("../config/config");

module.exports = {
  getAllMail: async () => {
    try {
      const data = await storage.mail;
      if (data) return data;
      return "Not found";
    } catch (error) {
      throw error;
    }
  },
};
