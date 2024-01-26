import { TodoForm } from "@/components/todo-form";
import { TodoPanel } from "@/components/todo-panel";
import { TodosDisplayed } from "@/components/todos-displayed";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  return (
    <section className="w-full flex-1 flex justify-center pt-12 lg:pt-24">
      <div className="w-full h-fit max-w-lg">
        <TodoPanel />

        <TodoForm />

        <TodosDisplayed />
      </div>
    </section>
  );
}
