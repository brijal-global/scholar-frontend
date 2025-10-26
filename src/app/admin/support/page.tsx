"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical } from "lucide-react";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  ticketId: string;
  status: "Resolved" | "Pending" | "In-Progress";
  submittedDate: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: "1",
    subject: "Help with filling admission forms",
    category: "Application Support",
    ticketId: "KC234234",
    status: "Resolved",
    submittedDate: "Jan 4, 2022",
  },
  {
    id: "2",
    subject: "Issues with uploading documents",
    category: "Visa & Immigration Support",
    ticketId: "KC234234",
    status: "Pending",
    submittedDate: "Jan 4, 2022",
  },
  {
    id: "3",
    subject: "Status update on submitted applications",
    category: "General Inquiries",
    ticketId: "KC234234",
    status: "Pending",
    submittedDate: "Jan 2, 2022",
  },
  {
    id: "4",
    subject: "Payment confirmation issues",
    category: "Payment & Finance Related",
    ticketId: "KC234234",
    status: "In-Progress",
    submittedDate: "Jan 6, 2022",
  },
  {
    id: "5",
    subject: "Issues with consultancy's online portal or app",
    category: "Admission Support",
    ticketId: "KC234234",
    status: "Resolved",
    submittedDate: "Jan 8, 2022",
  },
  {
    id: "6",
    subject: "Application process guidance",
    category: "Admission Support",
    ticketId: "KC234234",
    status: "Resolved",
    submittedDate: "Jan 6, 2022",
  },
  {
    id: "7",
    subject: "Help with filling admission forms",
    category: "Application Support",
    ticketId: "KC234234",
    status: "Resolved",
    submittedDate: "Jan 4, 2022",
  },
];

function StatusBadge({ status }: { status: SupportTicket["status"] }) {
  const statusStyles = {
    Resolved: "bg-[#D7FFD9] text-[#1E9E24]",
    Pending: "bg-[#DAE1FF] text-[#3155DC]",
    "In-Progress": "bg-[#FFF4D5] text-[#99813B]",
  };

  return (
    <span
      className={`px-3 py-1 rounded-md text-sm font-medium ${statusStyles[status]} text-nowrap`}
    >
      {status}
    </span>
  );
}

export default function SupportPage() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(mockTickets.map((ticket) => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (ticketId: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets((prev) => [...prev, ticketId]);
    } else {
      setSelectedTickets((prev) => prev.filter((id) => id !== ticketId));
    }
  };

  const isAllSelected = selectedTickets.length === mockTickets.length;
  const isIndeterminate =
    selectedTickets.length > 0 && selectedTickets.length < mockTickets.length;

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Supports ({mockTickets.length} Total)
          </h1>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search student name, application id..."
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
                  <th className="text-left pr-6 py-4  ">Subject</th>
                  <th className="text-left px-6 py-4 ">Category</th>
                  <th className="text-left px-6 py-4 ">Ticket ID</th>
                  <th className="text-left px-6 py-4  ">Status</th>
                  <th className="text-left px-6 py-4  ">Submitted Date</th>
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
                    <td className="pr-6 py-4">
                      <div className="text-sm">{ticket.subject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.ticketId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085">
                        {ticket.submittedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
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
    </div>
  );
}
