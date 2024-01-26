import { TodoItem } from "./todo-item";

export const TodosDisplayed = () => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
};
