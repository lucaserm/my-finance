"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";

export const getPortfolioItems = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const portfolioItems = await db.query.portfolioItemTable.findMany({
    where: (portfolioItem, { eq }) => eq(portfolioItem.userId, session.user.id),
    with: {
      user: true,
    },
  });

  return {
    portfolioItems,
  };
};
