import type { Metadata } from "next";
import type React from "react";
import { Inter } from "next/font/google";

import ReactQueryProvider from "@/providers/react-query";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinanceHub - Gerenciamento Financeiro",
  description:
    "Sistema completo de gerenciamento financeiro com ações, crypto e controle de gastos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen bg-background">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
