"use server";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { investmentTransactionTable, portfolioItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { CreateInvestmentTransaction } from "@/schemas/investment-transaction";

export const createInvestmentTransaction = async (
  data: CreateInvestmentTransaction
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  await db.insert(investmentTransactionTable).values({
    ...data,
    userId: session.user.id,
  });

  const existingPortfolioItem = await db
    .select()
    .from(portfolioItemTable)
    .where(
      and(
        eq(portfolioItemTable.userId, session.user.id),
        eq(portfolioItemTable.assetSymbol, data.assetSymbol)
      )
    );

  if (existingPortfolioItem.length === 0) {
    await db.insert(portfolioItemTable).values({
      userId: session.user.id,
      assetSymbol: data.assetSymbol,
      assetCurrency: data.assetCurrency,
      totalQuantity: data.quantity,
      totalInvestedInCents: data.totalPaidInCents,
    });
  } else {
    const item = existingPortfolioItem[0];
    await db
      .update(portfolioItemTable)
      .set({
        totalQuantity: item.totalQuantity + data.quantity,
        totalInvestedInCents: item.totalInvestedInCents + data.totalPaidInCents,
      })
      .where(
        and(
          eq(portfolioItemTable.userId, session.user.id),
          eq(portfolioItemTable.assetSymbol, data.assetSymbol)
        )
      );
  }
};
