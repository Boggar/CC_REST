import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:2000/tasks");
      setTodos(response.data);
    } catch (error) {
      console.error("Error: laden der Todos fehlgeschlagen", error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post("http://localhost:2000/tasks/", todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error: Abfragen des Todos fehlgeschlagen", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:2000/tasks/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error: Aktualisieren des Todos fehlgeschlagen", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete("http://localhost:2000/tasks/" + id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error: Löschen des Todos fehlgeschlagen", error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
