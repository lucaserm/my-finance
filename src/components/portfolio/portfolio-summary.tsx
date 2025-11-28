"use client";

import { Briefcase, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioItem } from "@/lib/types";

interface PortfolioSummaryProps {
  portfolio: PortfolioItem[];
}

export function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const totalInvested = portfolio.reduce(
    (sum, item) => sum + item.purchasePrice * item.quantity,
    0,
  );

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.currentValue,
    0,
  );

  const totalProfit = totalValue - totalInvested;
  const profitPercent =
    totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  const stats = [
    {
      title: "Total Investido",
      value: totalInvested,
      icon: DollarSign,
      color: "text-muted-foreground",
      bgColor: "bg-secondary",
    },
    {
      title: "Valor Atual",
      value: totalValue,
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Rendimento Total",
      value: totalProfit,
      icon: totalProfit >= 0 ? TrendingUp : TrendingDown,
      color: totalProfit >= 0 ? "text-chart-1" : "text-destructive",
      bgColor: totalProfit >= 0 ? "bg-chart-1/10" : "bg-destructive/10",
      percent: profitPercent,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              {stat.percent !== undefined && (
                <span
                  className={`font-medium text-sm ${stat.percent >= 0 ? "text-chart-1" : "text-destructive"}`}
                >
                  {stat.percent >= 0 ? "+" : ""}
                  {stat.percent.toFixed(2)}%
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground text-sm">{stat.title}</p>
              <p
                className={`font-bold text-2xl ${stat.color === "text-muted-foreground" ? "text-foreground" : stat.color}`}
              >
                {stat.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
