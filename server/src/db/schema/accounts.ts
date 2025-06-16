import { pgTable, serial, text, timestamp, integer, boolean, numeric, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const accountTypeEnum = pgEnum('account_type', ['checking', 'savings', 'credit', 'cash', 'investment']);

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: accountTypeEnum('type').notNull(),
  balance: numeric('balance', { precision: 12, scale: 2 }).notNull().default('0'),
  currency: text('currency').notNull().default('USD'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});