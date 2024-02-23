import { Todo } from "@prisma/client";
import { todo } from "node:test";
import { Skeleton } from "./ui/skeleton";

interface TodoPanelProps {
  isPending: boolean;
  todos: Todo[];
}

export const TodoPanel = ({ isPending, todos }: TodoPanelProps) => {
  if (isPending) {
    return <TodoPanelSkeleton />;
  }

  const todosReady = todos.filter((todo) => todo.done).length;
  const todosTotal = todos.length;

  return (
    <div className="w-full h-fit border border-white-primary rounded-3xl p-10 flex items-center justify-evenly gap-x-4 mb-6">
      <div className="flex flex-col">
        <span className="text-2xl text-white-primary font-bold">
          Todos Feito
        </span>

        <span className="text-lg text-white-primary font-normal tracking-widest">
          Não desista
        </span>
      </div>

      <div className="w-24 h-24">
        <div className="w-full h-full bg-orange-primary rounded-full flex items-center justify-center">
          <span className="text-3xl text-gray-primary font-bold tracking-widest">
            {`${todosReady}/${todosTotal}`}
          </span>
        </div>
      </div>
    </div>
  );
};

const TodoPanelSkeleton = () => {
  return (
    <div className="w-full h-fit border border-white-primary rounded-3xl p-10 flex items-center justify-evenly gap-x-4 mb-6">
      <div className="flex flex-col gap-y-3">
        <Skeleton className="w-40 h-8" />

        <Skeleton className="w-32 h-4" />
      </div>

      <div className="w-24 h-24">
        <Skeleton className="w-full h-full rounded-full" />
      </div>
    </div>
  );
};
