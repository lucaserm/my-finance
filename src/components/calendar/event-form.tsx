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
import type { CalendarEvent } from "@/lib/types";

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  initialDate?: string;
  editEvent?: CalendarEvent | null;
}

const eventTypes = [
  { value: "bill", label: "Conta a Pagar", color: "text-destructive" },
  { value: "income", label: "Receita", color: "text-chart-1" },
  { value: "investment", label: "Investimento", color: "text-chart-2" },
  { value: "reminder", label: "Lembrete", color: "text-chart-3" },
];

export function EventForm({
  open,
  onClose,
  onSave,
  initialDate,
  editEvent,
}: EventFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<CalendarEvent["type"]>("reminder");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setDate(editEvent.date);
      setType(editEvent.type);
      setAmount(editEvent.amount?.toString() || "");
    } else {
      setTitle("");
      setDate(initialDate || new Date().toISOString().split("T")[0]);
      setType("reminder");
      setAmount("");
    }
  }, [editEvent, initialDate, open]);

  const handleSave = () => {
    if (!title || !date || !type) return;

    onSave({
      title,
      date,
      type,
      amount: amount ? Number.parseFloat(amount) : undefined,
    });

    onClose();
  };

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
              onValueChange={(v) => setType(v as CalendarEvent["type"])}
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

          {type !== "reminder" && (
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">
                Valor (R$)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-border bg-secondary"
              />
            </div>
          )}
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
