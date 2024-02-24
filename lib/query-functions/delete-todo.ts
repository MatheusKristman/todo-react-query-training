import axios from "axios";

export interface deleteTodoProps {
  todoId: string;
}

export async function deleteTodo({ todoId }: deleteTodoProps) {
  const { data: todos } = await axios.delete(`/api/todos/delete/${todoId}`);

  return todos;
}
