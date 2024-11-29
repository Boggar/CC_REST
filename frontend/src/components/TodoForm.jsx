import { useState } from "react";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title, completed: false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new to-do"
      />
      <button id="add" type="submit" method="POST">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
