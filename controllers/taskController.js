const { HttpError, HttpSuccess, CtrlWrapper } = require("../helpers");
const { prismadb } = require("../lib/prismaClient");

const createTask = async (req, res) => {
  const { columnId } = req.params;
  const body = req.body;
  const newTask = await prismadb.task.create({
    data: {
      ...body,
      columnId,
    },
  });

  if (!newTask) {
    throw new HttpError("Something went wrong", 400);
  }

  return res.status(201).json(HttpSuccess({ newTask }));
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  const updateTask = await prismadb.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...body,
    },
  });

  if (!updateTask) {
    throw new HttpError("Something went wrong", 400);
  }

  return res.status(200).json(HttpSuccess({ updateTask }));
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const deleteTask = await prismadb.task.delete({
    where: {
      id: taskId,
    },
  });

  if (deleteTask) {
    throw new HttpError("Something went wrong", 400);
  }

  return res.status(200).json(HttpSuccess({ message: "Task success delete" }));
};

module.exports = {
  createTask: CtrlWrapper(createTask),
  updateTask: CtrlWrapper(updateTask),
  deleteTask: CtrlWrapper(deleteTask),
};
