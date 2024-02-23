import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { content } = await body;
  const currentUser = await getCurrentUser();

  if (!content) {
    throw new Error("Dados inválidos");
  }

  if (!currentUser) {
    throw new Error("Usuário não encontrado");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  const hasOrder = todos.length > 0;
  let newTodo;

  if (hasOrder) {
    const lastOrder =
      todos[todos.length - 1].order === 0
        ? 1
        : todos[todos.length - 1].order + 1;

    newTodo = await prisma.todo.create({
      data: {
        content,
        order: lastOrder,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
  } else {
    newTodo = await prisma.todo.create({
      data: {
        content,
        order: 0,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
  }

  if (!newTodo) {
    throw new Error("Erro ao criar nova tarefa.");
  }

  todos.push(newTodo);

  return Response.json(todos, { status: 200 });
}
