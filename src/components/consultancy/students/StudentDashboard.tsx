"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  View,
  Trash2,
  FileText,
  SquarePen,
} from "lucide-react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Link from "next/link";
import Image from "next/image";
import DeleteStudent from "@/components/modals/consultancy/DeleteStudent";

interface SutdentTicket {
  id: string;
  studentName: string;
  studentEmail: string;
  phoneNumber: string;
  stage: string;
  regDate: string;
}

const mockTickets: SutdentTicket[] = [
  {
    id: "1",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    phoneNumber: "9846023132",
    stage: "Profile setup",
    regDate: "Jan 4, 2022",
  },
  {
    id: "2",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    phoneNumber: "9846023132",
    stage: "Documentation",
    regDate: "Jan 4, 2022",
  },
  {
    id: "3",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    phoneNumber: "9846023132",
    stage: "Application Process",
    regDate: "Jan 4, 2022",
  },
  {
    id: "4",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    phoneNumber: "9846023132",
    stage: "Payment",
    regDate: "Jan 4, 2022",
  },
  {
    id: "5",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    phoneNumber: "9846023132",
    stage: "Visa process",
    regDate: "Jan 4, 2022",
  },
  {
    id: "6",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    phoneNumber: "9846023132",
    stage: "Pre departure",
    regDate: "Jan 4, 2022",
  },
  {
    id: "7",
    studentName: "James Maharjan",
    studentEmail: "james@gmail.com",
    phoneNumber: "9846023132",
    stage: "Visa process",
    regDate: "Jan 4, 2022",
  },
];

export default function StudentDashboard() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  return (
    <main>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Students ({mockTickets.length} Total)
          </h1>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search student name"
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
                  <th className="text-left px-6 py-4  ">Student Name</th>
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
                      <div className="text-[#98A2B3] flex gap-4">
                        <View />
                        <FileText />
                        <SquarePen />
                        <button onClick={handleDeleteClick}>
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteStudent
        isOpen={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        action={() => setShowDeleteModal(false)} // dummy action
      />
    </main>
  );
}
