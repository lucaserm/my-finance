import { useQuery } from "@tanstack/react-query";

import { getStock } from "@/actions/stocks/get-stock";

export const getUseStockQueryKey = () => ["stock"] as const;

export const useStock = ({
  symbol,
  currency,
}: {
  symbol: string;
  currency: string;
}) => {
  return useQuery({
    queryKey: getUseStockQueryKey(),
    queryFn: () => getStock({ symbol, currency }),
  });
};
