const { HttpError, HttpSuccess, CtrlWrapper } = require("../helpers");
const { prismadb } = require("../lib/prismaClient");

const getAllBoards = async (req, res) => {
  const userId = req.userId;
  const boards = await prismadb.billboard.findMany({
    where: {
      userId,
    },
  });

  const memberBoards = await prismadb.billboard.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
    include: {
      members: true,
    },
  });

  return res.status(200).json(HttpSuccess({ boards, memberBoards }));
};

const createBoard = async (req, res) => {
  const userId = req.userId;
  const body = req.body;
  const newBoard = await prismadb.billboard.create({
    data: {
      ...body,
      userId,
    },
  });

  if (!newBoard) {
    throw HttpError("Something went wrong", 400);
  }

  return res.status(201).json(HttpSuccess({ newBoard }));
};

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const body = req.body;
  const board = await prismadb.billboard.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    throw HttpError("Board not found", 404);
  }

  const updateBoard = await prismadb.billboard.update({
    where: {
      id: boardId,
    },
    data: {
      ...body,
    },
  });

  if (!updateBoard) {
    throw HttpError("Something went wrong...", 400);
  }

  return res.status(200).json(HttpSuccess({ updateBoard }));
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const deleteBoard = await prismadb.billboard.delete({
    where: {
      id: boardId,
    },
  });

  if (!deleteBoard) {
    throw HttpError("Board not delete.", 400);
  }

  return res.status(200).json(HttpSuccess({ message: "Board success delete" }));
};

const getBoardDetails = async (req, res) => {
  const { boardId } = req.params;
  const board = await prismadb.billboard.findUnique({
    where: {
      id: boardId,
    },
    include: {
      columns: {
        include: {
          tasks: true,
        },
      },
    },
  });

  if (!board) {
    throw HttpError("Board not found", 404);
  }

  return res.status(200).json(HttpSuccess({ board }));
};

const getBoardByUser = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const board = await prismadb.billboard.findFirst({
    where: {
      userId,
    },
  });

  if (!board) {
    throw new HttpError("Board not found", 404);
  }

  return res.status(200).json(HttpSuccess({ board }));
};

const addMemberToBillboard = async (req, res) => {
  const { billboardId } = req.params;
  const { email, role } = req.body;

  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw HttpError("User not found", 404);
  }

  const existingMember = await prismadb.billboardMember.findFirst({
    where: {
      userId: user?.id,
      billboardId: billboardId,
    },
  });

  if (existingMember) {
    throw HttpError("User already a member", 400);
  }

  const newMember = await prismadb.billboardMember.create({
    data: {
      billboardId,
      userId: user?.id,
      role,
    },
  });

  return res.status(200).json(HttpSuccess({ newMember }));
};

module.exports = {
  getAllBoards: CtrlWrapper(getAllBoards),
  createBoard: CtrlWrapper(createBoard),
  updateBoard: CtrlWrapper(updateBoard),
  deleteBoard: CtrlWrapper(deleteBoard),
  getBoardDetails: CtrlWrapper(getBoardDetails),
  getBoardDetails: CtrlWrapper(getBoardDetails),
  getBoardByUser: CtrlWrapper(getBoardByUser),
  addMemberToBillboard: CtrlWrapper(addMemberToBillboard),
};
