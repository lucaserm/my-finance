"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortfolioItem } from "@/lib/types";

interface AllocationChartProps {
  portfolio: PortfolioItem[];
}

const COLORS = [
  "oklch(0.696 0.17 162.48)",
  "oklch(0.488 0.243 264.376)",
  "oklch(0.828 0.189 84.429)",
  "oklch(0.577 0.245 27.325)",
  "oklch(0.769 0.188 70.08)",
];

export function AllocationChart({ portfolio }: AllocationChartProps) {
  const data = portfolio.map((item, index) => ({
    name: item.asset.symbol,
    value: item.currentValue,
    color: COLORS[index % COLORS.length],
  }));

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Alocação do Portfólio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })} (${((value / totalValue) * 100).toFixed(1)}%)`,
                  "Valor",
                ]}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-foreground text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
