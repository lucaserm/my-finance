"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PortfolioItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
  selectedId?: string;
}

export function PortfolioTable({
  portfolio,
  onSelect,
  selectedId,
}: PortfolioTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="text-muted-foreground">Ativo</TableHead>
            <TableHead className="text-muted-foreground">Tipo</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Qtd
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              Preço Médio
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              Valor Atual
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              Rendimento
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolio.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => onSelect(item)}
              className={cn(
                "cursor-pointer",
                selectedId === item.id
                  ? "bg-primary/10 hover:bg-primary/15"
                  : "hover:bg-secondary/30",
              )}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm">
                    {/* {item.asset.logo} */}🎯
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {item.asset.symbol}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.asset.name}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    item.asset.currency === "BRL"
                      && "bg-chart-3/10 text-chart-3",
                    item.asset.currency === "USD"
                      && "bg-chart-2/10 text-chart-2",
                    item.asset.currency === "CRYPTO"
                      && "bg-primary/10 text-primary",
                  )}
                >
                  {item.asset.currency}
                </span>
              </TableCell>
              <TableCell className="text-right text-foreground">
                {item.quantity}
              </TableCell>
              <TableCell className="text-right text-foreground">
                {item.purchasePrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                {item.currentValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={cn(
                    "flex items-center justify-end gap-1 font-medium",
                    item.profitPercent >= 0
                      ? "text-chart-1"
                      : "text-destructive",
                  )}
                >
                  {item.profitPercent >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {item.profitPercent >= 0 ? "+" : ""}
                    {item.profitPercent.toFixed(2)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
