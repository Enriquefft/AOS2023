import { tinyint, varchar, serial, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { z } from "zod";

export const childIdSchema = z.number().int().positive().brand("ChildId");
export type ChildId = z.infer<typeof childIdSchema>;

export const childs = mysqlTable("childs", {
  id: serial("id").$type<ChildId>().primaryKey(),
  name: varchar("name", {
    length: 24,
  }).notNull(),
  tally: tinyint("tally").notNull(),
});

export const childInsertSchema = createInsertSchema(childs);

export type SelectChild = InferSelectModel<typeof childs>;
export type InsertChild = InferInsertModel<typeof childs>;
