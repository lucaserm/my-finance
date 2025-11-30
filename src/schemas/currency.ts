import z from "zod";

export const currenciesSchema = z.enum(["USD", "BRL", "CRYPTO"]);

export type Currency = z.infer<typeof currenciesSchema>;
