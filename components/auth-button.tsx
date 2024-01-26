"use client";

import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Button } from "./ui/button";

export const AuthButton = () => {
  const { data: session } = useSession();

  console.log(session);

  if (session) {
    return (
      <Button
        variant="ghost"
        className="text-white-primary font-medium text-xl"
        onClick={() => signOut()}
      >
        <LogOut />
      </Button>
    );
  }

  return (
    <Button variant="ghost" asChild>
      <Link
        href="/login"
        className="text-white-primary font-medium text-xl flex items-center gap-1"
      >
        Entrar <LogIn />
      </Link>
    </Button>
  );
};
