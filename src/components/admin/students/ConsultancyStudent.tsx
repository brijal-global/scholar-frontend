"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical } from "lucide-react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Image from "next/image";
import { Dropdown, MenuProps, Space } from "antd";

interface StudentTicket {
  id: string;
  applicantName: string;
  applicantEmail: string;
  universityName: string;
  universityCourse: string;
  studentID: string;
  nationality: string;
  document: "Verified" | "Rejected" | "Pending";
  appStatus: "Submitted" | "UnderReview" | "Rejected" | "Pending";
  payment: "Paid" | "Unpaid";
  visaStatus: "Approved" | "NotStarted" | "Rejected" | "Pending";
}

const mockTickets: StudentTicket[] = [
  {
    id: "1",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    studentID: "KC234234",
    nationality: "Neplease",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    visaStatus: "Approved",
  },
  {
    id: "2",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    studentID: "KC234234",
    nationality: "Neplease",
    document: "Verified",
    appStatus: "UnderReview",
    payment: "Unpaid",
    visaStatus: "NotStarted",
  },
  {
    id: "3",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    studentID: "KC234234",
    nationality: "Neplease",
    document: "Rejected",
    appStatus: "Rejected",
    payment: "Paid",
    visaStatus: "Rejected",
  },
  {
    id: "4",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    studentID: "KC234234",
    nationality: "Neplease",
    document: "Pending",
    appStatus: "Pending",
    payment: "Unpaid",
    visaStatus: "Pending",
  },
  {
    id: "5",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    studentID: "KC234234",
    nationality: "Neplease",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    visaStatus: "Approved",
  },
  {
    id: "6",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    studentID: "KC234234",
    nationality: "Neplease",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    visaStatus: "Approved",
  },
  {
    id: "7",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    studentID: "KC234234",
    nationality: "Neplease",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    visaStatus: "Approved",
  },
];

const items: MenuProps["items"] = [
  {
    label: <a href="#">View Application</a>,
    key: "0",
  },

  {
    type: "divider",
  },
  {
    key: "1",
    label: "Notify",
  },
];

export default function ConsultancyStudent() {
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

  function StylePallet({
    status,
  }: {
    status:
      | StudentTicket["document"]
      | StudentTicket["appStatus"]
      | StudentTicket["payment"]
      | StudentTicket["visaStatus"];
  }) {
    const Styles = {
      Verified: "bg-[#D7FFD9] text-[#1E9E24]",
      Approved: "bg-[#D7FFD9] text-[#1E9E24]",
      Paid: "bg-[#D7FFD9] text-[#1E9E24]",
      Submitted: "bg-[#D7FFD9] text-[#1E9E24]",
      Pending: "bg-[#DAE1FF] text-[#3155DC]",
      Unpaid: "bg-[#FFE9E9] text-[#DE4F4F]",
      Rejected: "bg-[#FFE9E9] text-[#DE4F4F]",
      UnderReview: "bg-[#FFF4D5] text-[#99813B]",
      NotStarted: "bg-[#FFF4D5] text-[#99813B]",
    };

    return (
      <span
        className={`block px-3 py-1 rounded-md text-sm text-center font-medium ${Styles[status]} text-nowrap w-full`}
      >
        {status}
      </span>
    );
  }
  return (
    <main>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <header>
          <div className="flex flex-col gap-4">
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
        </header>

        {/* Table */}
        <section>
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
                    <th className="text-left px-4 py-4  ">Applicant Name</th>
                    <th className="text-left px-4 py-4 ">University</th>
                    <th className="text-left px-4 py-4 ">Student ID</th>
                    <th className="text-left px-4 py-4  ">Nationality</th>
                    <th className="text-left px-4 py-4  ">Document</th>
                    <th className="text-left px-4 py-4  ">
                      Application Status
                    </th>
                    <th className="text-left px-4 py-4  ">Payment</th>
                    <th className="text-left px-4 py-4  ">Visa Status</th>
                    <th className="text-left px-4 py-4  ">Action</th>
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
                            <p className="text-sm">{ticket.applicantName}</p>
                            <p className="text-sm text-[#667085]">
                              {ticket.applicantEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">{ticket.universityName}</div>
                          <div className="text-sm text-[#667085]">
                            {ticket.universityCourse}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#667085]">
                          {ticket.studentID}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-[#667085]">
                          {ticket.nationality}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-center text-sm text-[#667085]">
                          <StylePallet status={ticket.document} />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-center text-[#667085]">
                          <StylePallet status={ticket.appStatus} />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-center text-sm text-[#667085]">
                          <StylePallet status={ticket.payment} />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-center text-sm text-[#667085]">
                          <StylePallet status={ticket.visaStatus} />
                        </div>
                      </td>
                      <td className="px-4 py-4">
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
        </section>
      </div>
    </main>
  );
}
