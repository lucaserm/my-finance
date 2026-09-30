import { useQuery } from "@tanstack/react-query";

import { getStock } from "@/actions/stocks/get-stock";
import type { Currency } from "@/schemas/currency";

export const getUseStockQueryKey = (symbol: string, currency: Currency) =>
  ["stock", currency, symbol.trim().toUpperCase()] as const;

export const useStock = ({
  symbol,
  currency,
}: {
  symbol: string;
  currency: Currency;
}) => {
  return useQuery({
    queryKey: getUseStockQueryKey(symbol, currency),
    queryFn: () => getStock({ symbol, currency }),
    enabled: symbol.trim().length > 0,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
