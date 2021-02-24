/**
 *    Date: 24 Feburary 2021
 *    Description: Task Service layer
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const { v4: uuidv4 } = require("uuid");
module.exports = {
  checkTaskValidity: (dueDate, status) => {
    const todayDate = new Date();
    const modifiedDueDate = new Date(dueDate);
    todayDate.setHours(0, 0, 0, 0);
    modifiedDueDate.setHours(0, 0, 0, 0);
    if (
      todayDate.getTime() > modifiedDueDate.getTime() ||
      status === "Completed"
    ) {
      return false;
    }
    return true;
  },
  createTaskId: async (data) => {
    const id = uuidv4();
    return {
      ...data,
      id,
    };
  },
};
