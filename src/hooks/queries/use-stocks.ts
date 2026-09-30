import { useQuery } from "@tanstack/react-query";

import { getStocks } from "@/actions/stocks/get-stocks";
import type { Currency } from "@/schemas/currency";

export const getUseStockQueryKey = (
  params: { symbol: string; currency: Currency }[],
) => ["stocks", params.map(({ symbol, currency }) => `${currency}:${symbol.trim().toUpperCase()}`).sort()] as const;

export const useStocks = ({
  params,
}: {
  params: { symbol: string; currency: Currency }[];
}) => {
  return useQuery({
    queryKey: getUseStockQueryKey(params),
    queryFn: () => getStocks({ params }),
    enabled: params.length > 0,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
