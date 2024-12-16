import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial,
} from 'drizzle-orm/pg-core';
import { count, ilike, between, and } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { GetProductsParams } from '@/interfaces/product';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull(),
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts({
  filters,
  limit,
  offset,
}: GetProductsParams) {
  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const whereConditions = [];

  if (filters?.name) {
    whereConditions.push(ilike(products.name, `%${filters.name}%`));
  }

  if (filters?.minPrice !== undefined && filters?.maxPrice !== undefined) {
    whereConditions.push(
      between(
        products.price,
        filters.minPrice.toString(),
        filters.maxPrice.toString()
      )
    );
  }

  const whereClause =
    whereConditions.length > 0 ? and(...whereConditions) : undefined;

  let totalProductsQuery = db
    .select({ value: count() })
    .from(products)
    .$dynamic();
  let productsQuery = db.select().from(products).$dynamic();

  if (whereClause) {
    totalProductsQuery = totalProductsQuery.where(whereClause);
    productsQuery = productsQuery.where(whereClause);
  }

  const [totalProductsResult, moreProducts] = await Promise.all([
    totalProductsQuery,
    productsQuery.limit(limit).offset(offset),
  ]);

  const newOffset = moreProducts.length >= limit ? offset + limit : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProductsResult[0].value,
  };
}
