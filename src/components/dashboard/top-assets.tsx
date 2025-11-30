"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStock } from "@/hooks/queries/use-stock";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/schemas/portfolio-item";
import { formatCurrency } from "@/utils/formatCurrency";

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
            // .sort((a, b) => b.profitPercent - a.profitPercent)
            .slice(0, 4)
            .map((item) => (
              <AssetItem key={item.assetSymbol} item={item} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AssetItem({ item }: { item: PortfolioItem }) {
  const { data } = useStock({
    currency: item.assetCurrency,
    symbol: item.assetSymbol,
  });
  return (
    <div
      key={item.id}
      className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg">
          {/* {item.asset.logo} */}🎯
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">
            {data?.stock?.name ?? item.assetSymbol.toUpperCase()}
          </p>
          <p className="text-muted-foreground text-xs">{item.assetSymbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-foreground text-sm">
          {formatCurrency(data?.stock?.price ?? 0, {
            locale: "pt-BR",
            currency: "BRL",
          })}
        </p>
        {data?.stock?.dayChange && (
          <p
            className={cn(
              "flex items-center justify-end gap-1 font-medium text-xs",
              data.stock.dayChange >= 0 ? "text-chart-1" : "text-destructive",
            )}
          >
            {data.stock.dayChange >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {data.stock.dayChange >= 0 ? "+" : ""}
            {data.stock.dayChange}%
          </p>
        )}
      </div>
    </div>
  );
}
