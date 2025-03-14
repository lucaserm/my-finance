"use client";
import TransactionForm, {
  NewTransaction,
} from "@/app/components/TransactionForm";
import TransactionList from "@/app/components/TransactionList";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Transaction extends NewTransaction {
  id: string;
  categoryId?: string;
  date?: string;
  amount: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      amount: "123",
      description: "Salário",
      isIncome: true,
      categoryId: "1",
      date: new Date().toLocaleString(),
    },
    {
      id: "2",
      amount: "50",
      description: "Supermercado",
      isIncome: false,
      categoryId: "1",
      date: new Date().toLocaleString(),
    },
  ]);

  const addTransaction = (transaction: NewTransaction) => {
    setTransactions((prevState) => [
      ...prevState,
      { ...transaction, id: (transactions.length + 1).toString() },
    ]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <h1 className="text-xl font-bold mb-4">Transações</h1>
      <TransactionList
        transactions={transactions}
        removeTransaction={removeTransaction}
      />
      <TransactionForm addTransaction={addTransaction} />
    </div>
  );
}
