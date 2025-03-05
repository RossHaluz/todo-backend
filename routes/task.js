const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { taskSchema } = require("../helpers");
const { validateBody, checkAuth } = require("../middlewars");

const router = require("express").Router();

router.use(checkAuth);

//Create task
router.post("/create/:columnId", validateBody(taskSchema), createTask);

//Update task
router.patch("/update/:taskId", validateBody(taskSchema), updateTask);

//Delete task
router.delete("/delete/:taskId", deleteTask);

module.exports = router;
