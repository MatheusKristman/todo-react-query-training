import axios from "axios";

export async function getTodos() {
  const { data: todos } = await axios.get("/api/todos/get");

  return todos;
}
