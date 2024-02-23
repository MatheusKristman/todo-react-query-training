import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";
import { NoTodo } from "./no-todo";
import { TodosLoading } from "./todos-loading";

interface TodosDisplayedProps {
  isPending: boolean;
  todos: Todo[];
}

export const TodosDisplayed = ({ isPending, todos }: TodosDisplayedProps) => {
  if (isPending) {
    return <TodosLoading />;
  }

  if (todos.length === 0) {
    return <NoTodo />;
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} content={todo.content} />
      ))}
    </div>
  );
};
