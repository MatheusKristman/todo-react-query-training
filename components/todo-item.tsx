import { Edit, Trash } from "lucide-react";
import { UseMutateFunction } from "@tanstack/react-query";

import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { deleteTodoProps } from "@/lib/query-functions/delete-todo";
import { editTodoProps } from "@/lib/query-functions/edit-todo";
import { EditTodoModal } from "./edit-todo-modal";

interface TodoItemProps {
  id: string;
  content: string;
  isDeletePending: boolean;
  deleteTodo: UseMutateFunction<any, Error, deleteTodoProps>;
  openEditModal: (id: string) => void;
}

export const TodoItem = ({
  id,
  content,
  isDeletePending,
  deleteTodo,
  openEditModal,
}: TodoItemProps) => {
  return (
    <>
      <div className="w-full bg-gray-secondary border border-white-primary rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Toggle variant="outline" aria-label="toggle todo" />
          <span className="text-xl font-bold">{content}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => openEditModal(id)}
            disabled={isDeletePending}
            variant="ghost"
          >
            <Edit />
          </Button>

          <Button
            disabled={isDeletePending}
            onClick={() => deleteTodo({ todoId: id })}
            variant="ghost"
          >
            <Trash />
          </Button>
        </div>
      </div>
    </>
  );
};
