const Todo = require("../models/Todo");
const User = require("../models/User");

// define route handler
exports.createTodo = async (req, res) => {
  try {
    // extract title and description from request body
   
    const {  title, description } = req.body;
    const { id, email } = req.user;
    // create a new Todo obj and insert in DB

    const response = await Todo.create({ title, description });

    // console.log(response);
    await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          todos: response._id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      sucess: true,
      data:response,
      message: "Task created successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: err.message,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    // fetch all data from the data base
    const { id, email } = req.user;

    const user = await User.findById(id).populate({
      path: "todos",
      select: "_id title description completed ", 
    });

    // send a json flag with sucess flag
    res.status(200).json({
      success: true,
      data: user.todos,
      message: "Entire Task data is fetched",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "server error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.user;
    const { todoId } = req.params;
    const { title, description, completed } = req.body;
    const user = await User.findById(id);
   
    const todoIndex = user.todos.findIndex(todo => todo._id.toString() === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Task not found for this user",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Task updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id, email } = req.user;
    const { todoId } = req.params;
    // console.log(todoId);

    const user = await User.findById(id);

    const todoIndex = user.todos.findIndex(todo => todo._id.toString() === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Todo not found for this user",
      });
    }

    
    user.todos.splice(todoIndex, 1);

    // Save the updated user
    await user.save();

    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "server error",
    });
  }
};
