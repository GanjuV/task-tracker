/**
 *    Date: 24 Feburary 2021
 *    Description: Task controller code
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */

const { storage } = require("../config/config");
const dummyService = require("../services/dummy-service");
const taskService = require("../services/task-service");

module.exports = {
  createTask: async (data) => {
    try {
      dummyService.checkSomeCondition();
      const modifiedData = await taskService.createTaskId(data);
      await storage.tasks.push(modifiedData);
      return modifiedData;
    } catch (error) {
      throw error;
    }
  },

  getTask: async (taskId) => {
    try {
      const data = await storage.tasks.filter(({ id }) => id === taskId)[0];
      if (data) return data;
      return "Not found";
    } catch (error) {
      throw error;
    }
  },

  getAllTask: async () => {
    try {
      const data = await storage.tasks;
      if (data) return data;
      return "Not found";
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (data) => {
    try {
      let foundIndex = -1;
      const modifiedData = await storage.tasks.map((obj, index) => {
        if (data.id === obj.id) {
          foundIndex = index;
          return {
            ...data,
            status: "Completed",
            dueDate: new Date().toString(),
          };
        }
        return obj;
      });
      if (foundIndex === -1) return "Not found";

      // Adding due date passed logic
      const isDone = taskService.checkTaskValidity(data.dueDate, data.status);
      if (isDone) {
        storage.tasks = modifiedData;
        return "Updated";
      }
      return "Not valid task due date exceeded todays date";
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (data) => {
    try {
      let foundIndex = -1;
      const modifiedData = await storage.tasks.filter((obj, index) => {
        if (obj.id === data.id) {
          foundIndex = index;
        } else {
          return obj;
        }
      });
      if (foundIndex === -1) return "Not found";
      storage.tasks = modifiedData;
      return "Deleted";
    } catch (error) {
      throw error;
    }
  },
};
