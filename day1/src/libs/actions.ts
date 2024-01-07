"use server";
import type { Tag } from "./tags";

import { db } from "./db";
import { childs, type SelectChild } from "./schemas/Childs";

import { like, gt, lt, and, type SQL } from "drizzle-orm";

const PAGE_SIZE = 100;
type ChildsInfo = {
  childs: SelectChild[];
  totalChilds: number;
  nicestChildName: string;
  naughtiestChildName: string;
  yours?: number;
};

/**
 * Query the database for a list of child names.
 * @param  {number} page The page number to query.
 * @param {string|null} nameQuery The name to query.
 * @param {Tag} tags The tag to query.
 * @returns {Promise<ChildsInfo>} A list of child names.
 */
export async function getChilds(
  page: number,
  nameQuery: string | null,
  tags: Tag,
): Promise<ChildsInfo> {
  const filters: SQL[] = [];

  if (nameQuery !== null) {
    filters.push(like(childs.name, `%${nameQuery.toLowerCase()}%`));
  }

  if (tags === "good") {
    filters.push(gt(childs.tally, 0));
  } else if (tags === "bad") {
    filters.push(lt(childs.tally, 0));
  }

  const childsData = db
    .select()
    .from(childs)
    .where(and(...filters))
    .orderBy(childs.tally)
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE);

  return childsData.then((data) => ({
    childs: data,
    totalChilds: data.length,
    nicestChildName: data[0]?.name ?? "No child found",
    naughtiestChildName: data[data.length - 1]?.name ?? "No child found",
    yours: 0,
  }));
}
