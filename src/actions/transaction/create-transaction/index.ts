"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { CreateTransaction } from "@/schemas/transaction";

export const createTransaction = async (data: CreateTransaction) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  await db.insert(transactionTable).values({
    ...data,
    userId: session.user.id,
  });
};
