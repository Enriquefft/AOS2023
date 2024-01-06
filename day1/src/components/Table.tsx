import { getChilds } from "@/libs/utils";

import type { Tag } from "@/libs/tags";

type tableProps = {
  page: number;
  nameQuery: string | null;
  tags: Tag;
};

/**
 *
 * @param root0
 * @param root0.page
 * @param root0.nameQuery
 * @param root0.tags
 */
export default async function Table({
  page,
  nameQuery,
  tags,
}: Readonly<tableProps>) {
  console.log("table:", page, nameQuery, tags);

  const childs = await getChilds(page, nameQuery, tags);

  return (
    <div className="w-full p-8">
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tally</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {childs.map((item) => (
            <tr className="text-center" key={item.id}>
              <td>{item.name}</td>
              <td>{item.tally}</td>
              <td>{item.tally >= 0 ? "gucci" : "bad"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
