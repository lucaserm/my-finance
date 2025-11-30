import { useQuery } from "@tanstack/react-query";

import { getStock } from "@/actions/stocks/get-stock";
import type { Currency } from "@/schemas/currency";

export const getUseStockQueryKey = (symbol: string) =>
  ["stock", symbol] as const;

export const useStock = ({
  symbol,
  currency,
}: {
  symbol: string;
  currency: Currency;
}) => {
  return useQuery({
    queryKey: getUseStockQueryKey(symbol),
    queryFn: () => getStock({ symbol, currency }),
  });
};
