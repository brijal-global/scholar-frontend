/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import ActionCard from "./ActionCard";
import { useMemo, useState } from "react";
import Loader from "./Loader";
import { Switch } from "antd";
import fetchApi from "@/lib/axios";
import { RefreshCw } from "lucide-react";

const Table = ({
  showActiveToggle = true,
  data_unique_key = "id",
  loading = true,
  error,
  headers,
  data_keys,
  data,
  viewLink,
  actions = [],
  groups = [],
  refetch,
}: any) => {
  const hasGroups = groups.length > 0;

  const groupedData = useMemo(() => {
    if (!hasGroups) return null;

    // Initialize all groups with empty arrays first
    const initial = groups.reduce((acc: any, group: any) => {
      acc[group.label] = [];
      return acc;
    }, {});

    if (!data) return initial;

    // For each item, add it to all groups where it matches the group's criteria
    return data.reduce((acc: any, item: any) => {
      groups.forEach((group: any) => {
        if (group.values.includes(item[group.data_key])) {
          acc[group.label] = [...(acc[group.label] || []), item];
        }
      });
      return acc;
    }, initial);
  }, [data, groups, hasGroups]);

  const tabs = groupedData ? Object.keys(groupedData) : [];
  const [selectedTab, setSelectedTab] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use selected tab if valid, otherwise default to first tab
  const currentTab = tabs.includes(selectedTab) ? selectedTab : tabs[0] || "";

  const toggleActive = async (identifier: string, active: boolean) => {
    const res = await fetchApi(`/roles/${identifier}`, {
      method: "PUT",
      body: {
        isActive: active,
      },
    });

    if (!res?.success) {
      // revert the status in ui
      displayData?.forEach((item: any) => {
        if (item[data_unique_key] === identifier) {
          item["isActive"] = !active;
        }
      });
    }
  };

  if (loading) return <Loader />;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Determine the data to display
  const displayData = hasGroups && groupedData ? groupedData[currentTab] : data;
  const showTabs = hasGroups && groupedData && tabs.length > 0;

  return (
    <div className="flex flex-col justify-center items-center gap-6 rounded-lg w-full">
      {showTabs && (
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="grow flex items-center gap-6">
            {tabs.map((tab: string) => (
              <button
                key={tab}
                className={`cursor-pointer text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 text-gray-700 ${
                  currentTab === tab ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
                <span className="text-xs ml-1">
                  ({groupedData[tab]?.length || 0})
                </span>
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={async () => {
              setIsRefreshing(true);
              await refetch();
              setIsRefreshing(false);
            }}
            disabled={isRefreshing}
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      )}
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {displayData?.length > 0 ? (
          <table className="rounded-lg w-full ">
            <thead>
              <tr className="bg-[#f9fafb] rounded-xl text-sm text-nowrap">
                {headers?.map((header: string, index: number) => (
                  <th key={index} className="px-2 py-3 text-left font-medium">
                    {header}
                  </th>
                ))}

                {showActiveToggle && (
                  <th className="px-2 py-3 text-center font-medium">Active</th>
                )}

                {Object.keys(actions).length > 0 && (
                  <th className="px-2 py-3 text-center font-medium">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayData?.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  {data_keys?.map((key: string, index: number) => (
                    <td
                      key={index}
                      className="border-t border-gray-300 px-2 py-5 text-left text-sm text-gray-500"
                    >
                      {index === 0 && viewLink ? (
                        <Link href={viewLink(item?.id)}>
                          {item[key] || "N/A"}
                        </Link>
                      ) : (
                        item[key] || "N/A"
                      )}
                    </td>
                  ))}

                  {showActiveToggle && (
                    <td className="border-t border-gray-300 py-5 text-center">
                      <Switch
                        defaultChecked={item["isActive"]}
                        classNames={{}}
                        onChange={(checked) => {
                          toggleActive(item[data_unique_key], checked);
                        }}
                      />
                    </td>
                  )}

                  {Object.keys(actions).length > 0 && (
                    <td className="border-t border-gray-300 py-5">
                      <ActionCard item={item} actions={actions} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-96 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
              No data found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
