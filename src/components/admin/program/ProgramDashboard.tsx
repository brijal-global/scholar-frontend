"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";
import { Dropdown, MenuProps, Space, Switch } from "antd";

interface ProgramTicket {
  id: string;
  programName: string;
  programType: string;
  degree: string;
  tution: string;
  regDate: string;
}

const mockTickets: ProgramTicket[] = [
  {
    id: "1",
    programName: "Master in Business Administration",
    programType: "Business",
    degree: "Master",
    tution: "$4000.00",
    regDate: "Jan 4, 2022",
  },
  {
    id: "2",
    programName: "Master in Business Administration",
    programType: "Business",
    degree: "Master",
    tution: "$4000.00",
    regDate: "Jan 4, 2022",
  },
  {
    id: "3",
    programName: "Master in Business Administration",
    programType: "Business",
    degree: "Master",
    tution: "$4000.00",
    regDate: "Jan 4, 2022",
  },
  {
    id: "4",
    programName: "Master in Business Administration",
    programType: "Business",
    degree: "Master",
    tution: "$4000.00",
    regDate: "Jan 4, 2022",
  },
  {
    id: "5",
    programName: "Master in Business Administration",
    programType: "Business",
    degree: "Master",
    tution: "$4000.00",
    regDate: "Jan 4, 2022",
  },
  {
    id: "6",
    programName: "Master in Business Administration",
    programType: "Business",
    degree: "Master",
    tution: "$4000.00",
    regDate: "Jan 4, 2022",
  },
  {
    id: "7",
    programName: "Master in Business Administration",
    programType: "Business",
    degree: "Master",
    tution: "$4000.00",
    regDate: "Jan 4, 2022",
  },
];

const items: MenuProps["items"] = [
  {
    label: <a href="#">View program</a>,
    key: "0",
  },

  {
    type: "divider",
  },
  {
    label: <a href="#">Edit program</a>,
    key: "1",
  },

  {
    type: "divider",
  },
  {
    label: <a href="#">Delete university</a>,
    key: "2",
  },
];

export default function ProgramDashboard() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<"March" | "June" | "August">(
    "March"
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(mockTickets.map((ticket) => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (degree: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets((prev) => [...prev, degree]);
    } else {
      setSelectedTickets((prev) => prev.filter((id) => id !== degree));
    }
  };

  const isAllSelected = selectedTickets.length === mockTickets.length;
  const isIndeterminate =
    selectedTickets.length > 0 && selectedTickets.length < mockTickets.length;

  const handleButtonClick = (intake: "March" | "June" | "August") => {
    console.log(`Selected: ${intake}`);
    setSelected(intake);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold text-gray-900">
            Programs of Seoul University ({mockTickets.length} Total)
          </h1>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search program names, intake, "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
              />
            </div>
            <div className="flex items-center gap-4 max-md:flex-grow">
              <div className="relative max-md:w-full">
                <select className=" text-[#A7A7A7] appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                  <option>Sort</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                  <option>Status</option>
                  <option>stage</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              <Link
                href="/admin/program/new"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors max-md:w-full"
              >
                <Plus className="w-5 h-5" />
                Add New Program
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
                  <th className="text-left pr-6 py-4 md:w-sm">Program Name</th>
                  <th className="text-left px-6 py-4">Degree</th>
                  <th className="text-left px-6 py-4">Tution fee/semester</th>
                  <th className="text-center px-6 py-4">Intakes</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-6 py-4">Active</th>
                  <th className="text-left px-6 py-4">Last Update</th>
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
                    <td className="py-4 pr-4 md:w-sm">
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">{ticket.programName}</div>
                          <div className="text-sm text-[#667085]">
                            {ticket.programType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.degree}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085] text-center">
                        {ticket.tution}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085] text-center flex gap-3">
                        <button
                          onClick={() => handleButtonClick("March")}
                          className={`rounded-sm px-3 w-full ${
                            selected === "March"
                              ? "bg-[#43AE48] text-white"
                              : "bg-[#EFEFEF] text-black border border-[#E3E3E3]"
                          }`}
                        >
                          March
                        </button>
                        <button
                          onClick={() => handleButtonClick("June")}
                          className={`rounded-sm  px-3 w-full ${
                            selected === "June"
                              ? "bg-[#43AE48] text-white"
                              : "bg-[#EFEFEF] text-black border border-[#E3E3E3]"
                          }`}
                        >
                          June
                        </button>
                        <button
                          onClick={() => handleButtonClick("August")}
                          className={`rounded-sm px-3 w-full ${
                            selected === "August"
                              ? "bg-[#43AE48] text-white"
                              : "bg-[#EFEFEF] text-black border border-[#E3E3E3]"
                          }`}
                        >
                          August
                        </button>
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
      </div>
    </div>
  );
}
