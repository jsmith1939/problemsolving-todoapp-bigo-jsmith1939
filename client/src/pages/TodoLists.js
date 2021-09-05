import { TodoList } from "../components";
import { useProvideAuth } from "../hooks/useAuth";

const TodoLists = () => {
  const { state: { user } } = useProvideAuth();
  
  return (
    <div className="TodoLists">
    <h1>{user.username}'s TodoList</h1>
      <TodoList />
    </div>
  );
};

export default TodoLists;
