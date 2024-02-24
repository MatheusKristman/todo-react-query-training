"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { TodoForm } from "@/components/todo-form";
import { TodoPanel } from "@/components/todo-panel";
import { TodosDisplayed } from "@/components/todos-displayed";
import { getTodos } from "@/lib/query-functions/get-todos";
import { deleteTodo } from "@/lib/query-functions/delete-todo";
import { editTodo } from "@/lib/query-functions/edit-todo";

export default function Home() {
  const queryClient = useQueryClient();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [todoEditId, setTodoEditId] = useState<string>("");

  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  function openEditModal(id: string) {
    setTodoEditId(id);
    setIsEditModalOpen(true);
  }

  const { data, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate: deleteTodoMutation, isPending: isDeletePending } =
    useMutation({
      mutationFn: deleteTodo,
      onSuccess: (data) => {
        queryClient.setQueryData(["todos"], data);
        toast.success("Tarefa deletada com sucesso.");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao deletar a tarefa");
      },
    });

  const { mutate: editTodoMutation, isPending: isEditPending } = useMutation({
    mutationFn: editTodo,
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], data);
      toast.success("Tarefa editada com sucesso.");
      setIsEditModalOpen(false);
      setTodoEditId("");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Ocorreu um erro ao editar a tarefa");
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Ocorreu um erro na solicitação das tarefas.");
    }
  }, [error]);

  return (
    <section className="w-full flex-1 flex justify-center pt-12 lg:pt-24">
      <div className="w-full h-fit max-w-lg">
        <TodoPanel isPending={isPending} todos={data} />

        <TodoForm isTodoPending={isPending} />

        <TodosDisplayed
          closeEditModal={closeEditModal}
          openEditModal={openEditModal}
          todoEditId={todoEditId}
          isEditModalOpen={isEditModalOpen}
          isPending={isPending}
          deleteTodoMutation={deleteTodoMutation}
          isDeletePending={isDeletePending}
          editTodoMutation={editTodoMutation}
          isEditPending={isEditPending}
          todos={data}
        />
      </div>
    </section>
  );
}
