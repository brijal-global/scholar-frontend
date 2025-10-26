"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

export default function LanguageProficency() {
  return (
    <>
      <section className="p-5 rounded-sm mb-10">
        <h3 className="text-[#258654] font-bold">Recommendation letter 1</h3>
        <form className="mt-4 text-sm">
          {/* Recommendation letter 1 */}
          <div className="flex flex-col space-y-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row */}
              <div>
                <label
                  htmlFor="RecommenderName"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Recommender Full Name
                </label>
                <input
                  type="text"
                  id="RecommenderName"
                  placeholder="Dr. Jane Smith"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="Institution"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Organization / Institution
                </label>
                <input
                  type="text"
                  id="Institution"
                  placeholder="Yonsei University"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="ApplicantRelation"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Relationship to Applicant
                </label>
                <input
                  type="text"
                  id="ApplicantRelation"
                  placeholder="Professor"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jane@gmail.com"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="9860591234"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Letter of Recommendation
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
        <hr />
        {/* Recommendation letter 1 */}
        <h3 className="text-[#258654] font-bold mt-4">
          Recommendation letter 2
        </h3>
        <form className="mt-4 text-sm">
          {/* Recommendation letter 1 */}
          <div className="flex flex-col space-y-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Row */}
              <div>
                <label
                  htmlFor="RecommenderName"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Recommender Full Name
                </label>
                <input
                  type="text"
                  id="RecommenderName"
                  placeholder="Dr. Jane Smith"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="Institution"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Organization / Institution
                </label>
                <input
                  type="text"
                  id="Institution"
                  placeholder="Yonsei University"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="ApplicantRelation"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Relationship to Applicant
                </label>
                <input
                  type="text"
                  id="ApplicantRelation"
                  placeholder="Professor"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jane@gmail.com"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="9860591234"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Letter of Recommendation
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
        <hr />
      </section>
    </>
  );
}
