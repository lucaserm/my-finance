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
import { useStock } from "@/hooks/queries/use-stock";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/schemas/portfolio-item";
import { formatCurrency } from "@/utils/formatCurrency";

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
              Total Investido
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
            <PortfolioTableRow
              key={item.id}
              item={item}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PortfolioTableRow({
  item,
  selectedId,
  onSelect,
}: {
  item: PortfolioItem;
  selectedId?: string;
  onSelect: (item: PortfolioItem) => void;
}) {
  const { data, isPending } = useStock({
    symbol: item.assetSymbol,
    currency: item.assetCurrency,
  });

  if (isPending || !data) return null;

  const profitPercent =
    (data.stock?.price ?? 0)
    - item.totalInvestedInCents / item.totalQuantity / 100;

  return (
    <TableRow
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
            <p className="font-medium text-foreground">{item.assetSymbol}</p>
            <p className="text-muted-foreground text-xs">{item.assetSymbol}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs",
            item.assetCurrency === "BRL" && "bg-chart-3/10 text-chart-3",
            item.assetCurrency === "USD" && "bg-chart-2/10 text-chart-2",
            item.assetCurrency === "CRYPTO" && "bg-primary/10 text-primary",
          )}
        >
          {item.assetCurrency}
        </span>
      </TableCell>
      <TableCell className="text-right text-foreground">
        {item.totalQuantity}
      </TableCell>
      <TableCell className="text-right text-foreground">
        {formatCurrency(item.totalInvestedInCents / 100, {
          locale: "pt-BR",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell className="text-right font-semibold text-foreground">
        {formatCurrency((data.stock?.price ?? 0) * item.totalQuantity, {
          locale: "pt-BR",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell className="text-right">
        <div
          className={cn(
            "flex items-center justify-end gap-1 font-medium",
            profitPercent >= 0 ? "text-chart-1" : "text-destructive",
          )}
        >
          {profitPercent >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>
            {profitPercent >= 0 ? "+" : ""}
            {profitPercent}%
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}
