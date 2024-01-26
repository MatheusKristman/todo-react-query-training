"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const GoogleLoginButton = () => {
  return (
    <Button
      variant="secondary"
      className="w-full flex items-center justify-center text-lg gap-x-2 mb-6"
      onClick={() =>
        signIn("google", {
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/`,
        })
      }
    >
      <FaGoogle /> Entrar pelo Google
    </Button>
  );
};
