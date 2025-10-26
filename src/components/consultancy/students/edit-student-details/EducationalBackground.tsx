"use client";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Edit } from "lucide-react";

export default function EducationalBackground() {
  const [isEditable, setisEditable] = useState(true);
  const [formData, setFormData] = useState({
    highestTranscript: null as File | null,
    highestCertificate: null as File | null,
    midTranscript: null as File | null,
    midCertificate: null as File | null,
    Transcript: null as File | null,
    Certificate: null as File | null,
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEdit = () => {
    setisEditable(false);
  };

  const handleSave = () => {
    setisEditable(true);
  };
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-sm border border-gray-200">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Educational Background</h2>
          <Edit
            className="text-[#929292] text-xl cursor-pointer"
            onClick={handleEdit}
          />
        </div>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* First Row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="highestEducation"
                style={{ color: "var(--color-grayish)" }}
              >
                Highest Education Level
              </label>
              <select
                id="highestEducation"
                onChange={handleSelectChange}
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              >
                <option value="" disabled>
                  Bachlor&apos;s Degree
                </option>
                <option className="text-gray-600">Diploma</option>
                <option className="text-gray-600">High School</option>
              </select>
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
                placeholder="e.g. Science, Management"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
                placeholder="e.g. Bachlor in Computer Science"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
              <select
                id="highestCountry"
                onChange={handleSelectChange}
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option value="Nepal" className="text-gray-600">
                  Nepal
                </option>
                <option value="India" className="text-gray-600">
                  India
                </option>
                <option value="China" className="text-gray-600">
                  China
                </option>
              </select>
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
                placeholder="e.g. NEB, Cambridge, TU"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
                placeholder="Enter instution name"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
                placeholder="e.g. 2023"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
                placeholder="e.g. 3.6, 85%, A+"
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
              <select
                id="highestGrade"
                onChange={handleSelectChange}
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              >
                <option value="" disabled>
                  Select grading scale
                </option>
                <option value="Grade" className="text-gray-600">
                  Garde(4.0 scale)
                </option>
                <option value="Percentage" className="text-gray-600">
                  Percentage
                </option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Transcript
              </label>
              <div className="flex items-center gap-4 bg-white rounded-lg overflow-hidden border border-[#F1F1F1]">
                <label className="cursor-pointer bg-[#F2F2F2] hover:bg-gray-200 px-8 py-3 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    disabled={isEditable}
                  />
                  <span className="text-[#909090E5]">Choose file</span>
                </label>
                <span className="text-gray-500">
                  {formData.highestTranscript
                    ? formData.highestTranscript?.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Certificate
              </label>
              <div className="flex items-center gap-4 bg-white rounded-lg overflow-hidden border border-[#F1F1F1]">
                <label className="cursor-pointer bg-[#F2F2F2] hover:bg-gray-200 px-8 py-3 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    disabled={isEditable}
                  />
                  <span className="text-[#909090E5]">Choose file</span>
                </label>
                <span className="text-gray-500">
                  {formData.highestCertificate
                    ? formData.highestCertificate?.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
          <hr className="text-[#B5B5B5] mb-4" />

          {/* Second Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* First Row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="educationLevel"
                style={{ color: "var(--color-grayish)" }}
              >
                Education Level
              </label>
              <input
                type="text"
                id="educationLevel"
                placeholder="High School Degree"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="program"
                style={{ color: "var(--color-grayish)" }}
              >
                Program/Stream
              </label>
              <input
                type="text"
                id="program"
                placeholder="e.g. Science, Management"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program name
              </label>
              <input
                type="text"
                id="state"
                placeholder="e.g. Bachlor's in computer science"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            {/* Second row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="studyCountry"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Study
              </label>
              <select
                id="midCountry"
                onChange={handleSelectChange}
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              >
                <option value="" disabled>
                  Select country
                </option>
                <option value="India" className="text-gray-600">
                  India
                </option>
                <option value="Nepal" className="text-gray-600">
                  Nepal
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="board"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Board/University
              </label>
              <input
                type="text"
                name="board"
                id="postalCode"
                placeholder="e.g. NEB, Cambridge,TU"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="InstitutionName"
                style={{ color: "var(--color-grayish)" }}
              >
                Institution name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Institution Name"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            {/* Third row */}
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="graduationYear"
                style={{ color: "var(--color-grayish)" }}
              >
                Graduation Year
              </label>
              <input
                type="email"
                id="graduationYear"
                placeholder="e.g. 2023"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="secondaryContact"
                style={{ color: "var(--color-grayish)" }}
              >
                Grade / GPA / %
              </label>
              <input
                type="text"
                id="secondaryContact"
                placeholder="e.g. 3.6, 85%, A+"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="passportUpload"
                style={{ color: "var(--color-grayish)" }}
              >
                Marking system
              </label>
              <select
                id="midGrade"
                onChange={handleSelectChange}
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              >
                <option value="" disabled>
                  Select grading scale
                </option>
                <option value="Nepal" className="text-gray-600">
                  Nepal
                </option>
                <option value="India" className="text-gray-600">
                  India
                </option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Transcript
              </label>
              <div className="flex items-center gap-4 bg-white rounded-lg overflow-hidden border border-[#F1F1F1]">
                <label className="cursor-pointer bg-[#F2F2F2] hover:bg-gray-200 px-8 py-3 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    disabled={isEditable}
                  />
                  <span className="text-[#909090E5]">Choose file</span>
                </label>
                <span className="text-gray-500">
                  {formData.midTranscript
                    ? formData.midTranscript?.name
                    : "No file chosen"}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Certificate
              </label>
              <div className="flex items-center gap-4 bg-white rounded-lg overflow-hidden border border-[#F1F1F1]">
                <label className="cursor-pointer bg-[#F2F2F2] hover:bg-gray-200 px-8 py-3 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    disabled={isEditable}
                  />
                  <span className="text-[#909090E5]">Choose file</span>
                </label>
                <span className="text-gray-500">
                  {formData.midCertificate
                    ? formData.midCertificate?.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
          {/* Save Button */}
          <div className="flex justify-end mt-10">
            <PrimaryButton
              title="Save"
              onClick={handleSave}
              className={`rounded-lg w-1/5 ${isEditable ? "hidden" : "block"}`}
            />
          </div>
        </form>
      </section>
    </>
  );
}
