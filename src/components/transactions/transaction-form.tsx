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
import type { Currency } from "@/schemas/currency";
import type { CreateInvestmentTransaction } from "@/schemas/investment-transaction";
import type { CreateTransaction, TransactionType } from "@/schemas/transaction";

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
  onSaveTransaction: (transaction: CreateTransaction) => void;
  onSaveInvestment: (transaction: CreateInvestmentTransaction) => void;
}

export function TransactionForm({
  open,
  onClose,
  onSaveTransaction,
  onSaveInvestment,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType | "investment">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [display, setDisplay] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [assetSymbol, setAssetSymbol] = useState("");
  const [assetCurrency, setAssetCurrency] = useState<Currency>("USD");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceDisplay, setPriceDisplay] = useState("");

  const handleSave = () => {
    if (type !== "investment") {
      onSaveTransaction({
        type,
        description,
        amountInCents: amount,
        transactedAt: new Date(date),
      });
    } else {
      onSaveInvestment({
        assetSymbol,
        assetCurrency,
        quantity,
        priceInCents: price,
        totalPaidInCents: quantity * price,
        transactedAt: new Date(date),
      });
    }

    setType("expense");
    setDescription("");
    setAmount(0);
    setDisplay("");
    setDate(new Date().toISOString().split("T")[0]);

    setAssetSymbol("");
    setAssetCurrency("USD");
    setQuantity(0);
    setPrice(0);
    setPriceDisplay("");

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

  function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setPrice(0);
      setPriceDisplay("");
      return;
    }

    const cents = parseInt(raw, 10);
    setPrice(cents);
    setPriceDisplay(
      (cents / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
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

            <Button
              variant="ghost"
              onClick={() => {
                setType("investment");
              }}
              className={cn(
                "flex-1",
                type === "investment"
                  && "border-blue-700 bg-blue-700 text-blue-700-foreground",
              )}
            >
              Investimento
            </Button>
          </div>

          {type !== "investment" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  inputMode="numeric"
                  value={display}
                  onChange={handleChangeAmount}
                />
              </div>
            </>
          )}

          {type === "investment" && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-full space-y-2">
                  <Label>Ativo (ex: PETR4, AAPL)</Label>
                  <Input
                    value={assetSymbol}
                    onChange={(e) =>
                      setAssetSymbol(e.target.value.toUpperCase())
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Moeda</Label>
                  <select
                    className="rounded border bg-secondary p-2"
                    value={assetCurrency}
                    onChange={(e) =>
                      setAssetCurrency(
                        e.target.value as "USD" | "BRL" | "CRYPTO",
                      )
                    }
                  >
                    <option value="USD">USD</option>
                    <option value="BRL">BRL</option>
                    <option value="CRYPTO">CRYPTO</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Preço por unidade</Label>
                <Input
                  inputMode="numeric"
                  placeholder="0,00"
                  value={priceDisplay}
                  onChange={handleChangePrice}
                />
              </div>

              <div className="text-muted-foreground text-sm">
                Total pago:{" "}
                {(quantity * (price / 100)).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </>
          )}

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
            disabled={
              type === "investment"
                ? !assetSymbol || !quantity || !price
                : !description || !amount
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
