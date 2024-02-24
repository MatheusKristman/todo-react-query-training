import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { todoId, newContent } = await body;
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.email) {
      throw new Error("Usuário não encontrado!");
    }

    if (!todoId || !newContent) {
      throw new Error("Dados inválidos!");
    }

    const todoEdited = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        content: newContent,
      },
    });

    if (!todoEdited) {
      throw new Error("Erro ao editar a tarefa!");
    }

    const todosUpdated = await prisma.todo.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return Response.json(todosUpdated, { status: 200 });
  } catch (error) {
    console.log(error);

    throw new Error("Ocorreu um erro ao editar a tarefa!");
  }
}
