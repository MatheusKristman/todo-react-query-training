import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { todoId: string } },
) {
  try {
    const { todoId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser?.email) {
      throw new Error("Usuário não encontrado!");
    }

    if (!todoId) {
      throw new Error("Dados inválidos.");
    }

    const todoDeleted = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    if (!todoDeleted) {
      throw new Error("Tarefa não encontrada!");
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    if (!todos) {
      throw new Error("Tarefas não foram encontradas!");
    }

    const todosUpdated = todos.map((todo, index) => {
      todo.order = index;
      return todo;
    });

    for (let todo of todosUpdated) {
      await prisma.todo.update({
        where: {
          id: todo.id,
        },
        data: {
          order: todo.order,
        },
      });
    }

    return Response.json(todosUpdated, { status: 200 });
  } catch (error) {
    console.log(error);

    throw new Error("Ocorreu um erro ao deletar a tarefa.");
  }
}
