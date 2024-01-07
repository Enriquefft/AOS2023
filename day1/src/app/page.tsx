import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { tagSchema } from "@/libs/tags";

import { getChilds } from "@/libs/actions";

type SearchParams = {
  nameQuery?: string;
  page?: number;
  tag: string;
};

/**
 * @param root0
 * @param root0.searchParams
 */
export default async function Page({
  searchParams,
}: {
  readonly searchParams?: SearchParams;
}) {
  const nameQuery = searchParams?.nameQuery ?? "";
  const page = Number(searchParams?.page) || 1;
  const tags = tagSchema.parse(searchParams?.tag);

  const {
    childs,
    totalChilds,
    nicestChildName,
    naughtiestChildName,
    yours = 0,
  } = await getChilds(page, nameQuery, tags);

  return (
    <main className="mx-auto max-w-7xl px-8 md:px-16">
      <div className="grid grid-cols-2 gap-8 p-8">
        <Card
          type="total"
          value={totalChilds.toString()}
          description="Ready for gifts"
        />
        <Card
          type="nice"
          value={nicestChildName}
          description="54 are nice childs"
        />
        <Card
          type="naughty"
          value={naughtiestChildName}
          description="46 are naughty childs"
        />
        <Card
          type="yours"
          value={yours.toString()}
          description="Reset on Reload"
        />
      </div>

      <SearchBar />
      <Table childs={childs} />
      <Pagination />
    </main>
  );
}
