import React, { useState, useEffect } from "react";
import { TodoTask, AddTodo } from "../index";
import axios from "../../utils/axiosConfig";
import "./TodoList.css";

const initialState = {
  todosList: null,
  errors: null,
};

const TodoList = () => {
  const [data, setData] = useState(initialState);

  const getTodosList = async () => {
    try {
      const allTodos = await axios.get("todos/");
      if (allTodos.data.length === 0) {
        setData({
          ...data,
          errors: "You have no todo lists, you should make one",
        });
      } else {
        setData({
          ...data,
          todosList: allTodos.data,
          errors: null,
        });
      }
    } catch (err) {
      setData({
        ...data,
        errors: err,
      });
    }
  };

  useEffect(() => {
    getTodosList();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="TodoList">
      <AddTodo getTodosList={getTodosList} todosList={data.todosList} />
      {data.errors ? (
        <span>{data.errors}</span>
      ) : (
        <ul className="todoDisplay">
          {/* What is the Big O Notation of the following lines (50-54) */}
          {data.todosList &&
            data.todosList.length > 0 &&
            data.todosList.map((item, index) => (
              <TodoTask todo={item} key={index} getTodosList={getTodosList} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
