"use client";

import { useEffect, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  CreateTransaction,
  Transaction,
  TransactionType,
} from "@/schemas/transaction";

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (event: Transaction) => void;
  onSave: (event: CreateTransaction) => void;
  initialDate?: string;
  editEvent?: Transaction | null;
}

const eventTypes = [
  { value: "income", label: "Receita", color: "text-chart-1" },
  { value: "expense", label: "Despesa", color: "text-destructive" },
  // { value: "investment", label: "Investimento", color: "text-chart-2" },
  // { value: "reminder", label: "Lembrete", color: "text-chart-3" },
];

export function EventForm({
  open,
  onClose,
  onUpdate,
  onSave,
  initialDate,
  editEvent,
}: EventFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(
    initialDate || new Date().toISOString().split("T")[0],
  );
  const [type, setType] = useState<TransactionType>("income");
  const [amount, setAmount] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.description);
      setDate(editEvent.transactedAt.toISOString().split("T")[0]);
      setType(editEvent.type);
      setAmount(editEvent.amountInCents);
      const formatted = (editEvent.amountInCents / 100).toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      );
      setDisplay(formatted);
    }
  }, [editEvent]);

  const handleSave = () => {
    if (!title || !date || !type) return;

    if (editEvent) {
      onUpdate({
        ...editEvent,
        description: title,
        transactedAt: new Date(date),
        type,
        amountInCents: amount,
      });
      onClose();
      return;
    }

    onSave({
      description: title,
      transactedAt: new Date(date),
      type,
      amountInCents: amount,
    });

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
          <DialogTitle className="text-foreground">
            {editEvent ? "Editar Evento" : "Novo Evento"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Título
            </Label>
            <Input
              id="title"
              placeholder="Ex: Pagamento do aluguel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-foreground">
              Tipo
            </Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as TransactionType)}
            >
              <SelectTrigger className="border-border bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title || !date}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
