import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "@/actions/transaction/get-transactions";

export const getUseTransactionQueryKey = () => ["transaction"] as const;

export const useTransaction = () => {
  return useQuery({
    queryKey: getUseTransactionQueryKey(),
    queryFn: () => getTransactions(),
  });
};
