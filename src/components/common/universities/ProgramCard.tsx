"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import Image from "next/image";
import { usePathname } from "next/navigation";

const ProgramCard = ({ index }: { index: number }) => {
  const pathname = usePathname();

  const details = [
    {
      title: "Duration",
      value: "4 years",
    },
    {
      title: "Tution fee",
      value: "NPR 300,000/semester",
    },
    {
      title: "Nearest intake",
      value: "July 2025",
    },
    {
      title: "Scholarship",
      value: "Not available",
    },
  ];

  return (
    <div
      key={index}
      className="w-full bg-white rounded-2xl border border-[#E1E1E1] overflow-hidden"
    >
      {/* Hero Image Section */}
      <div className="relative h-52">
        <Image
          src="https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg"
          alt="Seoul National University Building"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 lg:p-5 text-[#838383] text-sm space-y-5">
        {/* Header */}
        <div className="">
          <h1 className="text-xl font-bold text-[#111111] mb-1">
            Master of Computer Science {index + 1}
          </h1>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Details Grid */}
        <div className="space-y-4">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex justify-between items-center"
            >
              <span className="">{detail.title}</span>
              <span className="">{detail.value}</span>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        <PrimaryButton
          title="Apply now"
          link={`${pathname}/programs/${index + 1}`}
        />
      </div>
    </div>
  );
};

export default ProgramCard;
