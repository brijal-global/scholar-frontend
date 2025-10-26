"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical, Plus } from "lucide-react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Image from "next/image";
import { Dropdown, MenuProps, Space, Switch } from "antd";
import Link from "next/link";

interface AdminTicket {
  id: string;
  adminName: string;
  adminEmail: string;
  role: string;
  lastLogin: string;
}

const mockTickets: AdminTicket[] = [
  {
    id: "1",
    adminName: "Admin 1",
    adminEmail: "james@gmail.com",
    role: "Admin",
    lastLogin: "Jan 4, 2022",
  },
  {
    id: "2",
    adminName: "Admin 2",
    adminEmail: "james@gmail.com",
    role: "Admin",
    lastLogin: "Jan 4, 2022",
  },
  {
    id: "3",
    adminName: "Admin 3",
    adminEmail: "james@gmail.com",
    role: "Admin",
    lastLogin: "Jan 4, 2022",
  },
  {
    id: "4",
    adminName: "Admin 4",
    adminEmail: "james@gmail.com",
    role: "Admin",
    lastLogin: "Jan 4, 2022",
  },
  {
    id: "5",
    adminName: "Admin 5",
    adminEmail: "james@gmail.com",
    role: "Admin",
    lastLogin: "Jan 4, 2022",
  },
  {
    id: "6",
    adminName: "Admin 6",
    adminEmail: "james@gmail.com",
    role: "Admin",
    lastLogin: "Jan 4, 2022",
  },
  {
    id: "7",
    adminName: "Admin 7",
    adminEmail: "james@gmail.com",
    role: "Admin",
    lastLogin: "Jan 4, 2022",
  },
];

const items: MenuProps["items"] = [
  {
    label: <a href="#">Create Admin</a>,
    key: "0",
  },

  {
    type: "divider",
  },
  {
    key: "1",
    label: "Edit",
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Reset Password",
  },
];

export default function Students() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(mockTickets.map((ticket) => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (applicationID: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets((prev) => [...prev, applicationID]);
    } else {
      setSelectedTickets((prev) => prev.filter((id) => id !== applicationID));
    }
  };

  const isAllSelected = selectedTickets.length === mockTickets.length;
  const isIndeterminate =
    selectedTickets.length > 0 && selectedTickets.length < mockTickets.length;

  return (
    <section>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Admin List</h1>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4 max-md:flex-grow">
              <div className="relative max-md:w-full">
                <select className="appearance-none bg-white border border-[#E1E1E1] text-[#A7A7A7] rounded-md px-4 py-3 pr-10 outline-none w-full">
                  <option>Sort</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                  <option>Status</option>
                  <option>studentNo</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              <div className="relative max-md:w-full">
                <select className="appearance-none bg-white border border-[#E1E1E1] text-[#A7A7A7] rounded-md px-4 py-3 pr-10 outline-none w-full">
                  <option>Export</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <Link
                href="/admin/user-management/new"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors max-md:w-full"
              >
                <Plus className="w-5 h-5" />
                Create Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 text-sm font-medium text-gray-500 text-nowrap">
                <tr>
                  <th className="w-8 px-4 py-4">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isIndeterminate;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 border-none rounded outline-none"
                    />
                  </th>
                  <th className="text-left px-4 py-4">Admin Name</th>
                  <th className="text-right">Role</th>
                  <th className="text-right">Active</th>
                  <th className="text-right">Last Login</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#EAECF0]">
                {mockTickets.map((ticket, index) => (
                  <tr
                    key={ticket.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-[#F9FAFB]" : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedTickets.includes(ticket.id)}
                        onChange={(e) =>
                          handleSelectTicket(ticket.id, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-none rounded outline-none"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2 items-center">
                        <Image src={FeachuredIcon} alt="ProfilePicture" />
                        <div className="flex flex-col gap-1">
                          <p className="text-sm">{ticket.adminName}</p>
                          <p className="text-sm text-[#667085]">
                            {ticket.adminEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="text-sm text-[#667085]">
                        {ticket.role}
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="text-sm text-[#667085]">
                        <Switch />
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="text-sm text-[#667085]">
                        {ticket.lastLogin}
                      </div>
                    </td>
                    <td className="text-center">
                      <Dropdown menu={{ items }} trigger={["click"]}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <MoreVertical className="w-5 h-5" />
                          </Space>
                        </a>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
