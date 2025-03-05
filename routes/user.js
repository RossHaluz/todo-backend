const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const { registerSchema, loginSchema } = require("../helpers");
const { validateBody, checkAuth } = require("../middlewars");
const router = require("express").Router();

//Register user
router.post("/register", validateBody(registerSchema), registerUser);

//Login user
router.post("/login", validateBody(loginSchema), loginUser);

//Current user
router.get("/current", checkAuth, currentUser);

module.exports = router;
