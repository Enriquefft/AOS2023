import type { Tag } from "./tags";

import { db } from "./db";
import { childs, type SelectChild } from "./schemas/Childs";

import { like, gt, lt, and, type SQL } from "drizzle-orm";

const PAGE_SIZE = 100;
/**
 * Joins the current path with the given url query parameters.
 * @param {string} path The current path.
 * @param {URLSearchParams} searchParams The url query parameters.
 * @returns {string} The joined path and url query parameters.
 */
export function buildUrl(path: string, searchParams: URLSearchParams) {
  return `${path}?${searchParams.toString()}`;
}

/**
 * Query the database for a list of child names.
 * @param  {number} page The page number to query.
 * @param {string|null} nameQuery The name to query.
 * @param {Tag} tags The tag to query.
 * @returns {Promise<SelectChild>} A list of child names.
 */
export async function getChilds(
  page: number,
  nameQuery: string | null,
  tags: Tag,
) {
  const filters: SQL[] = [];

  if (nameQuery !== null) {
    filters.push(like(childs.name, `%${nameQuery.toLowerCase()}%`));
  }

  if (tags === "good") {
    filters.push(gt(childs.tally, 0));
  } else if (tags === "bad") {
    filters.push(lt(childs.tally, 0));
  }

  return db
    .select()
    .from(childs)
    .where(and(...filters))
    .orderBy(childs.tally)
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE);
}
