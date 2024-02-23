"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import { TodoForm } from "@/components/todo-form";
import { TodoPanel } from "@/components/todo-panel";
import { TodosDisplayed } from "@/components/todos-displayed";
import { getTodos } from "@/lib/query-functions/get-todos";

export default function Home() {
  const { data, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
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

        <TodosDisplayed isPending={isPending} todos={data} />
      </div>
    </section>
  );
}
