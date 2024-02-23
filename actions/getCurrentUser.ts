import { getSession } from "./getSession";

import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
}
