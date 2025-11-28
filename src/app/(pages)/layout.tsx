import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";

import ReactQueryProvider from "@/providers/react-query";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinanceHub - Gerenciamento Financeiro",
  description:
    "Sistema completo de gerenciamento financeiro com ações, crypto e controle de gastos",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
