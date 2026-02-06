"use client";

import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";

import { SummaryCards } from "@/components/transactions/summary-cards";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useCreateInvestmentTransaction } from "@/hooks/mutations/create-investment-transaction";
import { useCreateTransaction } from "@/hooks/mutations/create-transaction";
import { useDeleteTransaction } from "@/hooks/mutations/delete-transaction";
import { useTransaction } from "@/hooks/queries/use-transaction";
import { useToast } from "@/hooks/use-toast";
import type { CreateInvestmentTransaction } from "@/schemas/investment-transaction";
import type { CreateTransaction } from "@/schemas/transaction";
import { formatCurrency } from "@/utils/formatCurrency";

export default function TransactionsPage() {
  const { data, isPending } = useTransaction();
  const createInvestmentTransaction = useCreateInvestmentTransaction();
  const createTransactionMutation = useCreateTransaction();
  const deleteTransactionMutation = useDeleteTransaction();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all",
  );
  const { toast } = useToast();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const filteredTransactions =
    data?.transactions.filter((t) => {
      const matchesSearch = t.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || t.type === filterType;
      return matchesSearch && matchesType;
    }) || [];

  const totalIncome =
    data?.transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amountInCents, 0) || 0;

  const totalExpenses =
    data?.transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amountInCents, 0) || 0;

  const handleSaveTransaction = async (transaction: CreateTransaction) => {
    const newTransaction: CreateTransaction = {
      ...transaction,
    };
    await createTransactionMutation.mutateAsync(newTransaction);
    toast({
      title: "Transação adicionada!",
      description: `${transaction.type === "income" ? "Entrada" : "Saída"} de ${transaction.amountInCents.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
    });
  };

  const handleSaveInvestment = async (
    transaction: CreateInvestmentTransaction,
  ) => {
    const newTransaction: CreateInvestmentTransaction = {
      ...transaction,
    };
    await createInvestmentTransaction.mutateAsync(newTransaction);
    toast({
      title: "Transação adicionada!",
      description: `Investimento de ${formatCurrency(transaction.totalPaidInCents / 100, { locale: "pt-BR", currency: "BRL" })}`,
    });
  };

  const handleDelete = async (transactionId: string) => {
    await deleteTransactionMutation.mutateAsync({ transactionId });
    toast({
      title: "Transação removida",
      description: "A transação foi excluída com sucesso.",
    });
  };

  return (
    <>
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-bold text-2xl text-foreground">Transações</h1>
              <p className="text-muted-foreground">
                Gerencie suas entradas e saídas
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação
            </Button>
          </div>

          <SummaryCards
            income={totalIncome / 100}
            expenses={totalExpenses / 100}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar transação..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border bg-card pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select
                value={filterType}
                onValueChange={(value) =>
                  setFilterType(value as "all" | "income" | "expense")
                }
              >
                <SelectTrigger className="w-[150px] border-border bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="income">Entradas</SelectItem>
                  <SelectItem value="expense">Saídas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TransactionsTable
            transactions={filteredTransactions}
            onDelete={handleDelete}
          />
        </div>
      </main>

      <TransactionForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSaveTransaction={handleSaveTransaction}
        onSaveInvestment={handleSaveInvestment}
      />
      <Toaster />
    </>
  );
}
