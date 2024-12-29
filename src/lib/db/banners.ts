import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { db } from './db';

export const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  imgUrl: text('imgUrl').notNull(),
  description: text('description').notNull(),
  ctaTitle: text('ctaTitle').notNull(),
  ctaLink: text('ctaLink').notNull(),
});

export async function getBanners() {
  return await db.select().from(banners).$dynamic();
}
