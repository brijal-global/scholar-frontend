/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { usePathname } from "next/navigation";
import ActionCard from "./ActionCard";

const Table = ({
  headers,
  data_keys,
  data,
  refetch,
  actions = [],
  hasView = false,
}: any) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full my-2">
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {data?.length > 0 && (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                {headers?.map((header: string, index: number) => (
                  <th key={index} className="px-2 py-3 text-left font-medium">
                    {header}
                  </th>
                ))}
                {Object.keys(actions).length > 0 && (
                  <th className="px-2 py-3 text-center font-medium">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  {data_keys?.map((key: string, index: number) => (
                    <td
                      key={index}
                      className="border-t border-gray-300 px-2 py-5 text-left text-sm text-gray-500"
                    >
                      {index === 0 && hasView ? (
                        <Link href={`${pathname}/${item?.id}`}>
                          {item[key] || "N/A"}
                        </Link>
                      ) : (
                        item[key] || "N/A"
                      )}
                    </td>
                  ))}
                  {Object.keys(actions).length > 0 && (
                    <td className="border-t border-gray-300 py-5">
                      <ActionCard
                        data={item}
                        refetch={refetch}
                        actions={actions}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.length === 0 && (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No roles found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
