"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

export default function EducationalInformation() {
  return (
    <>
      <section className="p-5 rounded-sm mb-10">
        <h3 className="font-bold text-[#258654]">Education Background</h3>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* First Row */}
            <div>
              <label
                htmlFor="highestEducation"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Highest Education Level
              </label>
              <input
                type="text"
                id="highestEducation"
                placeholder="Bachelor Degree"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="stream"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program/Stream
              </label>
              <input
                type="text"
                id="stream"
                placeholder="Science"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="program"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program name
              </label>
              <input
                type="text"
                id="program"
                placeholder="Bachlor in Computer Science"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>

            {/* Second Row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="institution"
                style={{ color: "var(--color-grayish)" }}
              >
                Institution name
              </label>
              <input
                type="text"
                name="institutionName"
                id="institutionName"
                placeholder="Kathmandu University"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="studyCountry"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Study
              </label>
              <input
                type="text"
                name="studyCountry"
                id="studyCountry"
                placeholder="Nepal"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Board/University
              </label>
              <input
                type="text"
                name="Board"
                id="Board"
                placeholder="KU"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  placeholder-black`}
              />
            </div>

            {/* Third Row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="graduationYear"
                style={{ color: "var(--color-grayish)" }}
              >
                Graduation Year
              </label>
              <input
                type="text"
                id="graduationYear"
                placeholder="2023"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="GPA"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Grade / GPA / %
              </label>
              <input
                type="text"
                id="GPA"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                placeholder="3.6"
                disabled
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="markingSystem"
                style={{ color: "var(--color-grayish)" }}
              >
                Marking system
              </label>
              <input
                type="text"
                id="markingSystem"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                placeholder="GPA (4.0 scale)"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcript Certificate
              </label>
              <div className="border border-[#F1F1F1] md:h-55 md:w-1/2 rounded-lg p-4">
                <div className="flex justify-between mb-4">
                  <p className="text-[#606060]">Bachelor_Transcript.pdf</p>
                  <p>
                    <MoreVertical className="w-5 h-5" />
                  </p>
                </div>
                <Image src={ImageIcon} alt="Transcript Image" />
              </div>
            </div>
          </div>
        </form>
        <hr className="text-[#B5B5B5]" />
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* First Row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="Education"
                style={{ color: "var(--color-grayish)" }}
              >
                Education Level
              </label>
              <input
                type="text"
                id="Education"
                placeholder="High School Degree"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="stream"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program/Stream
              </label>
              <input
                type="text"
                id="stream"
                placeholder="Science"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="institution"
                style={{ color: "var(--color-grayish)" }}
              >
                Institution name
              </label>
              <input
                type="text"
                name="institutionName"
                id="institutionName"
                placeholder="St. Xavier’s College"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            {/* Second Row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="studyCountry"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Study
              </label>
              <input
                type="text"
                name="studyCountry"
                id="studyCountry"
                placeholder="Nepal"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Board/University
              </label>
              <input
                type="text"
                name="Board"
                id="Board"
                placeholder="NEB"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  placeholder-black`}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="graduationYear"
                style={{ color: "var(--color-grayish)" }}
              >
                Graduation Year
              </label>
              <input
                type="text"
                id="graduationYear"
                placeholder="2019"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            {/* Third Row */}
            <div>
              <label
                htmlFor="GPA"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Grade / GPA / %
              </label>
              <input
                type="text"
                id="GPA"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                placeholder="4.0"
                disabled
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="markingSystem"
                style={{ color: "var(--color-grayish)" }}
              >
                Marking system
              </label>
              <input
                type="text"
                id="markingSystem"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                placeholder="GPA (4.0 scale)"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcript Ceritificate
              </label>
              <div className="border border-[#F1F1F1] md:h-55 md:w-1/2 rounded-lg p-4">
                <div className="flex justify-between mb-4">
                  <p className="text-[#606060]">Bachelor_Transcript.pdf</p>
                  <p>
                    <MoreVertical className="w-5 h-5" />
                  </p>
                </div>
                <Image src={ImageIcon} alt="Transcript Image" />
              </div>
            </div>
          </div>
        </form>
        <hr />
      </section>
    </>
  );
}
