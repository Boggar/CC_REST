import { useState } from "react";

function TodoForm({ addTodo }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    // Übergebe das richtige Format an die addTodo-Funktion
    addTodo({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button id="add" type="submit" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
