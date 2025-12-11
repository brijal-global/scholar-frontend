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
  const [currentTab, setCurrentTab] = useState("All");

  const { data, loading, hitApi: refetch } = useFetch("/roles") as any;

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
        data={filtered}
        refetch={refetch}
        hasView={false}
        actions={{
          edit: {
            label: "Edit",
            icon: PencilIcon,
            editLink: (id: string) => `/scholar/roles/${id}/edit`,
            postEditLink: "/scholar/roles",
          },
          delete: {
            label: "Delete role? This action cannot be undone.",
            description: "Are you sure you want to delete this role?",
            icon: TrashIcon,
            deleteApiUrl: (id: string) => `/roles/${id}`,
            postDelete: () => {
              refetch();
            },
          },
        }}
      />
    ),
  } as any;

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
      {loading && <Loader />}
      {!loading && tabs[currentTab]}
    </div>
  );
}
