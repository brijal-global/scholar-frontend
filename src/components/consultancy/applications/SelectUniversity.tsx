"use client";
import { useState } from "react";
import uniIcon from "@/assets/icons/UniversityIcon.svg";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";

interface SelectUniversity {
  id: string;
  programName: string;
  programLocation: string;
  avgTution: string;
  applicationFee: string;
  intake: string;
  EPT: string;
}
const mockTickets: SelectUniversity[] = [
  {
    id: "1",
    programName: "Seoul University",
    programLocation: "Seoul, South Korea",
    avgTution: "$1,500 – $4,000",
    applicationFee: "$100",
    intake: "March",
    EPT: "IELTS/TOFEL",
  },
  {
    id: "2",
    programName: "Seoul University",
    programLocation: "Seoul, South Korea",
    avgTution: "$1,500 – $4,000",
    applicationFee: "$100",
    intake: "March",
    EPT: "IELTS/TOFEL",
  },
  {
    id: "3",
    programName: "Seoul University",
    programLocation: "Seoul, South Korea",
    avgTution: "$1,500 – $4,000",
    applicationFee: "$100",
    intake: "March",
    EPT: "IELTS/TOFEL",
  },
  {
    id: "4",
    programName: "Seoul University",
    programLocation: "Seoul, South Korea",
    avgTution: "$1,500 – $4,000",
    applicationFee: "$100",
    intake: "March",
    EPT: "IELTS/TOFEL",
  },
  {
    id: "5",
    programName: "Seoul University",
    programLocation: "Seoul, South Korea",
    avgTution: "$1,500 – $4,000",
    applicationFee: "$100",
    intake: "March",
    EPT: "IELTS/TOFEL",
  },
  {
    id: "6",
    programName: "Seoul University",
    programLocation: "Seoul, South Korea",
    avgTution: "$1,500 – $4,000",
    applicationFee: "$100",
    intake: "March",
    EPT: "IELTS/TOFEL",
  },
  {
    id: "7",
    programName: "Seoul University",
    programLocation: "Seoul, South Korea",
    avgTution: "$1,500 – $4,000",
    applicationFee: "$100",
    intake: "March",
    EPT: "IELTS/TOFEL",
  },
];

export default function SelectUniversity() {
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
    <div className="mx-4">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-gray-900">
            Select a university
          </h2>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search university name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
              />
            </div>

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
                  <th className="text-left px-6 py-4  ">University name</th>
                  <th className="text-left px-6 py-4  ">
                    Avg. Tuition fee/semester
                  </th>
                  <th className="text-left px-6 py-4  ">Application fee</th>
                  <th className="text-left px-6 py-4 ">Intake</th>
                  <th className="text-left px-6 py-4 ">EPT</th>
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
                        <Image src={uniIcon} alt="ProfilePicture" />
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">{ticket.programName}</div>
                          <div className="text-sm text-[#667085]">
                            {ticket.programLocation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.avgTution}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.applicationFee}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.intake}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">{ticket.EPT}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button className=" border px-4 py-1 rounded-sm text-gray-400 hover:text-gray-600 cursor-pointer">
                        Select University
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
