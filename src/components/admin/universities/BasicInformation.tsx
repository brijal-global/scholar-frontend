"use client";
import { BsQuestionCircle } from "react-icons/bs";
import { FormStepProps } from "./AddNewDashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

const BasicInformation: React.FC<FormStepProps> = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    uniName: "",
    foundedYear: "",
    tution: "",
    scholarships: "",
    languageInstruction: "",
    intake: "",
    engLanguageTest: "",
  });

  const [fileName, setFileName] = useState("Upload"); // Default placeholder text

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "Upload"); // Show file name or revert to placeholder
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-lg mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Students Personal Information</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Tell us about yourself
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="uniName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                University Name
              </label>
              <input
                type="text"
                id="uniName"
                placeholder="Seoul University"
                onChange={handleInputChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.uniName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="logo"
                style={{ color: "var(--color-grayish)" }}
              >
                Logo <BsQuestionCircle className="inline" />{" "}
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

            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="banner"
                style={{ color: "var(--color-grayish)" }}
              >
                Banner <BsQuestionCircle className="inline" />{" "}
              </label>

              {/* Upload  button */}
              <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
                <span className="text-grayish truncate max-w-[80%]">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="banner"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Second Row */}
            <div>
              <label
                htmlFor="foundedYear"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Founded Year
              </label>
              <input
                type="text"
                id="foundedYear"
                placeholder="1945"
                onChange={handleInputChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.foundedYear
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="tutuin"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Tution (avg)
              </label>
              <input
                type="text"
                id="tution"
                placeholder="$1,500 – $4,000/semester"
                onChange={handleInputChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.tution
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="scholarships"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Scholarships
              </label>
              <select
                className={`appearance-none bg-white rounded-md px-4 py-3 pr-10 outline-none w-full ${
                  formData.scholarships == ""
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Dropdown
                </option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
            </div>

            {/* Third Row */}
            <div>
              <label
                htmlFor="languageInstruction"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Language of Instruction
              </label>
              <select
                className={`appearance-none bg-white rounded-md px-4 py-3 pr-10 outline-none w-full ${
                  formData.languageInstruction == ""
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Dropdown
                </option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="intake"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Intake
              </label>
              <select
                className={`appearance-none bg-white rounded-md px-4 py-3 pr-10 outline-none w-full ${
                  formData.intake == "" ? "text-gray-300" : "text-gray-600"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Dropdown
                </option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="engLanguageTest"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                English language test
              </label>
              <select
                className={`appearance-none bg-white rounded-md px-4 py-3 pr-10 outline-none w-full ${
                  formData.engLanguageTest == ""
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Dropdown
                </option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
            </div>
          </div>
          <div className="pt-6">
            <PrimaryButton
              title="Next"
              onClick={handleNext}
              className="rounded-lg md:w-1/4"
            />
          </div>
        </form>
      </section>
    </>
  );
};
export default BasicInformation;
