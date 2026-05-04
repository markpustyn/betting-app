import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  numeric,
  uuid,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  status: text("status").default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const bets = pgTable("bets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  totalPool: numeric("total_pool").default("0"),
  winner: text("winner"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  closesAt: timestamp("closes_at").notNull(),
})

export const trades = pgTable("trades", {
  id: serial("id").primaryKey(),

  userId: text("user_id"),
  betId: integer("bet_id")
    .references(() => bets.id)
    .notNull(),
  side: text("side").notNull(),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})