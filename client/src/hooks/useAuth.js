import React, { useReducer, useEffect, useContext, createContext } from "react";
import useRouter from "./useRouter";
import axios from "../utils/axiosConfig";

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <authContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  const router = useRouter();

  const signin = async (username, password) => {
    try {
      const response = await axios.post(`auth/signin`, {
        username: username,
        password: password,
      });
      localStorage.setItem("TodoAppUser", JSON.stringify(response.data));
      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
      return response;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signup = async (username, password) => {
    try {
      await axios.post(`auth/signup`, {
        username: username,
        password: password,
      });
      return await signin(username, password);
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signout = () => {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("TodoAppUser"));
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("TodoAppUser")) || false;
    if (savedUser) {
      dispatch({
        type: "LOGIN",
        payload: savedUser,
      });
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [dispatch]);

  // Return the user object and auth methods
  return {
    state,
    getCurrentUser,
    signin,
    signup,
    signout,
  };
}
