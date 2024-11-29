import "./App.css";
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
      const response = await fetch("http://localhost:2000/tasks/");
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error: laden der Todos fehlgeschlagen", error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await fetch("http://localhost:2000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Fehler beim Hinzufügen des Todos");
      }
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error("Error: Abfragen des Todos fehlgeschlagen", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:2000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Todos");
      }
      const data = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:2000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Todos");
      }
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
