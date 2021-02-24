/**
 *    Date: 24 Feburary 2021
 *    Description: Project config file
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
module.exports = {
  storage: {
    tasks: [
      {
        title: "Task 1",
        description: "Complete UI of tool",
        dueDate: "2021-02-24T18:30:00.000Z",
        priority: "Low",
        status: "Inprogress",
        id: "8027fbda-1328-4cfe-aec6-1470b72a4671",
      },
      {
        title: "Task 2",
        description: "Complete date functionality",
        dueDate: "2021-02-25T18:30:00.000Z",
        priority: "Medium",
        status: "Completed",
        id: "8027fbda-1328-4cfe-aec6-1470b72a4611",
      },
      {
        title: "Task 3",
        description: "Complete routing task",
        dueDate: "2021-01-25T18:30:00.000Z",
        priority: "High",
        status: null,
        id: "8027fbda-1128-4cfe-aec6-1470b72a4671",
      },
      {
        title: "Task 4",
        description: "Check button alignment",
        dueDate: "2021-03-25T18:30:00.000Z",
        priority: "High",
        status: "Inprogress",
        id: "8014fbda-1328-4cfe-aec6-1470b72a4671",
      },
      {
        title: "Task 5",
        description: "Complete service layer code",
        dueDate: "2021-02-28T18:30:00.000Z",
        priority: "Low",
        status: "Inprogress",
        id: "b1581d55-daa4-46fa-ba66-fce419317622",
      },
    ],
    mail: [
      {
        text: "Message from vaibhav ganju",
        id: 1,
      },
    ],
  },
  cors: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  },
};
