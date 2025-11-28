import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransaction } from "@/actions/transaction/create-transaction";
import { getUseTransactionQueryKey } from "@/hooks/queries/use-transaction";

export const createTransactionMutationKey = () =>
  ["create-transaction"] as const;

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createTransactionMutationKey(),
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseTransactionQueryKey() });
    },
  });
};
