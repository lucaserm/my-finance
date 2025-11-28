"use client";

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
import type { ChartDataPoint } from "@/lib/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface PortfolioChartProps {
  data: ChartDataPoint[];
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Evolução do Portfólio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.696 0.17 162.48)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.696 0.17 162.48)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  formatDate(date, {
                    locale: "pt-BR",
                    format: "intl",
                    day: "2-digit",
                    month: "short",
                  })
                }
                stroke="oklch(0.708 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(value) =>
                  formatCurrency(value, {
                    locale: "pt-BR",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                  })
                }
                stroke="oklch(0.708 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.145 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "oklch(0.985 0 0)" }}
                itemStyle={{ color: "oklch(0.696 0.17 162.48)" }}
                formatter={(value: number) => [
                  formatCurrency(value, {
                    locale: "pt-BR",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                  }),
                  "Valor",
                ]}
                labelFormatter={(label) =>
                  formatDate(label, {
                    locale: "pt-BR",
                    format: "intl",
                    day: "2-digit",
                    month: "short",
                  })
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.696 0.17 162.48)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
