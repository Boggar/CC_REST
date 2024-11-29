function TodoItem({ todo, updateTodo, deleteTodo }) {
  const handleUpdate = () => {
    const updatedTodo = {
      name: todo.name,
      description: todo.description,
      completed: todo.completed,
    };
    updateTodo(todo.id, updatedTodo);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className="todo-card">
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.name} {}
      </span>
      <button className="edit" onClick={handleUpdate}>
        Edit
      </button>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
      <button className="done" onClick={handleUpdate}>
        {todo.completed ? "Undo" : "Done"}
      </button>
    </li>
  );
}

export default TodoItem;
