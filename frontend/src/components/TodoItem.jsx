import { useState } from "react";

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [description, setDescription] = useState(todo.description);
  const handleUpdate = () => {
    const updatedTodo = {
      name: todo.name,
      description: description,
    };
    updateTodo(todo.id, updatedTodo);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDescriptionSave = () => {
    const updatedTodo = {
      name: todo.name,
      description: description,
    };
    updateTodo(todo.id, updatedTodo);
  };

  return (
    <li className="todo-card">
      <span style={{ fontWeight: "bold", marginBottom: "10px" }}>
        {todo.name}
      </span>

      <span style={{ marginBottom: "10px" }}>{todo.description}</span>

      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Edit description"
        style={{
          marginBottom: "10px",
          textAlign: "center",
          padding: "5px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      />

      <button className="edit" onClick={handleUpdate}>
        Edit
      </button>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
