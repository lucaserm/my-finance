"use client";

import { Calendar, DollarSign, Receipt } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/schemas/transaction";
import { formatDate } from "@/utils/formatDate";

interface UpcomingEventsProps {
  events: Transaction[];
  onEventClick: (event: Transaction) => void;
}

const eventIcons = {
  income: DollarSign,
  expense: Receipt,
  // investment: TrendingUp,
  // reminder: Bell,
};

const eventColors = {
  income: "bg-chart-1/10 text-chart-1",
  expense: "bg-destructive/10 text-destructive",
  // investment: "bg-chart-2/10 text-chart-2",
  // reminder: "bg-chart-3/10 text-chart-3",
};

export function UpcomingEvents({ events, onEventClick }: UpcomingEventsProps) {
  const upcomingEvents = events
    .filter(
      (e) =>
        formatDate(e.transactedAt, { dateStyle: "short" })
        >= formatDate(new Date(), { dateStyle: "short" }),
    )
    .sort((a, b) =>
      formatDate(a.transactedAt).localeCompare(formatDate(b.transactedAt)),
    )
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
                <button
                  type="button"
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg bg-secondary/50 p-3 text-left transition-colors hover:bg-secondary"
                >
                  <div
                    className={cn("rounded-full p-2", eventColors[event.type])}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground text-sm">
                      {event.description}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(event.transactedAt, {
                        timeZone: "America/Sao_Paulo",
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                  {event.amountInCents && (
                    <p
                      className={cn(
                        "font-semibold text-sm",
                        event.type === "expense"
                          ? "text-destructive"
                          : "text-chart-1",
                      )}
                    >
                      {event.type === "expense" ? "-" : "+"}
                      {(event.amountInCents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
