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
import { count, ilike, between, and, eq } from 'drizzle-orm';
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
  page = 1,
  pageSize = 10,
}: GetProductsParams) {
  const validPage = Math.max(1, page);
  const validPageSize = Math.max(1, pageSize);
  const offset = (validPage - 1) * validPageSize;

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

  const totalProductsQuery = db
    .select({ count: count(products.id) })
    .from(products)
    .$dynamic();

  let productsQuery = db.select().from(products).$dynamic();

  if (whereClause) {
    totalProductsQuery.where(whereClause);
    productsQuery = productsQuery.where(whereClause);
  }

  const [totalProductsResult, productsResult] = await Promise.all([
    totalProductsQuery,
    productsQuery.limit(validPageSize).offset(offset),
  ]);

  const totalProducts = Number(totalProductsResult[0].count);
  const totalPages = Math.ceil(totalProducts / validPageSize);

  return {
    products: productsResult,
    currentPage: validPage,
    totalPages,
    totalProducts,
    hasNextPage: validPage < totalPages,
    hasPreviousPage: validPage > 1,
  };
}

export async function getProductById(id: number) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (!product.length) {
    return null;
  }

  return product[0];
}
