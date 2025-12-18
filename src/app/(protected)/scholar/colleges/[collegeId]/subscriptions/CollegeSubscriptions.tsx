/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import { PencilIcon } from "@hugeicons/core-free-icons";
import { TrashIcon } from "lucide-react";

export default function CollegeSubscriptions({
  collegeId,
}: {
  collegeId: string;
}) {
  const tabs = {
    All: (
      <Table
        title="Subscriptions"
        dataApiUrl={`/subscriptions?fields=id,name,collegeId,maxAllowedStudents,startDate,expiryDate,totalAmount,isActive,createdAt&conditions={"collegeId":"${collegeId}"}`}
        createLink={`/scholar/colleges/${collegeId}/subscriptions/new`}
        headers={[
          "Subscription Name",
          "Max Students",
          "Start Date",
          "Expiry Date",
          "Total Amount",
          "Created",
        ]}
        dataKeys={[
          "name",
          "maxAllowedStudents",
          "startDate",
          "expiryDate",
          "totalAmount",
          "createdAt",
        ]}
        searchKeys={["name"]}
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
              `/scholar/colleges/${collegeId}/subscriptions/${identifier}/edit`,
            postEditLink: `/scholar/colleges/${collegeId}/subscriptions`,
          },
          delete: {
            label: "Delete subscription? This action cannot be undone.",
            description: "Are you sure you want to delete this subscription?",
            icon: TrashIcon,
            deleteApiUrl: (identifier: string) =>
              `/subscriptions/${identifier}`,
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
