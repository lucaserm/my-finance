import { z } from "zod";

import { currenciesSchema } from "@/schemas/currency";

export const portfolioItemSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  assetSymbol: z.string(),
  assetCurrency: currenciesSchema,
  totalQuantity: z.number().int(),
  totalInvestedInCents: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PortfolioItem = z.infer<typeof portfolioItemSchema>;
