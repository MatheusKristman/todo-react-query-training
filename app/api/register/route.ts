import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword } = await body;

    if (!name || !email || !password || !confirmPassword) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    if (password !== confirmPassword) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse("Usuário já esta cadastrado", { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!hashedPassword) {
      return new NextResponse("Ocorreu um erro durante a criação da conta", {
        status: 400,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    if (!newUser) {
      return new NextResponse("Ocorreu um erro durante a criação da conta", {
        status: 400,
      });
    }

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(`[ERROR_REGISTER]: ${error}`);
    return new NextResponse("Erro ao realizar o cadastro", { status: 500 });
  }
}
