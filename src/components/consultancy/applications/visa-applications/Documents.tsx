"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

export default function Documents() {
  const files = [
    { name: "Bachelor_Transcript.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
  ];
  return (
    <>
      <section className="md:w-4xl">
        <h3 className="text-[#258654] font-bold mt-5 mb-3">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <div key={index} className="border border-[#F1F1F1] rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <p className="text-[#606060] text-sm">{file.name}</p>
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
