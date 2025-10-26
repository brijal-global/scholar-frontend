"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { MapPin, UniversityIcon } from "lucide-react";
import { PrimaryButton } from "@/components/ui/Buttons";

const details = {
  "Eligibility Criteria": [
    "Academic Qualification: Bachelor’s degree in Computer Science, IT, Software Engineering, or related field",
    "Minimum GPA: 3.2 / 4.0",
    "Language Proficiency:",
    "English-taught programs: IELTS ≥ 6.0 (no band <5.5), TOEFL iBT ≥ 80",
    "Korean-taught programs: TOPIK Level 4 minimum",
    "Other Requirements: Proof of financial capability, valid passport",
  ],
  "What You Will Learn": [
    "Introduction to Computer Science and Programming",
    "Data Structures and Algorithms",
    "Software Development and Project Management",
    "Artificial Intelligence and Machine Learning",
    "Cybersecurity and Network Engineering",
  ],
  "Admission Requirements": [
    "Proof of financial capability",
    "Valid passport",
    "Bachelor's degree in Computer Science, IT, Software Engineering, or related field",
    "Minimum GPA: 3.2 / 4.0",
    "Language Proficiency:",
    "English-taught programs: IELTS ≥ 6.0 (no band <5.5), TOEFL iBT ≥ 80",
    "Korean-taught programs: TOPIK Level 4 minimum",
  ],
};

export default function ProgramDetails() {
  const params = useParams<{ programSlug: string }>();

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <section className="relative w-full ">
        <Image
          src="https://www.waikato.ac.nz/assets/Uploads/Student-life/Graduation/8350h-Graduation-photos-59-1201x800-5b2df79.webp"
          alt="University cover"
          width={1280}
          height={500}
          priority
          className="object-cover w-full h-56 md:h-72 lg:h-80 rounded-xl"
        />

        {/* Title and logo card */}
        <div className="px-4 pb-4 flex items-end gap-6 w-full relative">
          {/* Header row */}
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-1 bg-white pt-4 w-full">
            <div className="pl-2 md:pl-0">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0C0C0C]">
                Master of Computer Science {params.programSlug}
              </h1>
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <p className="text-sm text-[#838383] flex items-center gap-1">
                  <UniversityIcon size={15} />
                  <span> Seoul National University</span>
                </p>
                <p className="text-sm text-[#838383] flex items-center gap-1">
                  <MapPin size={15} />
                  <span> Seoul, South Korea</span>
                </p>
              </div>
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
          The MBA in Marketing at Yonsei University is designed for future
          leaders in global marketing and business strategy. This program blends
          academic theory with real-world application, preparing graduates for
          leadership roles in corporations, agencies, and startups.
        </p>
      </section>

      <hr className="border border-[#c6c6c669] my-2" />

      {/* loop the details in following format */}
      {Object.entries(details).map(([key, value], index) => (
        <div key={index} className="flex flex-col gap-2">
          <h2 className="text-lg text-[#111111] font-medium">{key}</h2>

          <div className="text-[#838383] flex flex-col gap-2 text-sm pl-3">
            <ul className="list-disc list-inside space-y-1.5">
              {value.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
