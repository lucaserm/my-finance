import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTransaction } from "@/actions/transaction/update-transaction";
import { getUseTransactionQueryKey } from "@/hooks/queries/use-transaction";

export const updateTransactionMutationKey = () =>
  ["update-transaction"] as const;

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: updateTransactionMutationKey(),
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseTransactionQueryKey() });
    },
  });
};
