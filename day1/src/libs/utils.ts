/**
 * Joins the current path with the given url query parameters.
 * @param {string} path The current path.
 * @param {URLSearchParams} searchParams The url query parameters.
 * @returns {string} The joined path and url query parameters.
 */
export function buildUrl(path: string, searchParams: URLSearchParams) {
  return `${path}?${searchParams.toString()}`;
}
