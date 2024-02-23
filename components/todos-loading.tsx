import { Loader2 } from "lucide-react";

export const TodosLoading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <Loader2 size="50px" className="animate-spin text-white-primary" />

      <span className="text-lg text-white-primary text-center font-semibold">
        Procurando Tarefas
      </span>
    </div>
  );
};
