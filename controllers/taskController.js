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
  const userId = req.userId;

  const task = await prismadb.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      column: {
        include: {
          billboard: {
            include: {
              members: true,
            },
          },
        },
      },
    },
  });

  if (!task) {
    throw HttpError("Task not found", 404);
  }

  const { billboard } = task?.column;

  const userRole = billboard?.members?.find(
    (item) => item?.userId === userId
  ).role;
  const isOwner = billboard?.userId === userId;

  if (!userRole && !isOwner) {
    throw HttpError("You do not have access to this task", 403);
  }

  if (
    userRole === "VIEWER" &&
    Object.keys(body)?.some((key) => key !== "isChecked")
  ) {
    throw new HttpError("Viewers can only update isChecked", 403);
  }

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
