import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome precisa ser texto",
    }),
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
    confirmPassword: z
      .string({
        required_error: "Confirmação de senha é obrigatória",
        invalid_type_error: "Senha precisa ser texto",
      })
      .min(
        6,
        "Confirmação de senha inválida, precisa ter pelo menos 6 caracteres"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não são iguais",
    path: ["confirmPassword"],
  });
