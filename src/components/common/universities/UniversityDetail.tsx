"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { PrimaryButton } from "@/components/ui/Buttons";
import { useState } from "react";
import Overview from "@/components/user/universities/Overview";
import Programs from "@/components/user/universities/Programs";
import Admissions from "@/components/user/universities/Admissions";
import StudentLife from "@/components/user/universities/StudentLife";

export default function UniversityDetails() {
  const params = useParams<{ slug: string }>();

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <section className="relative w-full ">
        <Image
          src="https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg"
          alt="University cover"
          width={1280}
          height={500}
          priority
          className="object-cover w-full h-56 md:h-72 lg:h-80 rounded-xl"
        />

        {/* Title and logo card */}
        <div className="px-4 lg:px-12 pb-4 flex items-end gap-6 w-full relative">
          {/* Logo */}
          <Image
            src="https://t4.ftcdn.net/jpg/02/38/94/05/360_F_238940516_0BihE7YocY9vpgClPDDWuuaLneDwxtWn.jpg"
            alt="Seoul National University Building"
            width={500}
            height={500}
            className="object-cover h-32 w-32 rounded-lg shadow-md absolute "
          />

          {/* Header row */}
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-1 bg-white pl-36 pt-4 w-full">
            <div className="pl-2 md:pl-0">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0C0C0C]">
                University of Seoul {params.slug}
              </h1>
              <p className="mt-1 text-sm text-[#838383] flex items-center gap-1">
                <MapPin size={15} />
                <span> Seoul, South Korea</span>
              </p>
            </div>
            <div className="pr-0">
              <PrimaryButton
                title="Apply now"
                className="bg-primary px-6"
                link="#"
              />
            </div>
          </section>
        </div>
      </section>

      {/* Summary paragraph */}
      <section className="bg-white text-[#838383]">
        <p>
          Global University is a prestigious institution located in Seoul, South
          Korea, offering a wide range of programs across undergraduate,
          graduate, and language training levels. With a strong focus on
          academic excellence, student support, and global exposure, the
          university has become a top choice for international students
          especially those from Nepal and other South Asian countries.
        </p>
      </section>

      <hr className="border border-[#c6c6c669] my-2" />

      {/* Tabs */}
      <Tabs />
    </div>
  );
}

function Tabs() {
  const tabs = [
    {
      title: "Overview",
      content: <Overview />,
    },
    {
      title: "Programs",
      content: <Programs />,
    },

    {
      title: "Admissions",
      content: <Admissions />,
    },

    {
      title: "Student life",
      content: <StudentLife />,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].title);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-start">
      <div className="flex items-center gap-3 md:gap-4 lg:gap-6 bg-[#FBFBFB] p-2 rounded-lg">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(tab.title)}
            className={`text-sm md:text-base text-[#606060] px-4 lg:px-6 py-2 rounded-lg cursor-pointer ${
              activeTab === tab.title ? "bg-[#E7E7E7]" : ""
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full px-4 pb-24">
        {tabs.find((tab) => tab.title === activeTab)?.content}
      </div>
    </div>
  );
}
