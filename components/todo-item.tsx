import { Edit, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

interface TodoItemProps {
  id: string;
  content: string;
}

export const TodoItem = ({ id, content }: TodoItemProps) => {
  return (
    <div className="w-full bg-gray-secondary border border-white-primary rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <Toggle variant="outline" aria-label="toggle todo" />
        <span className="text-xl font-bold">{content}</span>
      </div>

      <div className="flex items-center gap-x-2">
        <Button variant="ghost">
          <Edit />
        </Button>

        <Button variant="ghost">
          <Trash />
        </Button>
      </div>
    </div>
  );
};
