"use client";

import { Bell, Calendar, DollarSign, Receipt, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalendarEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const eventIcons = {
  bill: Receipt,
  income: DollarSign,
  investment: TrendingUp,
  reminder: Bell,
};

const eventColors = {
  bill: "bg-destructive/10 text-destructive",
  income: "bg-chart-1/10 text-chart-1",
  investment: "bg-chart-2/10 text-chart-2",
  reminder: "bg-chart-3/10 text-chart-3",
};

export function UpcomingEvents({ events, onEventClick }: UpcomingEventsProps) {
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="h-5 w-5" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length === 0 ? (
          <p className="py-4 text-center text-muted-foreground text-sm">
            Nenhum evento próximo
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const Icon = eventIcons[event.type];
              return (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg bg-secondary/50 p-3 transition-colors hover:bg-secondary"
                >
                  <div
                    className={cn("rounded-full p-2", eventColors[event.type])}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground text-sm">
                      {event.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(event.date + "T12:00:00").toLocaleDateString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "short",
                        },
                      )}
                    </p>
                  </div>
                  {event.amount && (
                    <p
                      className={cn(
                        "font-semibold text-sm",
                        event.type === "bill"
                          ? "text-destructive"
                          : "text-chart-1",
                      )}
                    >
                      {event.type === "bill" ? "-" : "+"}
                      {event.amount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
