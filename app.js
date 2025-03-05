const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();

const app = express();

//Routes
const userRoutes = require("./routes/user");
const boardRoutes = require("./routes/board");
const columnRoutes = require('./routes/column');
const taskRoutes = require('./routes/task');

//Middlewars
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/column", columnRoutes);
app.use('/api/task', taskRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  return res.status(status).json({ message });
});

module.exports = {
  app,
};
