import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import { Header } from "@/components/header";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { cn } from "@/lib/utils";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO App",
  description: "Site para lista de tarefas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(montserrat.className, "bg-gray-primary flex flex-col")}
      >
        <AuthProvider>
          <QueryProvider>
            <Header />
            {children}
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
