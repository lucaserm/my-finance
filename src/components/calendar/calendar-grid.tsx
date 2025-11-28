"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CalendarEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: string) => void;
  onEventDrop: (eventId: string, newDate: string) => void;
}

const eventColors = {
  bill: "bg-destructive/20 text-destructive border-destructive/30",
  income: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  investment: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  reminder: "bg-chart-3/20 text-chart-3 border-chart-3/30",
};

export function CalendarGrid({
  events,
  onEventClick,
  onDateClick,
  onEventDrop,
}: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);

  const { days, monthName, year } = useMemo(() => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const startPadding = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - i - 1);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
        isCurrentMonth: true,
      });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(lastDay);
      date.setDate(date.getDate() + i);
      days.push({ date, isCurrentMonth: false });
    }

    return {
      days,
      monthName: currentDate.toLocaleDateString("pt-BR", { month: "long" }),
      year: currentDate.getFullYear(),
    };
  }, [currentDate]);

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((e) => e.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleDragStart = (e: React.DragEvent, event: CalendarEvent) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    if (draggedEvent) {
      const newDate = date.toISOString().split("T")[0];
      onEventDrop(draggedEvent.id, newDate);
      setDraggedEvent(null);
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear()
    );
  };

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-border border-b p-4">
        <h2 className="font-semibold text-foreground text-lg capitalize">
          {monthName} {year}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7">
        {weekDays.map((day) => (
          <div
            key={day}
            className="border-border border-b bg-secondary/50 p-2 text-center font-medium text-muted-foreground text-sm"
          >
            {day}
          </div>
        ))}

        {days.map(({ date, isCurrentMonth }, index) => {
          const dayEvents = getEventsForDate(date);
          const dateStr = date.toISOString().split("T")[0];

          return (
            <div
              key={index}
              className={cn(
                "min-h-[100px] border-border border-r border-b p-1 transition-colors",
                !isCurrentMonth && "bg-secondary/30",
                isToday(date) && "bg-primary/5",
              )}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, date)}
            >
              <div className="mb-1 flex items-center justify-between">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full font-medium text-sm",
                    !isCurrentMonth && "text-muted-foreground",
                    isCurrentMonth && "text-foreground",
                    isToday(date) && "bg-primary text-primary-foreground",
                  )}
                >
                  {date.getDate()}
                </span>
                {isCurrentMonth && (
                  <button
                    onClick={() => onDateClick(dateStr)}
                    className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event)}
                    onClick={() => onEventClick(event)}
                    className={cn(
                      "cursor-grab truncate rounded border px-1.5 py-0.5 text-xs active:cursor-grabbing",
                      eventColors[event.type],
                    )}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="px-1 text-muted-foreground text-xs">
                    +{dayEvents.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
