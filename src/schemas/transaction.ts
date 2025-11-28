import z from "zod";

const transactionType = z.enum(["income", "expense"]);

const transactionSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  type: transactionType,
  description: z.string().min(1).max(255),
  amountInCents: z.number().int().nonnegative(),
  transactedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const createTransactionSchema = transactionSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTransaction = z.infer<typeof createTransactionSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
