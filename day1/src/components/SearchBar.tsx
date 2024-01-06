"use client";
import { SearchIcon, CheckIcon, CrossIcon } from "lucide-react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { buildUrl } from "@/libs/utils";

import { tagSchema, type Tag } from "@/libs/tags";

import { useDebouncedCallback } from "use-debounce";

const DEBOUNCED_DELAY = 800;

/**
 *
 */
export default function SearchBar() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTags = tagSchema.parse(searchParams.get("tag"));

  const handleSearch = useDebouncedCallback((query: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (query) {
      newParams.set("query", query);
    } else {
      newParams.delete("query");
    }

    const newUrl = buildUrl(pathname, newParams);

    replace(newUrl);
  }, DEBOUNCED_DELAY);

  /**
   *
   * @param changedTag
   */
  const handleCheck = useDebouncedCallback(
    (changedTag: Exclude<Tag, "both">) => {
      let newTags: Tag = "both";

      if (activeTags === "good" || activeTags === "bad") {
        newTags = "both";
      } else {
        newTags = changedTag === "good" ? "bad" : "good";
      }

      const newParams = new URLSearchParams(searchParams);
      newParams.set("tag", newTags);
      const newUrl = buildUrl(pathname, newParams);
      replace(newUrl);
    },
  );

  return (
    <div className="flex flex-row">
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="query-search">
          <SearchIcon />
          Search
        </label>
        <input
          className="block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm text-black outline-2 placeholder:text-gray-500"
          type="text"
          id="query-search"
          placeholder="name..."
          defaultValue={searchParams.get("query") ?? ""}
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
        />
      </div>

      <div className=" flex flex-row">
        <div>
          <label htmlFor="good-checkbox">
            <CheckIcon color="green" aria-label="Bad checkbox" />
          </label>
          <input
            type="checkbox"
            id="good-checkbox"
            placeholder="Good"
            defaultValue="Good"
            checked={activeTags !== "bad"}
            onChange={() => {
              handleCheck("good");
            }}
          />
        </div>

        <div>
          <label htmlFor="bad-checkbox">
            <CrossIcon color="red" aria-label="Good checkbox" />
          </label>
          <input
            type="checkbox"
            id="bad-checkbox"
            placeholder="Bad"
            defaultValue="Bad"
            checked={activeTags !== "good"}
            onChange={() => {
              handleCheck("bad");
            }}
          />
        </div>
      </div>
    </div>
  );
}
