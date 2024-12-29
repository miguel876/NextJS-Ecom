import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { db } from './db';

export const heroes = pgTable('heroes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  text: text('text').notNull(),
  imgUrl: text('imgUrl').notNull(),
});

export async function getHeroes() {
  return await db.select().from(heroes).$dynamic();
}
