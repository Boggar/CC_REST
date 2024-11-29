function TodoItem({ todo, updateTodo, deleteTodo }) {
  const handleUpdate = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(todo.id, updatedTodo);
  };

  return (
    <li className="todo-card">
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button className="edit">Edit</button>
      <button className="delete" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
      <button className="done" onClick={handleUpdate}>
        {todo.completed ? "Undo" : "Done"}
      </button>
    </li>
  );
}

export default TodoItem;
