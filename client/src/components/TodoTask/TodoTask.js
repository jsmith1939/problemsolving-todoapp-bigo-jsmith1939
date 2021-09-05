import { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";
import "./TodoTask.css";

const initialState = {
  title: "",
  description: "",
  priority: 0,
  toBeCompletedBy: "",
  completed: false,
  error: null,
};

const bgColor = ["green", "yellow", "red"];

const TodoTask = ({ todo, getTodosList }) => {
  const [task, setTask] = useState(initialState);
  const [edit, setEdit] = useState(false);

  const handleInputChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      const deletedTask = await axios.delete(`/todos/${todo._id}`);

      if (!deletedTask) {
        setTask({
          ...task,
          error: deletedTask.message,
        });
        return;
      }

      getTodosList();
    } catch (err) {
      setTask({
        ...task,
        error: err,
      });
    }
  };

  const handleCheckboxChange = async (event) => {
    setTask({
      ...task,
      completed: event.target.checked,
    });
    try {
      const updatedTask = await axios.put(`/todos/${todo._id}`, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        toBeCompletedBy: task.toBeCompletedBy,
        completed: event.target.checked,
      });
      if (!updatedTask) {
        setTask({
          ...task,
          error: "problem updating todo",
        });
      }
      getTodosList();
    } catch (err) {
      setTask({
        ...task,
        error: err,
      });
    }
  };

  const handleTaskChange = async () => {
    try {
      const updatedTask = await axios.put(`/todos/${todo._id}`, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        toBeCompletedBy: task.toBeCompletedBy,
        completed: task.completed,
      });
      if (!updatedTask) {
        setTask({
          ...task,
          error: "problem updating todo",
        });
      } else {
        setTask({
          ...task,
          title: updatedTask.data.title,
          description: updatedTask.data.description,
          priority: updatedTask.data.priority,
          toBeCompletedBy: updatedTask.data.toBeCompletedBy,
          completed: updatedTask.data.completed,
        });
      }
      getTodosList();
      setEdit(!edit);
    } catch (err) {
      setTask({
        ...task,
        error: err,
      });
    }
  };

  useEffect(() => {
    if (todo) {
      setTask({
        ...task,
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        toBeCompletedBy: todo.toBeCompletedBy,
        completed: todo.completed,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <li className="task" style={{ backgroundColor: bgColor[task.priority] }}>
      {edit ? (
        <>
          <input
            type="checkbox"
            name="completed"
            className="completed"
            checked={task.completed}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <input
            type="text"
            name="title"
            className="title"
            value={task.title}
            onChange={handleInputChange}
          />
          <p className="notButton" onClick={handleTaskChange}>
            Save
          </p>
          <p className="notButton delete" onClick={handleDelete}>
            Delete
          </p>
          <input
            type="text"
            name="description"
            className="description"
            value={task.description}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <input
            type="checkbox"
            name="completed"
            className="completed"
            checked={task.completed}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <p className="title">{todo.title}</p>
          <p className="notButton" onClick={(e) => setEdit(true)}>
            Edit
          </p>
          <p className="notButton delete" onClick={handleDelete}>
            Delete
          </p>{" "}
          <br />
          <div className="description">
            <p>{task.description}</p>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoTask;
