import type { SelectChild } from "@/libs/schemas/Childs";

type TableProps = {
  readonly childs: SelectChild[];
};

/**
 *
 * @param {TableProps} props Props
 * @returns {React.ReactNode} JSX Table representation
 */
export default function Table({ childs }: TableProps) {
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
