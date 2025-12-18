/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import { PencilIcon } from "@hugeicons/core-free-icons";
import { TrashIcon } from "lucide-react";

export default function Permissions({ roleId }: { roleId: string }) {
  const tabs = {
    All: (
      <Table
        title="Permissions"
        dataApiUrl={`/permissions?fields=id,name,route,canView,canUpdate,canCreate,canDelete,isActive,createdAt&populate=role&conditions={"roleId":"${roleId}"}`}
        createLink={`/scholar/roles/${roleId}/permissions/new`}
        headers={[
          "Name",
          "Route",
          "Role",
          "Get",
          "Put",
          "Post",
          "Delete",
          "Created",
        ]}
        dataKeys={[
          "name",
          "route",
          ["role", "name"],
          "canView",
          "canUpdate",
          "canCreate",
          "canDelete",
          "createdAt",
        ]}
        searchKeys={["name", "route"]}
        dataUniqueKey="id"
        groups={[
          {
            label: "Active",
            dataKey: "isActive",
            values: [true],
          },
          {
            label: "Inactive",
            dataKey: "isActive",
            values: [false],
          },
          {
            label: "All",
            dataKey: "isActive",
            values: [true, false],
          },
        ]}
        actions={{
          edit: {
            label: "Edit",
            icon: PencilIcon,
            editLink: (identifier: string) =>
              `/scholar/roles/${roleId}/permissions/${identifier}/edit`,
            postEditLink: `/scholar/roles/${roleId}/permissions`,
          },
          delete: {
            label: "Delete permission? This action cannot be undone.",
            description: "Are you sure you want to delete this permission?",
            icon: TrashIcon,
            deleteApiUrl: (identifier: string) => `/permissions/${identifier}`,
            reloadAfterDelete: true,
          },
        }}
      />
    ),
  } as any;

  const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);

  return (
    <div className="flex flex-col gap-4">
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
