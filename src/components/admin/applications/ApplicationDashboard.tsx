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
  consultancy: string;
  universityName: string;
  universityCourse: string;
  applicationID: string;
  visaType: string;
  document: "Verified" | "Rejected" | "Pending";
  appStatus: "Submitted" | "UnderReview" | "Rejected" | "Pending";
  payment: "Paid" | "Unpaid";
  lastUpdate: string;
}

const mockTickets: ApplicationTicket[] = [
  {
    id: "1",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    applicationID: "KC234234",
    visaType: "D-2",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "2",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    applicationID: "KC234234",
    visaType: "D-2",
    document: "Verified",
    appStatus: "UnderReview",
    payment: "Unpaid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "3",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    applicationID: "KC234234",
    visaType: "D-2",
    document: "Rejected",
    appStatus: "Rejected",
    payment: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "4",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    applicationID: "KC234234",
    visaType: "D-2",
    document: "Pending",
    appStatus: "Pending",
    payment: "Unpaid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "5",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    applicationID: "KC234234",
    visaType: "D-2",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "6",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    applicationID: "KC234234",
    visaType: "D-2",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "7",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    applicationID: "KC234234",
    visaType: "D-2",
    document: "Verified",
    appStatus: "Submitted",
    payment: "Paid",
    lastUpdate: "Jan 4, 2022",
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

export default function ApplicationDashboard() {
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
      | ApplicationTicket["document"]
      | ApplicationTicket["appStatus"]
      | ApplicationTicket["payment"];
  }) {
    const Styles = {
      Verified: "bg-[#D7FFD9] text-[#1E9E24]",
      Paid: "bg-[#D7FFD9] text-[#1E9E24]",
      Submitted: "bg-[#D7FFD9] text-[#1E9E24]",
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
  return (
    <section>
      <div className="flex flex-col gap-4 flex-grow">
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
                placeholder="Search student name, application id..."
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
              <div className="relative w-3xs max-md:w-full">
                <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                  <option>Export</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        {/* Return if application is none */}
        {mockTickets.length === 0 && (
          <div className="flex items-center justify-center flex-grow">
            <EmptyApplication />
          </div>
        )}

        {/* Return if there is application */}
        {mockTickets.length > 0 && (
          // Table
          <div className="bg-white border-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 text-sm font-medium text-gray-500 text-nowrap">
                  <tr>
                    <th className="w-8 px-4 py-2">
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
                    <th className="text-left px-4 py-2 ">Consultancy</th>
                    <th className="text-left px-4 py-2 ">Application ID</th>
                    <th className="text-left px-4 py-2 ">University</th>
                    <th className="text-left px-4 py-2  ">Visa Type</th>
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
                            <p className="text-sm">{ticket.applicantName}</p>
                            <p className="text-sm text-[#667085]">
                              {ticket.applicantEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085]">
                          {ticket.consultancy}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085]">
                          {ticket.applicationID}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1 text-[#667085]">
                          <div>{ticket.universityName}</div>
                          <div className="text-sm">
                            {ticket.universityCourse}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2">
                        <div className="text-sm text-[#667085]">
                          {ticket.visaType}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-center text-sm text-[#667085]">
                          <StylePallet status={ticket.document} />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm text-center text-[#667085]">
                          <StylePallet status={ticket.appStatus} />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-center text-sm text-[#667085]">
                          <StylePallet status={ticket.payment} />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-center text-sm text-[#667085]">
                          {ticket.lastUpdate}
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
        )}
      </div>
    </section>
  );
}
