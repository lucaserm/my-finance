"use client";

import { ArrowDownRight, ArrowUpRight, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/schemas/transaction";

interface TransactionsTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionsTable({
  transactions,
  onDelete,
}: TransactionsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="text-muted-foreground">Tipo</TableHead>
            <TableHead className="text-muted-foreground">Descrição</TableHead>
            <TableHead className="text-muted-foreground">Categoria</TableHead>
            <TableHead className="text-muted-foreground">Data</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Valor
            </TableHead>
            <TableHead className="w-12 text-muted-foreground"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-secondary/30">
              <TableCell>
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
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
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {transaction.description}
              </TableCell>
              <TableCell>
                <span className="rounded-full bg-secondary px-2 py-1 text-muted-foreground text-xs">
                  {/* {transaction.category} 123 */}
                  123
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(transaction.transactedAt).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-semibold",
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
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(transaction.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
