import express from "express";
const router = express.Router();
import { User, Todo } from "../models";
import { requireAuth } from "../middleware";

router.get("/", requireAuth, async (req, res, next) => {
  const { user } = req;
  const populateQuery = [
    {
      path: "todoLists",
      select: [
        "title",
        "description",
        "priority",
        "toBeCompletedBy",
        "completed",
      ],
    },
  ];

  try {
    const selectedUser = await User.findOne({ _id: user._id })
      .populate(populateQuery)
      .exec();
    if (!selectedUser.todoLists) {
      res.json({ message: "You have no todo lists, you should make one" });
    }
    res.json(selectedUser.todoLists);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { title, description, priority, toBeCompletedBy, completed } = req.body;
  const { user } = req;

  const todo = new Todo({
    title,
    description,
    priority,
    toBeCompletedBy,
    completed,
    author: user._id,
  });
  try {
    const savedTodo = await todo.save();

    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $push: { todoLists: savedTodo._id },
      },
      {
        new: true,
      }
    );

    res.json(savedTodo.toJSON());
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { title, description, priority, toBeCompletedBy, completed } = req.body;
  const { user } = req;
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: title,
        description: description,
        priority: priority,
        toBeCompletedBy: toBeCompletedBy,
        completed: completed,
      },
      {
        new: true,
        strict: false,
      }
    );
    res.json(todo);
  } catch (err) {}
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const removedTodo = await Todo.findByIdAndRemove(id);

    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $pull: { todoLists: id },
      },
      {
        new: true,
      }
    );

    res.json({ message: "Successfully removed!" });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

module.exports = router;
