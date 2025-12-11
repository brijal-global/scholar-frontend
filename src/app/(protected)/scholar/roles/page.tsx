/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Table from "@/components/ui/Table";
import Loader from "@/components/ui/Loader";
import useFetch from "@/hooks/useFetch";
import Chip from "@/components/ui/Chip";
import { PencilIcon } from "@hugeicons/core-free-icons";
import { TrashIcon } from "lucide-react";

export default function Roles() {
  const [searchTerm, setSearchTerm] = useState("") as any;

  const { data, loading, hitApi: refetch, error } = useFetch("/roles") as any;

  const [filtered, setFiltered] = useState() as any;

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setFiltered(
          data.filter(
            (item: any) =>
              item?.name
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase().trim()) ||
              item?.description
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase().trim())
          )
        );
      }, 0);
    }
  }, [data, searchTerm]);

  const tabs = {
    All: (
      <Table
        headers={["Name", "Description", "Created"]}
        data_keys={["name", "description", "createdAt"]}
        data_unique_key="id"
        data={filtered}
        loading={loading}
        error={error}
        refetch={refetch}
        groups={[
          {
            label: "Active",
            data_key: "isActive",
            values: [true],
          },
          {
            label: "Inactive",
            data_key: "isActive",
            values: [false],
          },
          {
            label: "All",
            data_key: "isActive",
            values: [true, false],
          },
        ]}
        actions={{
          edit: {
            label: "Edit",
            icon: PencilIcon,
            editLink: (identifier: string) =>
              `/scholar/roles/${identifier}/edit`,
            postEditLink: "/scholar/roles",
          },
          delete: {
            label: "Delete role? This action cannot be undone.",
            description: "Are you sure you want to delete this role?",
            icon: TrashIcon,
            deleteApiUrl: (identifier: string) => `/roles/${identifier}`,
            postDelete: () => {
              refetch();
            },
          },
        }}
      />
    ),
  } as any;

  const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row md:items-center text-sm gap-2">
        <div className="md:mr-8 flex items-center gap-3">
          <span className="text-primary-dark text-lg font-semibold ">
            Roles
          </span>

          <Chip text={`${data?.length || 0} roles found`} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="px-5 border grow rounded-md outline-gray-400 py-2.5"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        <Link
          href={"/scholar/roles/new"}
          className="py-2.5 px-8 rounded-md font-medium bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition text-center text-nowrap"
        >
          Create New Role
        </Link>
      </div>
      {Object.keys(tabs).length > 1 && (
        <div className="flex items-center gap-6">
          {Object.keys(tabs).map((tab: string) => (
            <button
              key={tab}
              className={
                "cursor-pointer text-sm font-medium p-1 transition-all duration-300" +
                (currentTab === tab
                  ? "text-primary border-primary border-b-2"
                  : " border-transparent border-b-2")
              }
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      {tabs[currentTab]}
    </div>
  );
}
