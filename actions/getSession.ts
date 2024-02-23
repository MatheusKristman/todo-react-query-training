import { getServerSession } from "next-auth";

export async function getSession() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return null;
  }

  return session;
}
