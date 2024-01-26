"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { todoSchema } from "@/constants/schemas/todo-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";

export const TodoForm = () => {
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo: "",
    },
  });

  function onSubmit(values: z.infer<typeof todoSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-start justify-between gap-x-4 mb-6 px-2"
      >
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Digite sua tarefa..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-fit text-base font-semibold rounded-full px-2 group"
        >
          <Plus className="text-gray-primary group-hover:text-white transition-colors" />
        </Button>
      </form>
    </Form>
  );
};
