"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/schemas/transaction";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "rounded-full p-2",
                    transaction.type === "income"
                      ? "bg-chart-1/10 text-chart-1"
                      : "bg-destructive/10 text-destructive",
                  )}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {transaction.description}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {/* {transaction.category} */}123
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "font-semibold text-sm",
                    transaction.type === "income"
                      ? "text-chart-1"
                      : "text-destructive",
                  )}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {(transaction.amountInCents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-muted-foreground text-xs">
                  {new Date(transaction.transactedAt).toLocaleDateString(
                    "pt-BR",
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
