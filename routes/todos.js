const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// import controller
const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/task");

// define Api routes
router.post("/createTodo", auth, createTodo);
router.get("/getTodo", auth, getTodo);
router.put("/updateTodo/:todoId", auth, updateTodo);
router.delete("/deleteTodo/:todoId", auth, deleteTodo);
module.exports = router;
