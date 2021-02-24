/**
 *    Date: 24 Feburary 2021
 *    Description: Task routes
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const taskController = require("../../controllers/task-controller");
const { params } = require("../../utils/validator");
const {
  validateParams,
} = require("../../middlewares/validate-request-middleware");

module.exports = (app) => {
  // Task details

  app.get("/tasks", async (req, res) => {
    try {
      const tasks = await taskController.getAllTask();
      return res.send(tasks);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  });

  app.get("/task/:taskId", async (req, res) => {
    const { taskId } = req.params;
    try {
      const task = await taskController.getTask(taskId);
      return res.send(task);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  });

  app.post("/task", validateParams(params), async (req, res) => {
    const { body } = req;
    try {
      const data = await taskController.createTask(body);
      return res.send({
        message: "Created successfully",
        data,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send(`Task fields missing!!!`);
    }
  });

  app.put("/task/:taskId", validateParams(params), async (req, res) => {
    const { taskId } = req.params;
    try {
      const message = await taskController.updateTask(req.body);
      return res.send({
        message,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send(`Task fields missing!!!`);
    }
  });

  app.delete("/task/:taskId", validateParams(params), async (req, res) => {
    const { taskId } = req.params;
    try {
      const message = await taskController.deleteTask(req.body);
      return res.send({
        message,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send(`Task not found missing!!!`);
    }
  });
};
