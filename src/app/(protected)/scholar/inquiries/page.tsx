/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import { PencilIcon } from "@hugeicons/core-free-icons";
import { TrashIcon } from "lucide-react";

export default function Inquiries() {
  const tabs = {
    All: (
      <Table
        title="Inquiries"
        dataApiUrl="/inquiries?fields=id,fullName,email,phone,organizationName,status,createdAt"
        createLink="/scholar/inquiries/new"
        headers={["Full Name", "Email", "Phone", "Organization", "Created"]}
        showActiveToggle={false}
        dataKeys={[
          "fullName",
          "email",
          "phone",
          "organizationName",
          "createdAt",
        ]}
        searchKeys={["fullName", "email", "phone", "organizationName"]}
        dataUniqueKey="id"
        groups={[
          {
            label: "Pending",
            dataKey: "status",
            values: ["pending"],
          },
          {
            label: "Hold",
            dataKey: "status",
            values: ["hold"],
          },
          {
            label: "Resolved",
            dataKey: "status",
            values: ["resolved"],
          },
          {
            label: "Rejected",
            dataKey: "status",
            values: ["rejected"],
          },
          {
            label: "All",
            dataKey: "status",
            values: ["pending", "hold", "resolved", "rejected"],
          },
        ]}
        actions={{
          edit: {
            label: "Edit",
            icon: PencilIcon,
            editLink: (identifier: string) =>
              `/scholar/inquiries/${identifier}/edit`,
            postEditLink: "/scholar/inquiries",
          },
          delete: {
            label: "Delete inquiry? This action cannot be undone.",
            description: "Are you sure you want to delete this inquiry?",
            icon: TrashIcon,
            deleteApiUrl: (identifier: string) => `/inquiries/${identifier}`,
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
