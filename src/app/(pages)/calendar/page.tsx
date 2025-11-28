"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { EventForm } from "@/components/calendar/event-form";
import { UpcomingEvents } from "@/components/calendar/upcoming-events";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useCreateTransaction } from "@/hooks/mutations/create-transaction";
import { useUpdateTransaction } from "@/hooks/mutations/update-transaction";
import { useTransaction } from "@/hooks/queries/use-transaction";
import { useToast } from "@/hooks/use-toast";
import type { CreateTransaction, Transaction } from "@/schemas/transaction";

export default function CalendarPage() {
  const createTransactionMutation = useCreateTransaction();
  const updateTransactionMutation = useUpdateTransaction();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [editEvent, setEditEvent] = useState<Transaction | null>(null);
  const { data } = useTransaction();
  const { toast } = useToast();

  const handleSaveEvent = (eventData: CreateTransaction) => {
    createTransactionMutation.mutate(eventData);
    toast({
      title: "Evento criado!",
      description: `"${eventData.description}" foi adicionado ao calendário.`,
    });
    setSelectedDate(undefined);
  };

  const handleUpdateEvent = (eventData: Transaction) => {
    if (editEvent) {
      updateTransactionMutation.mutate({
        transactionId: editEvent.id,
        data: {
          description: eventData.description,
          transactedAt: eventData.transactedAt,
          type: eventData.type,
          amountInCents: eventData.amountInCents,
        },
      });
      toast({
        title: "Evento atualizado!",
        description: `"${eventData.description}" foi atualizado com sucesso.`,
      });
    }
    setEditEvent(null);
    setSelectedDate(undefined);
  };

  const handleEventClick = (event: Transaction) => {
    setEditEvent(event);
    setIsFormOpen(true);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setEditEvent(null);
    setIsFormOpen(true);
  };

  const handleEventDrop = (eventId: string, newDate: string) => {
    updateTransactionMutation.mutate({
      transactionId: eventId,
      data: {
        transactedAt: new Date(newDate),
      },
    });
    toast({
      title: "Evento movido!",
      description: "O evento foi reagendado com sucesso.",
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditEvent(null);
    setSelectedDate(undefined);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-bold text-2xl text-foreground">Calendário</h1>
              <p className="text-muted-foreground">
                Gerencie seus compromissos financeiros
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
            <div className="xl:col-span-3">
              <CalendarGrid
                events={data?.transactions || []}
                onEventClick={handleEventClick}
                onDateClick={handleDateClick}
                onEventDrop={handleEventDrop}
              />
            </div>
            <div>
              <UpcomingEvents
                events={data?.transactions || []}
                onEventClick={handleEventClick}
              />
            </div>
          </div>
        </div>
      </main>

      <EventForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveEvent}
        onUpdate={handleUpdateEvent}
        initialDate={selectedDate}
        editEvent={editEvent}
      />
      <Toaster />
    </div>
  );
}
