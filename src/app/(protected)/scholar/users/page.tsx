/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import { PencilIcon } from "@hugeicons/core-free-icons";
import { TrashIcon } from "lucide-react";

export default function Users() {
  const tabs = {
    All: (
      <Table
        title="Users"
        dataApiUrl="/users?fields=id,firstName,lastName,email,phone,gender,address,isActive,isEmailVerified,createdAt&populate=role"
        createLink="/scholar/users/new"
        headers={[
          "Name",
          "Role",
          "Email",
          "Phone",
          "Gender",
          "Address",
          "Email verified",
          "Created",
        ]}
        dataKeys={[
          "fullName",
          ["role"],
          "email",
          "phone",
          "gender",
          "address",
          "isEmailVerified",
          "createdAt",
        ]}
        searchKeys={["firstName", "lastName", "email", "phone", "role"]}
        dataTransformer={(data: any[]) =>
          data.map(
            (item) =>
              item?.role?.name !== "superAdmin" && {
                ...item,
                fullName: `${item.firstName} ${item.lastName}`,
                role: item.role?.name,
              }
          )
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
              `/scholar/users/${identifier}/edit`,
            postEditLink: "/scholar/users",
          },
          delete: {
            label: "Delete user? This action cannot be undone.",
            description: "Are you sure you want to delete this user?",
            icon: TrashIcon,
            deleteApiUrl: (identifier: string) => `/users/${identifier}`,
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
