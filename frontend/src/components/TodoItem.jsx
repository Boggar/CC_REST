function TodoItem({ todo }) {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
    </li>
  );
}

export default TodoItem;
