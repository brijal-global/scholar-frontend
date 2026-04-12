/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import ActionCard from "./ActionCard";
import { useMemo, useState, useEffect } from "react";
import Loader from "./Loader";
import { Switch } from "antd";
import fetchApi from "@/lib/axios";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import useFetch from "@/hooks/useFetch";

import Chip from "@/components/ui/Chip";
import { SecondaryOutlineButton } from "@/components/ui/Buttons";
import { formatDate } from "@/utils/dateFormatters";

interface TableProps {
  title: string;
  dataApiUrl: string;
  showActiveToggle?: boolean;
  dataUniqueKey?: string;
  headers: string[];
  dataKeys: (string | string[])[];
  searchKeys: string[];
  viewLink?: (identifier: string) => string;
  createLink?: string;
  actions?: any;
  groups?: any;
  dataTransformer?: (data: any[]) => any[];
}

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("ellipsis-start");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis-end");
  }

  pages.push(totalPages);

  return pages;
};

const Table = ({
  title,
  dataApiUrl,
  showActiveToggle = true,
  dataUniqueKey = "id",
  headers,
  dataKeys,
  searchKeys,
  viewLink,
  createLink,
  actions = [],
  groups = [],
  dataTransformer,
}: TableProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const dataApiUrlWithPagination = `${dataApiUrl}${
    dataApiUrl.includes("?") ? "&" : "?"
  }page=${page}&limit=${limit}`;

  const { data, response, loading, reloading, refetch, error } = useFetch(
    dataApiUrlWithPagination
  ) as any;
  const [searchTerm, setSearchTerm] = useState("") as any;
  const [filteredData, setFilteredData] = useState(data) as any;

  const pagination = response?.pagination;
  const editApiBaseUrl = dataApiUrl?.split("?")[0];

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        const transformedData = dataTransformer ? dataTransformer(data) : data;

        setFilteredData(
          transformedData?.filter((item: any) =>
            searchKeys?.some((key: string) =>
              item?.[key]?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            )
          ) || []
        );
      }, 0);
    }
  }, [data, searchTerm, dataUniqueKey, searchKeys, dataTransformer]);

  const hasGroups = groups.length > 0;

  const groupedData = useMemo(() => {
    if (!hasGroups) return null;

    const initial = groups.reduce((acc: any, group: any) => {
      acc[group.label] = [];
      return acc;
    }, {});

    if (!filteredData) return initial;

    return filteredData.reduce((acc: any, item: any) => {
      groups.forEach((group: any) => {
        if (group.values.includes(item[group.dataKey])) {
          acc[group.label] = [...(acc[group.label] || []), item];
        }
      });
      return acc;
    }, initial);
  }, [filteredData, groups, hasGroups]);

  const tabs = groupedData ? Object.keys(groupedData) : [];
  const [selectedTab, setSelectedTab] = useState("");

  const currentTab = tabs.includes(selectedTab) ? selectedTab : tabs[0] || "";

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const displayData =
    hasGroups && groupedData ? groupedData[currentTab] : filteredData;
  const showTabs = hasGroups && groupedData && tabs.length > 0;

  const toggleActive = async (identifier: string, active: boolean) => {
    const res = await fetchApi(`${editApiBaseUrl}/${identifier}`, {
      method: "PUT",
      body: {
        isActive: active,
      },
    });

    if (res?.success) {
      await refetch();
    } else {
      displayData?.forEach((item: any) => {
        if (item[dataUniqueKey] === identifier) {
          item["isActive"] = !active;
        }
      });
    }
  };

  const getValue = (obj: any, keyPath: string | string[]) => {
    if (Array.isArray(keyPath)) {
      return keyPath.reduce((current, key) => current?.[key], obj);
    } else if (
      [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
        "expiryDate",
        "date",
      ].includes(keyPath)
    ) {
      return formatDate(obj?.[keyPath], "long");
    } else if (typeof obj?.[keyPath] === "boolean") {
      return obj?.[keyPath] ? "True" : "False";
    }

    return obj?.[keyPath];
  };

  const showingFrom = pagination
    ? (page - 1) * limit + 1
    : 0;
  const showingTo = pagination
    ? Math.min(page * limit, pagination.totalCount)
    : 0;

  return (
    <div className="flex flex-col justify-center items-center gap-4 rounded-lg w-full">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-2">
        <div className="md:mr-8 flex items-center gap-3">
          <span className="text-primary-dark text-lg font-semibold ">
            {title}
          </span>

          {data?.length > 0 && (
            <Chip
              text={`${pagination?.totalCount ?? filteredData?.length} ${title?.toLowerCase()} found`}
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Search"
          className="px-5 border grow rounded-md outline-gray-400 py-2.5"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        {createLink && (
          <SecondaryOutlineButton title="Create New" link={createLink} />
        )}
      </div>

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
          {!loading && (
            <button
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 cursor-pointer"
              onClick={async () => {
                await refetch();
              }}
              disabled={reloading}
            >
              <RefreshCw
                size={14}
                className={reloading ? "animate-spin" : ""}
              />
              {reloading ? "Refresh" : "Refresh"}
            </button>
          )}
        </div>
      )}
      <div className="w-full overflow-x-auto scrollbar pb-3">
        {loading ? (
          <Loader />
        ) : displayData?.length > 0 ? (
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
              {displayData?.map((item: any) => (
                <tr
                  key={item[dataUniqueKey]}
                  className="hover:bg-gray-50 transition"
                >
                  {dataKeys?.map((key: string | string[], keyIndex: number) => (
                    <td
                      key={keyIndex}
                      className="border-t border-gray-300 px-2 py-5 text-left text-sm text-gray-500"
                    >
                      {(() => {
                        const value = getValue(item, key as string);

                        if (keyIndex === 0 && viewLink) {
                          return (
                            <Link href={viewLink(item?.id)}>
                              {value || "N/A"}
                            </Link>
                          );
                        }

                        return value ? String(value) : "N/A";
                      })()}
                    </td>
                  ))}

                  {showActiveToggle && (
                    <td className="border-t border-gray-300 py-5 text-center">
                      <Switch
                        defaultChecked={item["isActive"]}
                        onChange={(checked) => {
                          toggleActive(item[dataUniqueKey], checked);
                        }}
                      />
                    </td>
                  )}

                  {Object.keys(actions).length > 0 && (
                    <td className="border-t border-gray-300 py-5">
                      <ActionCard
                        item={item}
                        actions={actions}
                        refetch={refetch}
                      />
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

      {pagination && pagination.totalPages > 1 && (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <span className="text-sm text-gray-500">
            Showing {showingFrom}–{showingTo} of {pagination.totalCount}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              onClick={() => setPage((p: number) => p - 1)}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            {getPageNumbers(page, pagination.totalPages).map((p, i) =>
              typeof p === "number" ? (
                <button
                  key={i}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                    p === page
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ) : (
                <span
                  key={i}
                  className="px-2 py-1.5 text-sm text-gray-400"
                >
                  &hellip;
                </span>
              )
            )}

            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              onClick={() => setPage((p: number) => p + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
