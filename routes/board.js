const {
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardDetails,
  getAllBoards,
  getBoardByUser,
  addMemberToBillboard,
} = require("../controllers/boardController");
const { boardSchema } = require("../helpers");
const { checkAuth, validateBody } = require("../middlewars");
const router = require("express").Router();

router.use(checkAuth);

//Get all boards
router.get("/", getAllBoards);

//Get first board by user
router.get("/user", getBoardByUser);

//Create board
router.post("/create", validateBody(boardSchema), createBoard);

//Update board
router.patch("/update/:boardId", validateBody(boardSchema), updateBoard);

//Delete board
router.delete("/delete/:boardId", deleteBoard);

//Get board details
router.get("/:boardId", getBoardDetails);

//Add member to board
router.post("/:billboardId/member", addMemberToBillboard);

module.exports = router;
