"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical } from "lucide-react";
import FeachuredIcon from "@/assets/illustrations/Featured icon.svg";
import Image from "next/image";
import { Dropdown, MenuProps, Space } from "antd";
import EmptyPayment from "./EmptyPayment";

interface ConsultancyPaymentTicket {
  id: string;
  applicantName: string;
  applicantEmail: string;
  consultancy: string;
  universityName: string;
  universityCourse: string;
  paymentID: string;
  paymentType: string;
  amount: string;
  Date: string;
  status: "Paid" | "Unpaid";
  lastUpdate: string;
}

const mockTickets: ConsultancyPaymentTicket[] = [
  {
    id: "1",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    paymentType: "Tuition Deposit",
    paymentID: "KC234234",
    amount: "$50",
    Date: "2025-01-01",
    status: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "2",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    paymentType: "Application Fee",
    paymentID: "KC234234",
    amount: "$50",
    Date: "2025-01-01",
    status: "Unpaid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "3",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    paymentType: "Application Fee",
    paymentID: "KC234234",
    amount: "$50",
    Date: "2025-01-01",
    status: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "4",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    paymentType: "Application Fee",
    paymentID: "KC234234",
    amount: "$50",
    Date: "2025-01-01",
    status: "Unpaid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "5",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    paymentType: "Application Fee",
    paymentID: "KC234234",
    amount: "$50",
    Date: "2025-01-01",
    status: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "6",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    paymentType: "Application Fee",
    paymentID: "KC234234",
    amount: "$50",
    Date: "2025-01-01",
    status: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
  {
    id: "7",
    applicantName: "James Maharjan",
    applicantEmail: "james@gmail.com",
    consultancy: "ABC Consulting",
    universityName: "Seoul University",
    universityCourse: "Bachelor in Computer Science",
    paymentType: "Application Fee",
    paymentID: "KC234234",
    amount: "$50",
    Date: "2025-01-01",
    status: "Paid",
    lastUpdate: "Jan 4, 2022",
  },
];

const items: MenuProps["items"] = [
  {
    label: <a href="#">View receipt</a>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: <a href="#">Payment Staus</a>,
    key: "1",
    children: [
      {
        key: "1-1",
        label: "Verified",
      },
      {
        type: "divider",
      },
      {
        key: "1-2",
        label: "Paid",
      },
      {
        type: "divider",
      },
      {
        key: "1-3",
        label: "Failed",
      },
      {
        type: "divider",
      },
      {
        key: "1-4",
        label: "Refunded",
      },
      {
        type: "divider",
      },
      {
        key: "1-5",
        label: "Unpaid",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Refund",
  },

  {
    type: "divider",
  },
  {
    key: "3",
    label: "Notify",
  },
];

const navItems: MenuProps["items"] = [
  {
    label: "CSV",
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "Excel",
    key: "1",
  },
];

export default function ConsultancyPayment() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(mockTickets.map((ticket) => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (paymentType: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets((prev) => [...prev, paymentType]);
    } else {
      setSelectedTickets((prev) => prev.filter((id) => id !== paymentType));
    }
  };

  const isAllSelected = selectedTickets.length === mockTickets.length;
  const isIndeterminate =
    selectedTickets.length > 0 && selectedTickets.length < mockTickets.length;

  function StylePallet({
    status,
  }: {
    status: ConsultancyPaymentTicket["status"];
  }) {
    const Styles = {
      Paid: "bg-[#D7FFD9] text-[#1E9E24]",
      Unpaid: "bg-[#FFE9E9] text-[#DE4F4F]",
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
    <section className="px-4">
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

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 items-center gap-4 text-[#A7A7A7]">
                <div className="relative">
                  <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                    <option>Date Range</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                    <option>Visa</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                    <option>Sort</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <div className="relative">
                  <Dropdown menu={{ items: navItems }} trigger={["click"]}>
                    <div
                      className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        Export
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      </Space>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Table */}
        {mockTickets.length === 0 && <EmptyPayment />}
        {mockTickets.length > 0 && (
          <main>
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
                      <th className="text-left px-4 py-4 ">Consultancy</th>
                      <th className="text-left px-4 py-4 ">University</th>
                      <th className="text-left px-4 py-4  ">Payment Type</th>
                      <th className="text-left px-4 py-4  ">Payment ID</th>
                      <th className="text-left px-4 py-4  ">Date</th>
                      <th className="text-left px-4 py-4  ">Status</th>
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
                          <div className="text-sm text-[#667085]">
                            {ticket.consultancy}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1 text-[#667085]">
                            <div>{ticket.universityName}</div>
                            <div className="text-sm">
                              {ticket.universityCourse}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-[#667085]">
                            {ticket.paymentType}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-[#667085]">
                            {ticket.paymentID}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-center text-sm text-[#667085]">
                            {ticket.Date}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-center text-[#667085]">
                            <StylePallet status={ticket.status} />
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
          </main>
        )}
      </div>
    </section>
  );
}
