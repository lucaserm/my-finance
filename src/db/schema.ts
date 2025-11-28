import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTable = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const portfolioItemTable = pgTable("portfolio_item", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => v7()),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  assetSymbol: text("asset_symbol").notNull(),
  quantity: text("quantity").notNull(),
  purchasePrice: text("purchase_price").notNull(),
  purchasedAt: timestamp("purchased_at").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const enumTransactionType = pgEnum("transaction_type", [
  "income",
  "expense",
]);

export const transactionTable = pgTable("transaction", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => v7()),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  type: enumTransactionType("type").notNull(),
  description: text("description").notNull(),
  amountInCents: bigint("amount_in_cents", { mode: "number" }).notNull(),
  transactedAt: timestamp("transacted_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const transactionRelations = relations(
  transactionTable,
  ({ one, many }) => ({
    user: one(userTable, {
      fields: [transactionTable.userId],
      references: [userTable.id],
    }),
    categories: many(transactionCategoryTable),
  })
);

export const transactionCategoryTable = pgTable("transaction_category", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => v7()),
  transactionId: uuid("transaction_id")
    .notNull()
    .references(() => transactionTable.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const transactionCategoryRelations = relations(
  transactionCategoryTable,
  ({ one }) => ({
    transaction: one(transactionTable, {
      fields: [transactionCategoryTable.transactionId],
      references: [transactionTable.id],
    }),
    category: one(categoryTable, {
      fields: [transactionCategoryTable.categoryId],
      references: [categoryTable.id],
    }),
  })
);

export const categoryTable = pgTable("category", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => v7()),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const categoryRelations = relations(categoryTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [categoryTable.userId],
    references: [userTable.id],
  }),
  transactions: many(transactionCategoryTable),
}));
