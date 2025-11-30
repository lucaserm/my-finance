import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInvestmentTransaction } from "@/actions/transaction/create-investment-transaction";
import { getUseTransactionQueryKey } from "@/hooks/queries/use-transaction";

export const createInvestmentTransactionMutationKey = () =>
  ["create-investment-transaction"] as const;

export const useCreateInvestmentTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createInvestmentTransactionMutationKey(),
    mutationFn: createInvestmentTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseTransactionQueryKey() });
    },
  });
};
