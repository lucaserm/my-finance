import { useQuery } from "@tanstack/react-query";

import { getStocks } from "@/actions/stocks/get-stocks";
import type { Currency } from "@/schemas/currency";

export const getUseStockQueryKey = (symbol: string[]) =>
  ["stock", symbol] as const;

export const useStocks = ({
  params,
}: {
  params: { symbol: string; currency: Currency }[];
}) => {
  return useQuery({
    queryKey: getUseStockQueryKey(params.map((p) => p.symbol)),
    queryFn: () => getStocks({ params }),
  });
};
