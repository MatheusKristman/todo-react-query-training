import axios from "axios";

export interface editTodoProps {
  todoId: string;
  newContent: string;
}

export async function editTodo({ todoId, newContent }: editTodoProps) {
  const { data: todos } = await axios.put("/api/todos/edit", {
    todoId,
    newContent,
  });

  return todos;
}
