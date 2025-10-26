import {
  Image as ImageIcon,
  View,
  Download,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import DeleteDocument from "@/components/modals/user/DeleteDocument";

interface documentDetails {
  id: string;
  fileName: string;
  storage: string;
  dateUploaded: string;
  lastUpdated: string;
}

export default function DocumentList() {
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const mockDocuments: documentDetails[] = [
    {
      id: "1",
      fileName: "academic_transcript_12th.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 4,2022",
      lastUpdated: "Jan 4,2022",
    },
    {
      id: "2",
      fileName: "passport.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 4,2022",
      lastUpdated: "Jan 4,2022",
    },
    {
      id: "3",
      fileName: "english_proficiency_ielts.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 2,2022",
      lastUpdated: "Jan 2,2022",
    },
    {
      id: "4",
      fileName: "profile.jpg",
      storage: "200 KB",
      dateUploaded: "Jun 6,2022",
      lastUpdated: "Jan 6,2022",
    },
    {
      id: "5",
      fileName: "bank_statement_march2025.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 8,2022",
      lastUpdated: "Jan 8,2022",
    },
    {
      id: "6",
      fileName: "photo_2x2.jpg",
      storage: "200 KB",
      dateUploaded: "Jun 6,2022",
      lastUpdated: "Jan 6,2022",
    },
    {
      id: "7",
      fileName: "letter_of_recommendation_1.pdf",
      storage: "200 KB",
      dateUploaded: "Jun 4,2022",
      lastUpdated: "Jan 4,2022",
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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <section>
        {/* Table */}
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
                  <th className="text-left px-6 py-4 ">Date Uploaded</th>
                  <th className="text-left px-6 py-4 ">Last Updated</th>
                  <th></th>
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
                        {ticket.dateUploaded}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#667085]">
                        {ticket.lastUpdated}
                      </div>
                    </td>
                    <td>
                      <div className="text-[#98A2B3] flex gap-4">
                        <View />
                        <Download />
                        <RefreshCcw />
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
        <DeleteDocument
          isOpen={showDeleteModal}
          closeModal={() => setShowDeleteModal(false)}
          action={() => setShowDeleteModal(false)} // dummy action
        />
      </section>
    </>
  );
}
