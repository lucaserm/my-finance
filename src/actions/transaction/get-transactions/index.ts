"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";

export const getTransactions = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const transactions = await db.query.transactionTable.findMany({
    where: (transaction, { eq }) => eq(transaction.userId, session.user.id),
    with: {
      user: true,
    },
  });

  return {
    transactions,
  };
};
