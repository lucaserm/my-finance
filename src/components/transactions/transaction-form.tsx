"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/schemas/transaction";

const categories = {
  income: ["Salário", "Freelance", "Dividendos", "Investimentos", "Outros"],
  expense: [
    "Moradia",
    "Alimentação",
    "Transporte",
    "Saúde",
    "Lazer",
    "Educação",
    "Outros",
  ],
};

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    transaction: Omit<Transaction, "id" | "userId" | "createdAt" | "updatedAt">,
  ) => void;
}

export function TransactionForm({
  open,
  onClose,
  onSave,
}: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [display, setDisplay] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSave = () => {
    onSave({
      type,
      description,
      amountInCents: amount,
      transactedAt: new Date(date),
    });

    setType("expense");
    setDescription("");
    setAmount(0);
    setDisplay("");
    setDate(new Date().toISOString().split("T")[0]);
    onClose();
  };

  function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");

    if (!raw) {
      setAmount(0);
      setDisplay("");
      return;
    }

    const cents = parseInt(raw, 10);
    setAmount(cents);

    const formatted = (cents / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setDisplay(formatted);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground">Nova Transação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setType("income");
              }}
              className={cn(
                "flex-1",
                type === "income"
                  && "border-chart-1 bg-chart-1 text-chart-1-foreground",
              )}
            >
              Entrada
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setType("expense");
              }}
              className={cn(
                "flex-1",
                type === "expense"
                  && "border-destructive bg-destructive text-destructive-foreground",
              )}
            >
              Saída
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Ex: Compras no mercado"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-border bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">
              Valor (R$)
            </Label>
            <Input
              id="amount"
              inputMode="numeric"
              step="0.01"
              placeholder="0,00"
              value={display}
              onChange={handleChangeAmount}
              className="border-border bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-border bg-secondary"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!description || !amount}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
