import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../../utils/axiosConfig";
import "./AddTodo.css";

const initialState = {
  title: "",
  description: "",
  priority: 0,
  completed: false,
  error: null,
};

const AddTodo = ({ getTodosList, todosList }) => {
  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddTodo = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      setData({
        ...data,
        error: "All fields must be filled out",
      });
      return;
    }

    // What is the big O notation for the following lines (36-54)
    let match;
    Object.values(data).forEach((value) => {
      for (let i = 0; i < todosList?.length; i++) {
        if (
          value === todosList[i].title ||
          value === todosList[i].description
        ) {
          setData({
            ...data,
            error: "A todo exists with that title or description",
          });
          match = true;
          return;
        }
      }
    });
    if (match) {
      return;
    }
    // end

    try {
      const addTodo = await axios.post(`/todos/`, {
        title: data.title,
        description: data.description,
        priority: data.priority,
        completed: data.completed,
      });
      if (!addTodo) {
        setData({
          ...data,
          errors: addTodo.data,
        });
      }
      getTodosList();
      setData(initialState);
    } catch (err) {
      setData({
        ...data,
        error: err,
      });
    }
  };

  return (
    <div className="AddTodo">
      <h2>Add Todo</h2>
      <Form noValidate onSubmit={handleAddTodo}>
        <Form.Label htmlFor="title">Title:</Form.Label>
        <Form.Control
          type="text"
          size="md"
          name="title"
          maxLength="120"
          placeholder="Todo Title"
          aria-describedby="todo-title-input"
          required
          value={data.title}
          onChange={handleInputChange}
        />
        <Form.Label htmlFor="description">Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          size="lg"
          name="description"
          maxLength="120"
          placeholder="Todo Description"
          aria-describedby="todo-description-input"
          required
          value={data.description}
          onChange={handleInputChange}
        />
        <Form.Label htmlFor="priority">Priority:</Form.Label>
        <select
          className="custom-select"
          name="priority"
          onChange={handleInputChange}
        >
          <option defaultValue>Choose Level of Urgency</option>
          <option value={0}>Low</option>
          <option value={1}>Medium</option>
          <option value={2}>High</option>
        </select>

        <Button className="float-right mt-3" type="submit">
          Add Todo
        </Button>

        {data.error && <span className="form-error">{data.error}</span>}
      </Form>
    </div>
  );
};

export default AddTodo;
