import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppRouter } from "./AppRouter";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideTodo } from "./hooks/useTodos";
import "./index.css";

ReactDOM.render(
  <ProvideAuth>
    <ProvideTodo>
      <AppRouter>
        <App />
      </AppRouter>
    </ProvideTodo>
  </ProvideAuth>,
  document.getElementById("root")
);
