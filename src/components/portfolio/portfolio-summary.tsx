"use client";

import { Briefcase, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useStocks } from "@/hooks/queries/use-stocks";
import type { PortfolioItem } from "@/schemas/portfolio-item";
import { formatCurrency } from "@/utils/formatCurrency";

interface PortfolioSummaryProps {
  portfolioItem: PortfolioItem[];
}

export function PortfolioSummary({ portfolioItem }: PortfolioSummaryProps) {
  const { data, isPending } = useStocks({
    params: portfolioItem.map((item) => ({
      symbol: item.assetSymbol,
      currency: item.assetCurrency,
    })),
  });

  if (isPending || !data) {
    return <div>Loading...</div>;
  }

  const totalInvested = portfolioItem.reduce(
    (sum, item) => sum + item.totalInvestedInCents / 100,
    0,
  );

  const mergedLists = data.stocks.map((stock) => {
    const item = portfolioItem.find((item) => {
      return stock.symbol.includes(item.assetSymbol);
    });

    return {
      price: stock.price,
      totalQuantity: item?.totalQuantity || 0,
    };
  });

  const totalValue = mergedLists.reduce((sum, item) => {
    return sum + item.price * item.totalQuantity;
  }, 0);

  console.log(mergedLists, totalValue);

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
                {formatCurrency(stat.value, {
                  locale: "pt-BR",
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
