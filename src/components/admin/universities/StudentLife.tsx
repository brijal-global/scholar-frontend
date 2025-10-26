"use client";
import { useState } from "react";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

const StudentLife: React.FC<FormStepProps> = ({
  handleNext,
  handlePrevious,
}) => {
  const [fileName, setFileName] = useState("Upload");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "Upload"); // Show file name or revert to placeholder
  };
  const files = [
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
    { name: "Passport.pdf" },
  ];

  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-lg mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Student Life</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Core details about the university
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          {/* Language Program Requirements */}
          <div>
            <label
              htmlFor="campuslife"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Campus life and facilities
            </label>
            <textarea
              id="campuslife"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div>
            <label
              htmlFor="supportServices"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Support services
            </label>
            <textarea
              id="supportServices"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div>
            <label
              htmlFor="workOppurtunities"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Work Opportunities
            </label>
            <textarea
              id="workOppurtunities"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="block font-medium mb-2"
              htmlFor="logo"
              style={{ color: "var(--color-grayish)" }}
            >
              Gallery (Bluk upload)
            </label>

            {/* Upload  button */}
            <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
              <span className="text-grayish truncate max-w-[80%]">
                {fileName}
              </span>
              <input
                type="file"
                id="logo"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {/* Grid layout of documents */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {files.map((file, index) => (
              <div
                key={index}
                className="border border-[#F1F1F1] rounded-lg p-4"
              >
                <div className="flex justify-between mb-4">
                  <p className="text-[#606060]">{file.name}</p>
                  <MoreVertical className="w-5 h-5" />
                </div>
                <Image src={ImageIcon} alt="File Icon" />
              </div>
            ))}
          </div>
          <div className="pt-6 flex gap-2">
            <PrimaryButton
              title="Back"
              onClick={handlePrevious}
              className="rounded-lg md:w-1/4 !bg-[#E9E9E9] !text-black"
            />
            <PrimaryButton
              title="Submit"
              onClick={handleNext}
              className="rounded-lg md:w-1/4"
            />
          </div>
        </form>
      </section>
    </>
  );
};
export default StudentLife;
