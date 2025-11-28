"use client";

import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import type { Stock } from "@/actions/stocks/get-stock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Asset, ChartDataPoint } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  asset: Stock;
  chartData: ChartDataPoint[];
  onBuy: (asset: Asset) => void;
}

export function AssetCard({ asset, chartData, onBuy }: AssetCardProps) {
  const isPositive = asset.openPrice - asset.price >= 0;

  const formatPrice = (price: number) => {
    if (asset.currency === "USD") {
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    if (asset.currency === "BRL") {
      return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: asset.price < 1 ? 4 : 2,
    });
  };

  return (
    <Card className="border-border bg-card transition-colors hover:border-primary/50">
      <CardContent className="p-4">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg">
              {/* {asset.logo} */}🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{asset.name}</h3>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    asset.currency === "BRL" && "bg-chart-3/10 text-chart-3",
                    asset.currency === "USD" && "bg-chart-2/10 text-chart-2",
                    asset.currency === "CRYPTO" && "bg-primary/10 text-primary",
                  )}
                >
                  {asset.currency}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">{asset.symbol}</p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => onBuy(asset)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-1 h-4 w-4" />
            Comprar
          </Button>
        </div>

        <div className="mb-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id={`gradient-${asset.symbol}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={
                      isPositive
                        ? "oklch(0.696 0.17 162.48)"
                        : "oklch(0.577 0.245 27.325)"
                    }
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={
                      isPositive
                        ? "oklch(0.696 0.17 162.48)"
                        : "oklch(0.577 0.245 27.325)"
                    }
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={
                  isPositive
                    ? "oklch(0.696 0.17 162.48)"
                    : "oklch(0.577 0.245 27.325)"
                }
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${asset.symbol})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-bold text-foreground text-xl">
              {formatPrice(asset.price)}
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 font-medium text-sm",
              isPositive ? "text-chart-1" : "text-destructive",
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {(asset.openPrice - asset.price).toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
