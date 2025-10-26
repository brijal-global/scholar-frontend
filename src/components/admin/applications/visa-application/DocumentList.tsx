"use client";

import { Image as ImageIcon, MoreVertical, View } from "lucide-react";
import { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import DocumentView from "@/components/modals/admin/DocumentView";

interface documentDetails {
  id: string;
  fileName: string;
  storage: string;
  dateUploaded: string;
  document: "Verified" | "Missing" | "Rejected" | "Pending";
}

export default function DocumentList() {
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [showDocument, setShowDocument] = useState(false);

  const mockDocuments: documentDetails[] = [
    {
      id: "1",
      fileName: "academic_transcript_12th.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 4,2022",
      document: "Verified",
    },
    {
      id: "2",
      fileName: "passport.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 4,2022",
      document: "Missing",
    },
    {
      id: "3",
      fileName: "english_proficiency_ielts.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 2,2022",
      document: "Rejected",
    },
    {
      id: "4",
      fileName: "profile.jpg",
      storage: "200 KB",
      dateUploaded: "Jun 6,2022",
      document: "Pending",
    },
    {
      id: "5",
      fileName: "bank_statement_march2025.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 8,2022",
      document: "Verified",
    },
    {
      id: "6",
      fileName: "photo_2x2.jpg",
      storage: "200 KB",
      dateUploaded: "Jun 6,2022",
      document: "Verified",
    },
    {
      id: "7",
      fileName: "letter_of_recommendation_1.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 4,2022",
      document: "Verified",
    },
  ];
  const onViewClicked = () => {
    setShowDocument(true);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <button className="text-[#838383] my-2" onClick={onViewClicked}>
          <View className="inline" /> View Document
        </button>
      ),
      key: "0",
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFile(mockDocuments.map((file) => file.id));
    } else {
      setSelectedFile([]);
    }
  };

  const handleSelectFile = (ticketId: string, checked: boolean) => {
    if (checked) {
      setSelectedFile((prev) => [...prev, ticketId]);
    } else {
      setSelectedFile((prev) => prev.filter((id) => id !== ticketId));
    }
  };

  const isAllSelected = selectedFile.length === mockDocuments.length;
  const isIndeterminate =
    selectedFile.length > 0 && selectedFile.length < mockDocuments.length;

  function StatusBadge({ status }: { status: documentDetails["document"] }) {
    const statusStyles = {
      Verified: "bg-[#43AE48] text-white",
      Missing: "bg-[#DE9B0A] text-white",
      Rejected: "bg-[#DE310A] text-white",
      Pending: "bg-[#5073FF] text-white",
    };

    return (
      <span
        className={`px-3 py-1 rounded-md text-sm font-medium ${statusStyles[status]} text-nowrap`}
      >
        {status}
      </span>
    );
  }

  return (
    <>
      <h3 className="font-bold text-[#258654] mb-4 ml-4">Documents</h3>
      {/* Table */}
      <section>
        <div className="bg-white border-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 text-sm text-[#667085] text-nowrap">
                <tr>
                  <th className="w-8 pl-4 py-4">
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
                  <th className="text-left py-4  ">FileName</th>
                  <th className="text-left px-6 py-4 ">Document</th>
                  <th className="text-left px-6 py-4 ">Date Uploaded</th>
                  <th className="text-left py-4 ">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#EAECF0]">
                {mockDocuments.map((ticket, index) => (
                  <tr
                    key={ticket.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-[#F9FAFB]" : ""
                    }`}
                  >
                    <td className="pl-6 pr-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedFile.includes(ticket.id)}
                        onChange={(e) =>
                          handleSelectFile(ticket.id, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-none rounded outline-none"
                      />
                    </td>
                    <td className="py-4">
                      <div className="text-sm font-semibold flex gap-2">
                        <div className="text-[#7F56D9] rounded-full bg-[#F4EBFF] h-10 w-10 items-center justify-center flex ">
                          <ImageIcon />
                        </div>
                        <div className="flex flex-col">
                          <div>{ticket.fileName}</div>
                          <p className="font-normal">{ticket.storage}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        <StatusBadge status={ticket.document} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.dateUploaded}
                      </div>
                    </td>
                    <td className="py-4">
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
      <DocumentView
        isOpen={showDocument}
        closeModal={() => setShowDocument(false)}
        action={() => setShowDocument(false)} // dummy action
      />
    </>
  );
}
