import { useState } from "react";

function TodoForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just clear the input field
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
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
