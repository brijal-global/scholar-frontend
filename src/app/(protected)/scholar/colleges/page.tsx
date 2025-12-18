/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import { PencilIcon } from "@hugeicons/core-free-icons";
import { TrashIcon } from "lucide-react";

export default function Colleges() {
  const tabs = {
    All: (
      <Table
        title="Colleges"
        dataApiUrl="/colleges?fields=id,name,collegeType,country,city,streetAddress,isAttendanceClassBased,createdAt,isActive,logo"
        createLink="/scholar/colleges/new"
        headers={["Name", "Type", "Country", "City", "Address", "Created"]}
        dataKeys={[
          "name",
          "collegeType",
          "country",
          "city",
          "streetAddress",
          "createdAt",
        ]}
        searchKeys={["name", "city", "country"]}
        dataUniqueKey="id"
        viewLink={(identifier: string) =>
          `/scholar/colleges/${identifier}/subscriptions`
        }
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
              `/scholar/colleges/${identifier}/edit`,
            postEditLink: "/scholar/colleges",
          },
          delete: {
            label: "Delete college? This action cannot be undone.",
            description: "Are you sure you want to delete this college?",
            icon: TrashIcon,
            deleteApiUrl: (identifier: string) => `/colleges/${identifier}`,
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
