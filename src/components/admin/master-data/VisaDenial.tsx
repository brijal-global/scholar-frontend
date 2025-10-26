"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";

interface LanguageTicket {
  id: string;
  documentName: string;
  description: string;
  modifiedDate: string;
}

const mockTickets: LanguageTicket[] = [
  {
    id: "1",
    documentName: "R-1",
    description: "Incomplete employer sponsorship documents",
    modifiedDate: "2025-09-08",
  },
  {
    id: "2",
    documentName: "R-2",
    description: "Unverified admission letter",
    modifiedDate: "2025-09-08",
  },
  {
    id: "3",
    documentName: "R-1",
    description: "Incomplete employer sponsorship documents",
    modifiedDate: "2025-09-08",
  },
  {
    id: "4",
    documentName: "R-2",
    description: "Unverified admission letter",
    modifiedDate: "2025-09-08",
  },
  {
    id: "5",
    documentName: "R-1",
    description: "Incomplete employer sponsorship documents",
    modifiedDate: "2025-09-08",
  },
  {
    id: "6",
    documentName: "R-2",
    description: "Unverified admission letter",
    modifiedDate: "2025-09-08",
  },
  {
    id: "7",
    documentName: "R-1",
    description: "Incomplete employer sponsorship documents",
    modifiedDate: "2025-09-08",
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
          <h3 className="font-bold text-gray-900">Visa Denial Documents</h3>

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
                <select className="appearance-none bg-white border border-[#E1E1E1] text-[#A7A7A7] rounded-md px-4 py-3 pr-10 outline-none w-full">
                  <option>Export</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <Link
                href="#"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors max-md:w-full"
              >
                <Plus className="w-5 h-5" /> Add Visa Documents
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
                  <th className="text-left pr-4 py-4">Document Name</th>
                  <th className="text-left">Description</th>
                  <th className="text-left">Modified Date</th>
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
                    <td>
                      <div className="text-sm text-[#667085]">
                        {ticket.documentName}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-[#667085]">
                        {ticket.description}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-[#667085]">
                        {ticket.modifiedDate}
                      </div>
                    </td>
                    <td className="text-center">
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreVertical className="w-5 h-5" />
                      </button>
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
