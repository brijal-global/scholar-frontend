"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical } from "lucide-react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Image from "next/image";
import { Dropdown, MenuProps, Space } from "antd";

interface ConsultancyTicket {
  id: string;
  consultancyName: string;
  consultancyEmail: string;
  contanctPerson: string;
  phoneNumber: string;
  studentNo: string;
  country: string;
}

const mockTickets: ConsultancyTicket[] = [
  {
    id: "1",
    consultancyName: "ABC Consultancy",
    consultancyEmail: "james@gmail.com",
    contanctPerson: "Rahul Maharjan",
    phoneNumber: "9846023132",
    studentNo: "250",
    country: "Nepal",
  },
  {
    id: "2",
    consultancyName: "ABC Consultancy",
    consultancyEmail: "james@gmail.com",
    contanctPerson: "Rahul Maharjan",
    phoneNumber: "9846023132",
    studentNo: "250",
    country: "Nepal",
  },
  {
    id: "3",
    consultancyName: "ABC Consultancy",
    consultancyEmail: "james@gmail.com",
    contanctPerson: "Rahul Maharjan",
    phoneNumber: "9846023132",
    studentNo: "250",
    country: "Nepal",
  },
  {
    id: "4",
    consultancyName: "ABC Consultancy",
    consultancyEmail: "james@gmail.com",
    contanctPerson: "Rahul Maharjan",
    phoneNumber: "9846023132",
    studentNo: "250",
    country: "Nepal",
  },
  {
    id: "5",
    consultancyName: "ABC Consultancy",
    consultancyEmail: "james@gmail.com",
    contanctPerson: "Rahul Maharjan",
    phoneNumber: "9846023132",
    studentNo: "250",
    country: "Nepal",
  },
  {
    id: "6",
    consultancyName: "ABC Consultancy",
    consultancyEmail: "james@gmail.com",
    contanctPerson: "Rahul Maharjan",
    phoneNumber: "9846023132",
    studentNo: "250",
    country: "Nepal",
  },
  {
    id: "7",
    consultancyName: "ABC Consultancy",
    consultancyEmail: "james@gmail.com",
    contanctPerson: "Rahul Maharjan",
    phoneNumber: "9818639012",
    studentNo: "250",
    country: "Nepal",
  },
];

const items: MenuProps["items"] = [
  {
    label: <a href="#">View Profile</a>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: <a href="#">View Students</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Notify",
  },
];

const navItems: MenuProps["items"] = [
  {
    label: "CSV",
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "Excel",
    key: "1",
  },
];
export default function Dashboard() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(mockTickets.map((ticket) => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (phoneNumber: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets((prev) => [...prev, phoneNumber]);
    } else {
      setSelectedTickets((prev) => prev.filter((id) => id !== phoneNumber));
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
            <h1 className="text-lg font-semibold text-gray-900">
              Consultancy ({mockTickets.length} Total)
            </h1>

            {/* Search and Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search consultancy name, country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
                />
              </div>

              <div className="flex items-center gap-4 max-md:flex-grow">
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
                  <Dropdown menu={{ items: navItems }} trigger={["click"]}>
                    <div
                      className="appearance-none bg-white border border-[#E1E1E1] text-[#A7A7A7] rounded-md px-4 py-3 pr-10 outline-none w-full"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        Export
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      </Space>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Table */}
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
                    <th className="text-left px-6 py-4 w-lg">Student Name</th>
                    <th className="text-left px-6 py-4">Contact Person</th>
                    <th className="text-left px-6 py-4">Contact number</th>
                    <th className="text-left px-6 py-4">Student No.</th>
                    <th className="text-left px-6 py-4">Country</th>
                    <th className="text-left px-6 py-4">Action</th>
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
                      <td className="px-6 py-4 w-lg">
                        <div className="flex gap-2 items-center">
                          <Image src={FeachuredIcon} alt="ProfilePicture" />
                          <div className="flex flex-col gap-1">
                            <div className="text-sm">
                              {ticket.consultancyName}
                            </div>
                            <div className="text-sm text-[#667085]">
                              {ticket.consultancyEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#667085]">
                          {ticket.contanctPerson}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#667085]">
                          {ticket.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#667085]">
                          {ticket.studentNo}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#667085]">
                          {ticket.country}
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
      </div>
    </section>
  );
}
