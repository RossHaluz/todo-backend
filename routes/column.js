const {
  getAllColumnsByBoard,
  createColumn,
  updateColumn,
  deleteColumn,
} = require("../controllers/columnController");
const { columnSchema } = require("../helpers");
const { validateBody, checkAuth } = require("../middlewars");

const router = require("express").Router();

router.use(checkAuth);

//Get all columns by board
router.get("/:boardId", getAllColumnsByBoard);

//Create column
router.post("/create/:boardId", validateBody(columnSchema), createColumn);

//Update column
router.patch("/update/:columnId", validateBody(columnSchema), updateColumn);

//Delete column
router.delete("/delete/:columnId", deleteColumn);

module.exports = router;
