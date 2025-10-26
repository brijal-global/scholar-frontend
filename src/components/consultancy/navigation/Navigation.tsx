"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical } from "lucide-react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Image from "next/image";

interface NotificationTicket {
  id: string;
  applicantName: string;
  applicantEmail: string;
  universityName: string;
  universityCourse: string;
  subject: string;
  category: string;
  joinedDate: string;
}

const mockTickets: NotificationTicket[] = [
  {
    id: "1",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    subject: "Application Status Updated",
    category: "Application",
    joinedDate: "Jan 4, 2022",
  },
  {
    id: "2",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    subject: "Application Status Updated",
    category: "Application",
    joinedDate: "Jan 4, 2022",
  },
  {
    id: "3",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    subject: "Application Status Updated",
    category: "Application",
    joinedDate: "Jan 4, 2022",
  },
  {
    id: "4",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    subject: "Application Status Updated",
    category: "Application",
    joinedDate: "Jan 4, 2022",
  },
  {
    id: "5",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    subject: "Application Status Updated",
    category: "Application",
    joinedDate: "Jan 4, 2022",
  },
  {
    id: "6",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    subject: "Application Status Updated",
    category: "Application",
    joinedDate: "Jan 4, 2022",
  },
  {
    id: "7",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    subject: "Application Status Updated",
    category: "Application",
    joinedDate: "Jan 4, 2022",
  },
];

export default function NotificationPage() {
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
    <div className="">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Notifications ({mockTickets.length} Total)
          </h1>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
              />
            </div>

            <div className="flex items-center gap-4 max-md:flex-grow">
              <div className="relative w-3xs max-md:w-full">
                <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                  <option>Sort</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                  <option>Status</option>
                  <option>universityName</option>
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
                  <th className="text-left px-6 py-4  ">Applicant Name</th>
                  <th className="text-left px-6 py-4 ">University name</th>
                  <th className="text-left px-6 py-4 ">Subject</th>
                  <th className="text-left px-6 py-4  ">Category</th>
                  <th className="text-left px-6 py-4  ">Date</th>
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
                          <p className="text-sm">{ticket.applicantName}</p>
                          <p className="text-sm text-[#667085]">
                            {ticket.applicantEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm">{ticket.universityName}</div>
                        <div className="text-sm text-[#667085]">
                          {ticket.universityCourse}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.joinedDate}
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
