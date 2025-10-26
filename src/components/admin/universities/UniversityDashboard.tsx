"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical, Plus } from "lucide-react";
import Logo from "@/assets/illustrations/uniLogo.svg";
import Link from "next/link";
import Image from "next/image";
import { Dropdown, MenuProps, Space, Switch } from "antd";
import EmptyApplication from "./EmptyUniversity";

interface UniversityTicket {
  id: string;
  uniName: string;
  uniLocation: string;
  programNumber: string;
  regDate: string;
}

const mockTickets: UniversityTicket[] = [
  {
    id: "1",
    uniName: "Seoul University",
    uniLocation: "Seoul, South Korea",
    programNumber: "2 Programs",
    regDate: "Jan 4, 2022",
  },
  {
    id: "2",
    uniName: "Seoul University",
    uniLocation: "Seoul, South Korea",
    programNumber: "2 Programs",
    regDate: "Jan 4, 2022",
  },
  {
    id: "3",
    uniName: "Seoul University",
    uniLocation: "Seoul, South Korea",
    programNumber: "2 Programs",
    regDate: "Jan 4, 2022",
  },
  {
    id: "4",
    uniName: "Seoul University",
    uniLocation: "Seoul, South Korea",
    programNumber: "2 Programs",
    regDate: "Jan 4, 2022",
  },
  {
    id: "5",
    uniName: "Seoul University",
    uniLocation: "Seoul, South Korea",
    programNumber: "2 Programs",
    regDate: "Jan 4, 2022",
  },
  {
    id: "6",
    uniName: "Seoul University",
    uniLocation: "Seoul, South Korea",
    programNumber: "2 Programs",
    regDate: "Jan 4, 2022",
  },
  {
    id: "7",
    uniName: "Seoul University",
    uniLocation: "Seoul, South Korea",
    programNumber: "2 Programs",
    regDate: "Jan 4, 2022",
  },
];

const items: MenuProps["items"] = [
  {
    label: <a href="#">View Details</a>,
    key: "0",
  },

  {
    type: "divider",
  },
  {
    label: <a href="#">Edit Details</a>,
    key: "1",
  },

  {
    type: "divider",
  },
  {
    label: <a href="#">View programs</a>,
    key: "2",
  },

  {
    type: "divider",
  },
  {
    label: <a href="#">Delete university</a>,
    key: "3",
  },
];

export default function UniversityDashboard() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(mockTickets.map((ticket) => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (programNumber: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets((prev) => [...prev, programNumber]);
    } else {
      setSelectedTickets((prev) => prev.filter((id) => id !== programNumber));
    }
  };

  const isAllSelected = selectedTickets.length === mockTickets.length;
  const isIndeterminate =
    selectedTickets.length > 0 && selectedTickets.length < mockTickets.length;

  return (
    <section>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <header>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold text-gray-900">
              University ({mockTickets.length} Total)
            </h1>

            {/* Search and Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search university name, location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
                />
              </div>

              <div className="flex items-center gap-4 max-md:flex-grow">
                <div className="relative max-md:w-full">
                  <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                    <option>Sort</option>
                    <option>Date (Newest)</option>
                    <option>Date (Oldest)</option>
                    <option>Status</option>
                    <option>stage</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>

                <Link
                  href="/admin/universities/new"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors max-md:w-full"
                >
                  <Plus className="w-5 h-5" />
                  Add New University
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* If empty university */}
        {mockTickets.length === 0 && <EmptyApplication />}

        {mockTickets.length > 0 && (
          <main>
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
                      <th className="text-left px-6 py-4  ">University Name</th>
                      <th className="text-left px-6 py-4  ">No. of programs</th>
                      <th className="text-left px-6 py-4 ">Status</th>
                      <th className="text-left px-6 py-4 ">Active</th>
                      <th className="text-left px-6 py-4  ">Last Update</th>
                      <th className="text-left px-6 py-4  ">Action</th>
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
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedTickets.includes(ticket.id)}
                            onChange={(e) =>
                              handleSelectTicket(ticket.id, e.target.checked)
                            }
                            className="w-4 h-4 text-blue-600 border-none rounded outline-none"
                          />
                        </td>
                        <td className="py-4 pr-4 md:w-sm">
                          <div className="flex gap-2 items-center">
                            <Image
                              src={Logo}
                              alt="ProfilePicture"
                              className="bg-[#E0E0E0] rounded-full"
                            />
                            <div className="flex flex-col gap-1">
                              <div className="text-sm">{ticket.uniName}</div>
                              <div className="text-sm text-[#667085]">
                                {ticket.uniLocation}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 md:w-sm">
                          <div className="text-sm text-[#667085]">
                            {ticket.programNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#667085]">
                            <Switch />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#667085]">
                            <Switch />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#667085]">
                            {ticket.regDate}
                          </div>
                        </td>
                        <td className="px-6 py-4">
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
          </main>
        )}
      </div>
    </section>
  );
}
