"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartDataPoint, PortfolioItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AssetDetailChartProps {
  item: PortfolioItem;
  chartData: ChartDataPoint[];
}

export function AssetDetailChart({ item, chartData }: AssetDetailChartProps) {
  const isPositive = item.profitPercent >= 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
              {item.asset.logo}
            </div>
            <div>
              <CardTitle className="text-foreground">
                {item.asset.symbol}
              </CardTitle>
              <p className="text-muted-foreground text-sm">{item.asset.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-foreground text-xl">
              {item.currentValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <div
              className={cn(
                "flex items-center justify-end gap-1 font-medium text-sm",
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
                {item.profit.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                ({item.profitPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-muted-foreground">Quantidade</p>
            <p className="font-semibold text-foreground">{item.quantity}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-muted-foreground">Preço Médio</p>
            <p className="font-semibold text-foreground">
              {item.purchasePrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-muted-foreground">Data de Compra</p>
            <p className="font-semibold text-foreground">
              {new Date(item.purchaseDate).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id={`gradient-detail-${item.id}`}
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
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="oklch(0.708 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.708 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `R$ ${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.145 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "oklch(0.985 0 0)" }}
                formatter={(value: number) => [
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }),
                  "Preço",
                ]}
                labelFormatter={(label) => formatDate(label)}
              />
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
                fill={`url(#gradient-detail-${item.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
