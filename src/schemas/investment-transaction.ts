import { z } from "zod";

import { currenciesSchema } from "@/schemas/currency";
export const investmentTransactionSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  assetSymbol: z.string(),
  assetCurrency: currenciesSchema,
  quantity: z.number().int(),
  priceInCents: z.number().int(),
  totalPaidInCents: z.number().int(),
  transactedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type InvestmentTransaction = z.infer<typeof investmentTransactionSchema>;
export type CreateInvestmentTransaction = Omit<
  InvestmentTransaction,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
