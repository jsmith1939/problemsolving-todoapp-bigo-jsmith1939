import React, { useReducer, useContext, createContext } from "react";
import axios from "../utils/axiosConfig";

const initialState = {
  todosList: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todosList: action.payload
      };
    default:
      return state;
  }
}

const todoContext = createContext();

export function ProvideTodo({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <todoContext.Provider value={{state, dispatch}} >
    {children}
    </todoContext.Provider>
  )
}

export const useTodos = () => {
  return useContext(todoContext)
}

export function useProvideTodo() {
  const { state, dispatch } = useTodos();

  const getTodos = async () => {
    try {
      const todos = await axios.get('todos/')
      dispatch({ type: "GET_TODOS", payload: todos })
      return todos
    } catch (err) {
      console.log(err)
    }
  }

  return {
    state,
    getTodos,
  }
}

// TODO -- Finish hooking this up to use throughout app