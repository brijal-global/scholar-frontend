"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

export default function LanguageProficency() {
  return (
    <>
      <section className="p-5 rounded-sm mb-10">
        <h3 className="text-[#258654] font-bold">English Proficiency Test</h3>
        <form className="mt-4 text-sm">
          {/* English Proficiency Test */}
          <div className="flex flex-col space-y-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row */}
              <div>
                <label
                  htmlFor="EPT_Testtype"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Test Type
                </label>
                <input
                  type="text"
                  id="EPT_Testtype"
                  placeholder="IELTS"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="EPT_Score"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Score
                </label>
                <input
                  type="text"
                  id="score"
                  placeholder="7.5"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="EPT_ExamDate"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Date of Exam
                </label>
                <input
                  type="text"
                  id="score"
                  placeholder="2000/01/02"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Certificate
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
          </div>
        </form>
        {/* Korean Language Test */}
        <h3 className="text-[#258654] font-bold">Korean Language Test</h3>
        <form className="mt-4 text-sm">
          <div className="flex flex-col space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row */}
              <div>
                <label
                  htmlFor="KLT_TestType"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Test Type
                </label>
                <input
                  type="text"
                  id="KLT_TestType"
                  placeholder="TOPIKI"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="KLP_Score"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Score
                </label>
                <input
                  type="text"
                  id="score"
                  placeholder="Score"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="KLP_ExamDate"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Date of Exam
                </label>
                <input
                  type="text"
                  id="KLP_ExamDate"
                  placeholder="2000/01/02"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Certificate
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
          </div>
        </form>
      </section>
    </>
  );
}
