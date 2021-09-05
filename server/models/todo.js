import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: Number,
    required: true,
    default: "low",
  },
  toBeCompletedBy: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
