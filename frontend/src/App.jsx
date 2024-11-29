import "./App.css";
import TodoList from "/components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const todos = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a To-Do App", completed: true },
    { id: 3, title: "Deploy the App", completed: false },
  ];

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
