"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical } from "lucide-react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Image from "next/image";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import EmptyApplication from "./EmptyApplication";

interface ApplicationTicket {
  id: string;
  applicantName: string;
  applicantEmail: string;
  consulancyName: string;
  applicationID: string;
  universityName: string;
  programType: string;
  visaType: string;
  payment: "Paid" | "Unpaid";
  document: "Verified" | "Rejected" | "Pending";
  status: "Submitted" | "UnderReview" | "Rejected" | "Pending";
  applyDate: string;
}

const mockTickets: ApplicationTicket[] = [
  {
    id: "1",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    applicationID: "KC234234",
    consulancyName: "ABC consultancy",
    universityName: "Seoul University",
    programType: "Bachelor in Computer Science",
    visaType: "D-2",
    payment: "Paid",
    document: "Verified",
    status: "Submitted",
    applyDate: "Jan 4, 2022",
  },
  {
    id: "2",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    applicationID: "KC234234",
    consulancyName: "ABC consultancy",
    universityName: "Seoul University",
    programType: "Bachelor in Computer Science",
    visaType: "D-2",
    payment: "Unpaid",
    status: "Submitted",
    document: "Verified",
    applyDate: "Jan 4, 2022",
  },
  {
    id: "3",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    applicationID: "KC234234",
    consulancyName: "ABC consultancy",
    universityName: "Seoul University",
    programType: "Bachelor in Computer Science",
    visaType: "D-2",
    document: "Verified",
    status: "Submitted",
    payment: "Paid",
    applyDate: "Jan 4, 2022",
  },
  {
    id: "4",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consulancyName: "ABC consultancy",
    applicationID: "KC234234",
    universityName: "Seoul University",
    programType: "Bachelor in Computer Science",
    visaType: "D-2",
    payment: "Unpaid",
    status: "Submitted",
    document: "Verified",
    applyDate: "Jan 4, 2022",
  },
  {
    id: "5",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consulancyName: "ABC consultancy",
    applicationID: "KC234234",
    universityName: "Seoul University",
    programType: "Bachelor in Computer Science",
    visaType: "D-2",
    payment: "Paid",
    status: "Submitted",
    document: "Rejected",
    applyDate: "Jan 4, 2022",
  },
  {
    id: "6",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consulancyName: "ABC consultancy",
    applicationID: "KC234234",
    universityName: "Seoul University",
    programType: "Bachelor in Computer Science",
    visaType: "D-2",
    payment: "Paid",
    document: "Verified",
    status: "Pending",
    applyDate: "Jan 4, 2022",
  },
  {
    id: "7",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    applicationID: "KC234234",
    consulancyName: "ABC consultancy",
    universityName: "Seoul University",
    programType: "Bachelor in Computer Science",
    visaType: "D-2",
    payment: "Paid",
    document: "Verified",
    status: "Submitted",
    applyDate: "Jan 4, 2022",
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
    label: "Change Status",
    children: [
      {
        key: "1-1",
        label: "Submitted",
      },
      {
        type: "divider",
      },
      {
        key: "1-2",
        label: "Under Review",
      },
      {
        type: "divider",
      },
      {
        key: "1-3",
        label: "Approved",
      },
      {
        type: "divider",
      },
      {
        key: "1-4",
        label: "Rejected",
      },
      {
        type: "divider",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Document Status",
    children: [
      {
        key: "2-1",
        label: "Verified",
      },
      {
        type: "divider",
      },
      {
        key: "2-2",
        label: "Missing",
      },
      {
        type: "divider",
      },
      {
        key: "2-3",
        label: "Rejected",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: "Payment Status",
    children: [
      {
        key: "3-1",
        label: "Paid",
      },
      {
        type: "divider",
      },
      {
        key: "3-2",
        label: "Unpaid",
      },
    ],
  },
];

function StylePallet({
  status,
}: {
  status:
    | ApplicationTicket["payment"]
    | ApplicationTicket["status"]
    | ApplicationTicket["document"];
}) {
  const Styles = {
    Paid: "bg-[#B7FFBB] text-[#1E9E24]",
    Submitted: "bg-[#D7FFD9] text-[#1E9E24]",
    Verified: "bg-[#D7FFD9] text-[#1E9E24]",
    Pending: "bg-[#DAE1FF] text-[#3155DC]",
    Unpaid: "bg-[#FFE9E9] text-[#DE4F4F]",
    Rejected: "bg-[#FFE9E9] text-[#DE4F4F]",
    UnderReview: "bg-[#FFF4D5] text-[#99813B]",
  };

  return (
    <span
      className={`block px-3 py-1 rounded-md text-sm text-center font-medium ${Styles[status]} text-nowrap w-full`}
    >
      {status}
    </span>
  );
}

export default function VisaAplicationPage() {
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
            Applications ({mockTickets.length} Total)
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
              <div className="relative max-md:w-full">
                <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full text-[#A7A7A7]">
                  <option>Consultancy</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <div className="relative max-md:w-full">
                <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full text-[#A7A7A7]">
                  <option>Visa</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <div className="relative max-md:w-full">
                <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full text-[#A7A7A7]">
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

        {mockTickets.length === 0 && <EmptyApplication />}

        {mockTickets.length > 0 && (
          // Table
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
                    <th className="text-left px-4 py-2  ">Applicant Name</th>
                    <th className="text-left px-4 py-2  ">Consultancy</th>
                    <th className="text-left px-4 py-2  ">Applicant id</th>
                    <th className="text-left px-4 py-2 ">University</th>
                    <th className="text-left px-4 py-2 ">Visa Type</th>
                    <th className="text-left px-4 py-2  ">Payment</th>
                    <th className="text-left px-4 py-2  ">Document</th>
                    <th className="text-left px-4 py-2  ">Status</th>
                    <th className="text-left px-4 py-2  ">Last Update</th>
                    <th className="text-left px-4 py-2  ">Action</th>
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
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedTickets.includes(ticket.id)}
                          onChange={(e) =>
                            handleSelectTicket(ticket.id, e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 border-none rounded outline-none"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2 items-center">
                          <Image src={FeachuredIcon} alt="ProfilePicture" />
                          <div className="flex flex-col gap-1">
                            <div className="text-sm">
                              {ticket.applicantName}
                            </div>
                            <div className="text-sm text-[#667085]">
                              {ticket.applicantEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085]">
                          {ticket.consulancyName}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085]">
                          {ticket.applicationID}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-[#667085]">
                          <p>{ticket.universityName}</p>
                          <p className="text-sm">{ticket.programType}</p>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085]">
                          {ticket.visaType}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085]">
                          <StylePallet status={ticket.payment} />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <StylePallet status={ticket.document} />
                      </td>
                      <td className="px-4 py-2">
                        <StylePallet status={ticket.status} />
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085">
                          {ticket.applyDate}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-4 py-2">
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
        )}
      </div>
    </div>
  );
}
