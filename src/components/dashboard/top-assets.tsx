"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortfolioItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TopAssetsProps {
  portfolio: PortfolioItem[];
}

export function TopAssets({ portfolio }: TopAssetsProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Melhores Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {portfolio
            .sort((a, b) => b.profitPercent - a.profitPercent)
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg">
                    {item.asset.logo}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {item.asset.symbol}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.asset.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">
                    {item.currentValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p
                    className={cn(
                      "flex items-center justify-end gap-1 font-medium text-xs",
                      item.profitPercent >= 0
                        ? "text-chart-1"
                        : "text-destructive",
                    )}
                  >
                    {item.profitPercent >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {item.profitPercent >= 0 ? "+" : ""}
                    {item.profitPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
