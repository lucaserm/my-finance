import type { Metadata } from "next";
import type React from "react";

import ReactQueryProvider from "@/providers/react-query";
import "./globals.css";

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
      <body className={`font-sans antialiased`}>
        <div className="flex min-h-screen bg-background">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
