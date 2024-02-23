import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Usuário não encontrado");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: currentUser.id,
    },
  });

  return Response.json(todos, { status: 200 });
}
