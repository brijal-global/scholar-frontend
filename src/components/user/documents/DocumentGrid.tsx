"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

export default function DocumentGrid() {
  const files = [
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
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
  ];
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-6">
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
