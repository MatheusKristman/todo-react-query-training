import * as z from "zod";

export const todoSchema = z.object({
  todo: z
    .string({
      required_error: "Tarefa é obrigatória",
      invalid_type_error: "Tarefa precisa ser texto",
    })
    .min(1, "Tarefa é obrigatória"),
});
