import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório",
      invalid_type_error: "E-mail precisa ser texto",
    })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
      invalid_type_error: "Senha precisa ser texto",
    })
    .min(6, "Senha inválida, precisa ter pelo menos 6 caracteres"),
});
