"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";
import { auth } from "@/lib/auth";

interface DeleteTransactionProps {
  transactionId: string;
}

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  await db
    .delete(transactionTable)
    .where(eq(transactionTable.id, transactionId));
};
