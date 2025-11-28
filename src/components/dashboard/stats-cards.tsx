"use client";

import { BarChart3, TrendingDown, TrendingUp, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  portfolioValue: number;
  portfolioChange: number;
}

export function StatsCards({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
  portfolioValue,
  portfolioChange,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Saldo Total",
      value: totalBalance,
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Receitas (Mês)",
      value: monthlyIncome,
      icon: TrendingUp,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Despesas (Mês)",
      value: monthlyExpenses,
      icon: TrendingDown,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      trend: "-3.2%",
      trendUp: false,
    },
    {
      title: "Portfólio",
      value: portfolioValue,
      icon: BarChart3,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      trend: `${portfolioChange >= 0 ? "+" : ""}${portfolioChange.toFixed(1)}%`,
      trendUp: portfolioChange >= 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={cn("rounded-lg p-2", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              {stat.trend && (
                <span
                  className={cn(
                    "rounded-full px-2 py-1 font-medium text-xs",
                    stat.trendUp
                      ? "bg-chart-1/10 text-chart-1"
                      : "bg-destructive/10 text-destructive",
                  )}
                >
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground text-sm">{stat.title}</p>
              <p className="mt-1 font-bold text-2xl text-foreground">
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
