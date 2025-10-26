"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

interface documentDetails {
  id: string;
  fileName: string;
  storage: string;
  dateUploaded: string;
  document: "Verified" | "Missing" | "Rejected" | "Pending";
}

export default function DocumentGrid() {
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
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {mockDocuments.map((file, index) => (
            <div key={index} className="border border-[#F1F1F1] rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <p className="text-[#606060] text-sm">{file.fileName}</p>
                <MoreVertical className="w-5 h-5" />
              </div>
              <Image src={ImageIcon} alt="File Icon" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
