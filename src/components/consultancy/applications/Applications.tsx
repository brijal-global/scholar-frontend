/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical, Plus } from "lucide-react";
import Image from "next/image";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import NewApplication from "@/components/modals/consultancy/NewApplication";

const mockApplications: any[] = [
  {
    id: "1234567890",
    name: "John Doe",
    email: "john.doe@gmail.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "1234567890",
    universityName: "University of California, Los Angeles",
    programName: "Computer Science",
    intake: "March",
    status: "Pending",
    applyDate: "Jan 4, 2022",
  },
  // make different dummy data for the rest with different values
  {
    id: "2345678901",
    name: "Sarah Johnson",
    email: "sarah.johnson@outlook.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "2345678901",
    universityName: "Stanford University",
    programName: "Business Administration",
    intake: "September",
    status: "In-Progress",
    applyDate: "Feb 15, 2022",
  },
  {
    id: "3456789012",
    name: "Michael Chen",
    email: "michael.chen@yahoo.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "3456789012",
    universityName: "Harvard University",
    programName: "Medicine",
    intake: "January",
    status: "Resolved",
    applyDate: "Dec 10, 2021",
  },
  {
    id: "4567890123",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@gmail.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "4567890123",
    universityName: "Massachusetts Institute of Technology",
    programName: "Electrical Engineering",
    intake: "September",
    status: "Pending",
    applyDate: "Mar 22, 2022",
  },
  {
    id: "5678901234",
    name: "David Thompson",
    email: "david.thompson@hotmail.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "5678901234",
    universityName: "University of Oxford",
    programName: "Philosophy",
    intake: "October",
    status: "In-Progress",
    applyDate: "Jan 18, 2022",
  },
  {
    id: "6789012345",
    name: "Lisa Wang",
    email: "lisa.wang@gmail.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "6789012345",
    universityName: "University of Cambridge",
    programName: "Economics",
    intake: "March",
    status: "Resolved",
    applyDate: "Nov 5, 2021",
  },
  {
    id: "7890123456",
    name: "Robert Miller",
    email: "robert.miller@outlook.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "7890123456",
    universityName: "Princeton University",
    programName: "Physics",
    intake: "January",
    status: "Pending",
    applyDate: "Apr 8, 2022",
  },
  {
    id: "8901234567",
    name: "Amanda Davis",
    email: "amanda.davis@yahoo.com",
    profileImage: "https://pushkar.live/logo.png",
    passportNo: "8901234567",
    universityName: "Yale University",
    programName: "Law",
    intake: "September",
    status: "In-Progress",
    applyDate: "Feb 28, 2022",
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
    label: <a href="#">Edit & Resubmit</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <p className="text-[#FF8787]">Delete application</p>,
    key: "3",
  },
];

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    Resolved: "bg-[#0ADE15] text-white",
    Pending: "bg-[#5073FF] text-white",
    "In-Progress": "bg-[#EBAA1E] text-white",
  };

  return (
    <span
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        statusStyles[status as keyof typeof statusStyles]
      } text-nowrap`}
    >
      {status}
    </span>
  );
}

export default function Applications() {
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewApplication, setShowNewApplication] = useState(false);

  // const pathname = usePathname();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(
        mockApplications.map((application) => application.id)
      );
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications((prev) => [...prev, applicationId]);
    } else {
      setSelectedApplications((prev) =>
        prev.filter((id) => id !== applicationId)
      );
    }
  };

  const isAllSelected = selectedApplications.length === mockApplications.length;
  const isIndeterminate =
    selectedApplications.length > 0 &&
    selectedApplications.length < mockApplications.length;

  const handleAddDocument = () => {
    setShowNewApplication(true);
  };
  return (
    <section>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Applications ({mockApplications.length} Total)
          </h1>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search student name, application id, email, university, program, intake"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F6F8F9] border border-[#E1E1E1] rounded-md outline-none"
              />
            </div>

            <div className="flex items-center gap-4 max-md:flex-grow">
              <div className="relative max-md:flex-1">
                <select className="appearance-none bg-white border border-[#E1E1E1] rounded-md px-4 py-3 pr-10 outline-none w-full">
                  <option>Sort</option>
                  <option>Date (Newest)</option>
                  <option>Date (Oldest)</option>
                  <option>Status</option>
                  <option>Category</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              <button
                onClick={handleAddDocument}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md cursor-pointer font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Application
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-nowrap">
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
                  <th className="text-left px-6 py-4">Applicant name</th>
                  <th className="text-left px-6 py-4">Applicant Id</th>
                  <th className="text-left px-6 py-4">Passport no.</th>
                  <th className="text-left px-6 py-4">University name</th>
                  <th className="text-left px-6 py-4">Program name</th>
                  <th className="text-left px-6 py-4">Intake</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-6 py-4">Apply Date</th>
                  <th className="text-left px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#EAECF0]">
                {mockApplications.map((application, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-[#F9FAFB]" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(application.id)}
                        onChange={(e) =>
                          handleSelectApplication(
                            application.id,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-blue-600 border-none rounded outline-none"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085] flex items-center gap-2">
                        <Image
                          src={application.profileImage}
                          alt="Profile"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-blackish">
                            {application.name}
                          </p>
                          <p className="text-sm text-[#667085]">
                            {application.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {application.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {application.passportNo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {application.universityName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {application.programName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {application.intake}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085">
                        {application.applyDate}
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
      </div>
      {/* Model for AddStudent */}
      <NewApplication
        isOpen={showNewApplication}
        closeModal={() => setShowNewApplication(false)}
        action={() => setShowNewApplication(false)} // dummy action
      />
    </section>
  );
}
