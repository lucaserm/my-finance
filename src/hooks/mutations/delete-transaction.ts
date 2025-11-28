import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTransaction } from "@/actions/transaction/delete-transaction";
import { getUseTransactionQueryKey } from "@/hooks/queries/use-transaction";

export const deleteTransactionMutationKey = () =>
  ["delete-transaction"] as const;

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: deleteTransactionMutationKey(),
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseTransactionQueryKey() });
    },
  });
};
