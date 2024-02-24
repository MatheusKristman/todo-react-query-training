import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { todoEditedSchema } from "@/constants/schemas/todo-edited-schema";
import { Dispatch, SetStateAction } from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import { editTodoProps } from "@/lib/query-functions/edit-todo";

interface EditTodoModalProps {
  isEditModalOpen: boolean;
  closeEditModal: () => void;
  todoEditId: string;
  editTodoMutation: UseMutateFunction<any, Error, editTodoProps>;
  isEditPending: boolean;
}

export const EditTodoModal = ({
  isEditModalOpen,
  closeEditModal,
  todoEditId,
  editTodoMutation,
  isEditPending,
}: EditTodoModalProps) => {
  const form = useForm<z.infer<typeof todoEditedSchema>>({
    resolver: zodResolver(todoEditedSchema),
    defaultValues: {
      todoEdited: "",
    },
  });

  function onSubmit(values: z.infer<typeof todoEditedSchema>) {
    editTodoMutation({ todoId: todoEditId, newContent: values.todoEdited });
  }

  return (
    <>
      {isEditModalOpen && (
        <div className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
          <div className="w-full max-w-[600px] bg-gray-primary border border-white-primary px-9 py-6 rounded-2xl inline-block aling-middle">
            <div className="w-full flex flex-col-reverse items-end justify-between gap-4 mb-6 sm:flex-row sm:items-center">
              <h2 className="w-full text-left text-3xl font-bold text-white-primary">
                Edite sua tarefa
              </h2>

              <Button
                disabled={isEditPending}
                onClick={closeEditModal}
                variant="link"
              >
                <X size="40px" className="text-white-primary" />
              </Button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col items-start gap-4"
              >
                <FormField
                  control={form.control}
                  name="todoEdited"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Edite sua tarefa aqui..."
                          disabled={isEditPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full flex flex-col items-center gap-4 sm:w-fit sm:flex-row">
                  <Button
                    disabled={isEditPending}
                    type="submit"
                    className="w-full text-lg font-semibold px-4 group sm:w-fit"
                  >
                    Salvar
                  </Button>

                  <Button
                    onClick={closeEditModal}
                    disabled={isEditPending}
                    type="button"
                    variant="ghost"
                    className="w-full text-lg font-semibold px-4 group sm:w-fit"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
