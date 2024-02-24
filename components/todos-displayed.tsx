import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";
import { NoTodo } from "./no-todo";
import { TodosLoading } from "./todos-loading";
import { UseMutateFunction } from "@tanstack/react-query";
import { deleteTodoProps } from "@/lib/query-functions/delete-todo";
import { editTodo, editTodoProps } from "@/lib/query-functions/edit-todo";
import { EditTodoModal } from "./edit-todo-modal";
import { Dispatch, SetStateAction } from "react";

interface TodosDisplayedProps {
  closeEditModal: () => void;
  openEditModal: (id: string) => void;
  todoEditId: string;
  isEditModalOpen: boolean;
  isPending: boolean;
  todos: Todo[];
  isDeletePending: boolean;
  deleteTodoMutation: UseMutateFunction<any, Error, deleteTodoProps>;
  isEditPending: boolean;
  editTodoMutation: UseMutateFunction<any, Error, editTodoProps>;
}

export const TodosDisplayed = ({
  closeEditModal,
  openEditModal,
  todoEditId,
  isEditModalOpen,
  isPending,
  todos,
  isDeletePending,
  deleteTodoMutation,
  isEditPending,
  editTodoMutation,
}: TodosDisplayedProps) => {
  if (isPending) {
    return <TodosLoading />;
  }

  if (todos.length === 0) {
    return <NoTodo />;
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <EditTodoModal
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        todoEditId={todoEditId}
        editTodoMutation={editTodoMutation}
        isEditPending={isEditPending}
      />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          content={todo.content}
          deleteTodo={deleteTodoMutation}
          isDeletePending={isDeletePending}
          openEditModal={openEditModal}
        />
      ))}
    </div>
  );
};
