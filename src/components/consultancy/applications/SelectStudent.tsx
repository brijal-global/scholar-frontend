"use client";
import { useState } from "react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Image from "next/image";
import { ChevronDown, Plus, Search } from "lucide-react";
import Link from "next/link";

interface SutdentTicket {
  id: string;
  studentName: string;
  studentEmail: string;
  level: string;
  phoneNumber: string;
  stage: string;
  regDate: string;
}
const mockTickets: SutdentTicket[] = [
  {
    id: "1",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    level: "Bachelor",
    phoneNumber: "9846023132",
    stage: "Profile setup",
    regDate: "Jan 4, 2022",
  },
  {
    id: "2",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    level: "Bachelor",
    phoneNumber: "9846023132",
    stage: "Documentation",
    regDate: "Jan 4, 2022",
  },
  {
    id: "3",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    level: "Bachelor",
    phoneNumber: "9846023132",
    stage: "Application Process",
    regDate: "Jan 4, 2022",
  },
  {
    id: "4",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    level: "Bachelor",
    phoneNumber: "9846023132",
    stage: "Payment",
    regDate: "Jan 4, 2022",
  },
  {
    id: "5",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    level: "Master",
    phoneNumber: "9846023132",
    stage: "Visa process",
    regDate: "Jan 4, 2022",
  },
  {
    id: "6",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    level: "Master",
    phoneNumber: "9846023132",
    stage: "Pre departure",
    regDate: "Jan 4, 2022",
  },
  {
    id: "7",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    level: "Bachelor",
    phoneNumber: "9846023132",
    stage: "Visa process",
    regDate: "Jan 4, 2022",
  },
];

export default function SelectStudent() {
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
    <div className="ml-4">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-gray-900">Search Students</h2>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search student name, email, phone number, passport number"
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
                href="/consultancy/students/new"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors max-md:w-full"
              >
                <Plus className="w-5 h-5" />
                Add New Student
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
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
                  <th className="text-left px-6 py-4  ">Student Name</th>
                  <th className="text-left px-6 py-4  ">Level</th>
                  <th className="text-left px-6 py-4  ">Phone number</th>
                  <th className="text-left px-6 py-4 ">Stage</th>
                  <th className="text-left px-6 py-4 ">Reg. Date</th>
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
                    <td className="px-6 py-4">
                      <div className="flex gap-2 items-center">
                        <Image src={FeachuredIcon} alt="ProfilePicture" />
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">{ticket.studentName}</div>
                          <div className="text-sm text-[#667085]">
                            {ticket.studentEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.level}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.stage}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.regDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className=" border px-4 py-1 rounded-sm text-gray-400 hover:text-gray-600 cursor-pointer">
                        Create Application
                      </button>
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
