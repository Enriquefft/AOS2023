/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/libs/db";
import { childs } from "@/libs/schemas/Childs";

import { and, like, gt, lt, type SQL } from "drizzle-orm";
import type { Tag } from "@/libs/tags";

const PAGE_SIZE = 10;

/**
 *
 * @param page
 * @param nameQuery
 * @param tags
 */
async function getChilds(page: number, nameQuery: string | null, tags: Tag) {
  const query = db.select().from(childs).$dynamic();

  const queries: SQL[] = [];

  if (nameQuery !== null) {
    queries.push(like(childs.name, `%${nameQuery.toLowerCase()}%`));
  }

  if (tags === "good") {
    queries.push(gt(childs.tally, 0));
  } else if (tags === "bad") {
    queries.push(lt(childs.tally, 0));
  }

  return query
    .where(and(...queries))
    .orderBy(childs.tally)
    .limit(PAGE_SIZE)
    .offset(page * PAGE_SIZE);
}

const page = 0;
const nameQuery = "Neoma";

const data = await getChilds(page, nameQuery, "good");
console.log(data);
console.log("count:", data.length);
