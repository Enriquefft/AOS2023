import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { tagSchema } from "@/libs/tags";

type SearchParams = {
  query?: string;
  page?: number;
  tag: string;
};

/**
 *
 * @param root0
 * @param root0.searchParams
 */
export default function Page({
  searchParams,
}: {
  readonly searchParams?: SearchParams;
}) {
  console.log("searchParams:", searchParams);

  const query = searchParams?.query ?? "";
  const page = Number(searchParams?.page) || 1;
  const tags = tagSchema.parse(searchParams?.tag);
  console.log("page:", page, "query:", query, "tags:", tags);

  return (
    <main className="mx-auto max-w-7xl px-8 md:px-16">
      <div className="grid grid-cols-2 gap-8 p-8">
        <Card type="total" value="100" description="Ready for gifts" />
        <Card type="nice" value="Hayley" description="54 are nice childs" />
        <Card
          type="naughty"
          value="Violette"
          description="46 are naughty childs"
        />
        <Card type="yours" value="0" description="Reset on Reload" />
      </div>

      <SearchBar />
      <Table page={page} nameQuery={query} tags={tags} />
      <Pagination />
    </main>
  );
}
