import axios from "axios";

interface createTodoProps {
  todo: string;
}

export async function createTodo({ todo }: createTodoProps) {
  const { data: todos } = await axios.post("/api/todos/create", {
    content: todo,
  });

  return todos;
}
