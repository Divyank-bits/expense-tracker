import { pgTable, serial, text, timestamp, integer, numeric, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { accounts } from './accounts';
import { categories } from './categories';

export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense', 'transfer']);

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accountId: integer('account_id').notNull().references(() => accounts.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  type: transactionTypeEnum('type').notNull(),
  description: text('description'),
  date: timestamp('date').notNull().defaultNow(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});