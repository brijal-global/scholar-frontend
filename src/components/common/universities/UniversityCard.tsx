"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const UniversityCard = ({ index }: { index: number }) => {
  const pathname = usePathname();

  const details = [
    {
      title: "Tuition fee",
      value: "$20,850 USD",
    },
    {
      title: "Application fee",
      value: "$20 USD",
    },
    {
      title: "Scholarship",
      value: "Not available",
    },
    {
      title: "Programs",
      value: "14+ programs",
    },
    {
      title: "English Language Test",
      value: "IELTS/TOFEL",
    },
    {
      title: "Korean Language Test",
      value: "Required",
    },
    {
      title: "Nearest intake",
      value: "July 2025",
    },
  ];

  return (
    <div
      key={index}
      className="w-full bg-white rounded-2xl border border-[#E1E1E1] overflow-hidden"
    >
      {/* Hero Image Section */}
      <div className="relative h-56">
        <Image
          src="https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg"
          alt="Seoul National University Building"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />

        {/* University Logo */}
        <div className="absolute bottom-5 left-5 bg-white p-1 rounded-sm shadow-md h-15 w-15">
          <Image
            src="https://t4.ftcdn.net/jpg/02/38/94/05/360_F_238940516_0BihE7YocY9vpgClPDDWuuaLneDwxtWn.jpg"
            alt="Seoul National University Building"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-sm"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 lg:p-5 text-[#838383] text-sm space-y-5">
        {/* Header */}
        <div className="">
          <h1 className="text-xl font-bold text-[#111111] mb-1">
            Seoul National University
          </h1>
          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="">Seoul, South Korea</span>
          </div>
          <p className="leading-relaxed">
            South Korea&apos;s most prestigious university, known for its strong
            South Korea&apos;s most prestigious university, known for its
            strong...
          </p>
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
        <PrimaryButton title="Apply now" link={`${pathname}/${index + 1}`} />
      </div>
    </div>
  );
};

export default UniversityCard;
