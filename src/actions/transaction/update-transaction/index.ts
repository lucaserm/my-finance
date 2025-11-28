"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { UpdateTransaction } from "@/schemas/transaction";

interface UpdateTransactionParams {
  transactionId: string;
  data: UpdateTransaction;
}

export const updateTransaction = async ({
  transactionId,
  data,
}: UpdateTransactionParams) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const existingTransaction = await db
    .select()
    .from(transactionTable)
    .where(
      and(
        eq(transactionTable.id, transactionId),
        eq(transactionTable.userId, session.user.id)
      )
    );

  if (!existingTransaction) throw new Error("Transaction not found");

  await db
    .update(transactionTable)
    .set({
      ...data,
    })
    .where(eq(transactionTable.id, transactionId));
};
