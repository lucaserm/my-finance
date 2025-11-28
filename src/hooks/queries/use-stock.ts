import { useQuery } from "@tanstack/react-query";

import { type Currency, getStock } from "@/actions/stocks/get-stock";

export const getUseStockQueryKey = () => ["stock"] as const;

export const useStock = ({
  symbol,
  currency,
}: {
  symbol: string;
  currency: Currency;
}) => {
  return useQuery({
    queryKey: getUseStockQueryKey(),
    queryFn: () => getStock({ symbol, currency }),
  });
};
