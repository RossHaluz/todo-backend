const {
  HttpError,
  HttpSuccess,
  CtrlWrapper,
  passwordHashing,
  comparePassword,
  createToken,
} = require("../helpers");
const { prismadb } = require("../lib/prismaClient");

const registerUser = async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    throw HttpError("User already exist", 400);
  }

  const hashPassword = await passwordHashing(password);
  const newUser = await prismadb.user.create({
    data: {
      ...body,
      password: hashPassword,
    },
  });

  return res.status(200).json(HttpSuccess({ newUser }));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  console.log(user);

  if (!user) {
    throw HttpError("User not found", 404);
  }

  const comparePass = await comparePassword(user, password);

  if (!comparePass) {
    throw HttpError("Password or email is not correct", 400);
  }

  const token = await createToken(user, (expire = "24h"));

  return res.status(200).json(HttpSuccess({ user, token }));
};

const currentUser = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw HttpError("User not found", 404);
  }

  return res.status(200).json(HttpSuccess(user));
};

module.exports = {
  registerUser: CtrlWrapper(registerUser),
  loginUser: CtrlWrapper(loginUser),
  currentUser: CtrlWrapper(currentUser),
};
