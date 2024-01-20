import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
          placeholder: "Insira o seu e-mail",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error(
              "Credenciais inválidas, verifique e tente novamente"
            );
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user?.hashedPassword) {
            throw new Error(
              "Credenciais inválidas, verifique e tente novamente"
            );
          }

          const passwordCorrect = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!passwordCorrect) {
            throw new Error(
              "Credenciais inválidas, verifique e tente novamente"
            );
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/",
  },
  debug: true,
};

export default NextAuth(authOptions);
