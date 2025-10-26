"use client";
import { FormStepProps } from "./NewStudent";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Button } from "antd";
import { Plus } from "lucide-react";

const EducationalInformation: React.FC<FormStepProps> = ({
  handleNext,
  handlePrevious,
}) => {
  const [formData, setFormData] = useState({
    highestEducation: "",
    highestStream: "",
    highestProgram: "",
    highestCountry: "",
    highestBoard: "",
    highestInstitution: "",
    highestGradution: "",
    highestGPA: "",
    highestGrade: "",
    highestMarking: "",
    highestTranscript: null as File | null,
    highestCertificate: null as File | null,
    Education: "",
    Stream: "",
    Program: "",
    Country: "",
    Board: "",
    Institution: "",
    Gradution: "",
    Grade: "",
    Marking: "",
    GPA: "",
    Transcript: null as File | null,
    Certificate: null as File | null,
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [forms, setForms] = useState<number[]>([]);

  // To add the form in UI
  const handleAddForm = () => {
    setForms([...forms, forms.length]);
  };

  // Handle the Add Form
  const AddForm = () => {
    return (
      <>
        <hr />
        {/* New Section */}
        <div className="mt-4 text-sm mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-4">
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Education
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Stream
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Program
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                value={formData.Country}
                onChange={handleSelectChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Country == "" ? "text-gray-300" : "text-gray-600"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Board
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                placeholder="e.g. NEB, Cambridge,TU"
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Institution
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Gradution
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.GPA ? "placeholder-gray-600" : "placeholder-gray-300"
                }`}
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
                value={formData.Grade}
                onChange={handleSelectChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.Grade == "" ? "text-gray-300" : "text-gray-600"
                }`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
                  />
                  <span className="text-[#909090E5]">Choose file</span>
                </label>
                <span className="text-gray-500">
                  {formData.Transcript
                    ? formData.Transcript?.name
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
                  />
                  <span className="text-[#909090E5]">Choose file</span>
                </label>
                <span className="text-gray-500">
                  {formData.Certificate
                    ? formData.Certificate?.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-sm mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Education Background</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Your academic journey so far
        </p>
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
                value={formData.highestEducation}
                onChange={handleSelectChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.highestEducation == ""
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.highestStream
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.highestProgram
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                value={formData.highestCountry}
                onChange={handleSelectChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.highestCountry == ""
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.highestBoard
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.highestInstitution
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.highestGradution
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.highestGPA
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                value={formData.highestGrade}
                onChange={handleSelectChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.highestGrade == ""
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
          {/* To add the form when the Add Education button is clicked */}
          <div>
            {forms.map((formId) => (
              <div key={formId}>
                <AddForm />
              </div>
            ))}
          </div>
          <div className="h-18">
            <Button
              color="green"
              variant="dashed"
              className="w-full"
              onClick={handleAddForm}
              style={{ height: "100%" }}
            >
              <Plus />
              Add Education
            </Button>
          </div>

          <div className="flex justify-between mt-15">
            <PrimaryButton
              onClick={handlePrevious}
              title="Back"
              className="rounded-lg bg-[#e5e7eb] w-1/5"
            />
            <PrimaryButton
              onClick={handleNext}
              title="Save & Continue"
              className="rounded-lg md:w-1/5"
            />
          </div>
        </form>
      </section>
    </>
  );
};
export default EducationalInformation;
