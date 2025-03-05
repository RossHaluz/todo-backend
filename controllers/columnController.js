const { HttpError, HttpSuccess, CtrlWrapper } = require("../helpers");
const { prismadb } = require("../lib/prismaClient");

const getAllColumnsByBoard = async (req, res) => {
  const { boardId } = req.params;
  const columns = await prismadb.column.findMany({
    where: {
      billboardId: boardId,
    },
    include: {
      tasks: true,
    },
  });

  return res.status(200).json(HttpSuccess({ columns }));
};

const createColumn = async (req, res) => {
  const { boardId } = req.params;
  const body = req.body;
  const newColumn = await prismadb.column.create({
    data: {
      ...body,
      billboardId: boardId,
    },
  });

  if (!newColumn) {
    throw new HttpError("Something went wrong", 400);
  }

  return res.status(201).json(HttpSuccess({ newColumn }));
};

const updateColumn = async (req, res) => {
  const { columnId } = req.params;
  const body = req.body;
  const updateColumn = await prismadb.column.update({
    where: {
      id: columnId,
    },
    data: {
      ...body,
    },
  });

  if (!updateColumn) {
    throw new HttpError("Something went wrong", 400);
  }

  return res.status(200).json(HttpSuccess({ updateColumn }));
};

const deleteColumn = async (req, res) => {
  const { columnId } = req.params;
  const deleteColumn = await prismadb.column.delete({
    where: {
      id: columnId,
    },
  });

  if (!deleteColumn) {
    throw new HttpError("Something went wrong...", 400);
  }

  return res
    .status(200)
    .json(HttpSuccess({ message: "Column success delete" }));
};

module.exports = {
  getAllColumnsByBoard: CtrlWrapper(getAllColumnsByBoard),
  createColumn: CtrlWrapper(createColumn),
  updateColumn: CtrlWrapper(updateColumn),
  deleteColumn: CtrlWrapper(deleteColumn),
};
