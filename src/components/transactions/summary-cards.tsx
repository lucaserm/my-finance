"use client";

import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  income: number;
  expenses: number;
}

export function SummaryCards({ income, expenses }: SummaryCardsProps) {
  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-1/10 p-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Entradas</p>
              <p className="font-bold text-chart-1 text-xl">
                +
                {income.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Saídas</p>
              <p className="font-bold text-destructive text-xl">
                -
                {expenses.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Saldo</p>
              <p
                className={`font-bold text-xl ${balance >= 0 ? "text-chart-1" : "text-destructive"}`}
              >
                {balance.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
