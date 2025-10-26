/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";

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
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-nowrap">
        <thead className="border-b border-gray-200 text-sm font-medium text-gray-500 text-nowrap">
          <tr>
            <th className="text-left px-6 py-4">Student name</th>
            <th className="text-left px-6 py-4">University name</th>
            <th className="text-left px-6 py-4">Program name</th>
            <th className="text-left px-6 py-4">Status</th>
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
                  {application.universityName}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-[#667085]">
                  {application.programName}
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={application.status} />
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
  );
}
