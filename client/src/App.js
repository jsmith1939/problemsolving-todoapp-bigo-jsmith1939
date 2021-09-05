import { Route, Switch } from "react-router-dom";
import { useProvideAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import TodoLists from "./pages/TodoLists";

function App() {
  const {
    state: { user },
  } = useProvideAuth();

  return (
    <div className="App">
      <ToastContainer />
      {user ? (
        <Switch>
          <Route exact path="/" component={TodoLists} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      )}
    </div>
  );
}

export default App;
