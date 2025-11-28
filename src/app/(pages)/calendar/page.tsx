"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { EventForm } from "@/components/calendar/event-form";
import { UpcomingEvents } from "@/components/calendar/upcoming-events";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { mockCalendarEvents } from "@/lib/mock-data";
import type { CalendarEvent } from "@/lib/types";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const { toast } = useToast();

  const handleSaveEvent = (eventData: Omit<CalendarEvent, "id">) => {
    if (editEvent) {
      setEvents(
        events.map((e) =>
          e.id === editEvent.id ? { ...eventData, id: editEvent.id } : e,
        ),
      );
      toast({
        title: "Evento atualizado!",
        description: `"${eventData.title}" foi atualizado com sucesso.`,
      });
    } else {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Date.now().toString(),
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Evento criado!",
        description: `"${eventData.title}" foi adicionado ao calendário.`,
      });
    }
    setEditEvent(null);
    setSelectedDate(undefined);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditEvent(event);
    setIsFormOpen(true);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setEditEvent(null);
    setIsFormOpen(true);
  };

  const handleEventDrop = (eventId: string, newDate: string) => {
    setEvents(
      events.map((e) => (e.id === eventId ? { ...e, date: newDate } : e)),
    );
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <CalendarGrid
                events={events}
                onEventClick={handleEventClick}
                onDateClick={handleDateClick}
                onEventDrop={handleEventDrop}
              />
            </div>
            <div>
              <UpcomingEvents events={events} onEventClick={handleEventClick} />
            </div>
          </div>
        </div>
      </main>

      <EventForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveEvent}
        initialDate={selectedDate}
        editEvent={editEvent}
      />
      <Toaster />
    </div>
  );
}
