"use client";
import { DatePicker } from "antd";
import { FormStepProps } from "./ProfileSetupDashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
const TestScore: React.FC<FormStepProps> = ({ handleNext, handlePrevious }) => {
  const [formData, setFormData] = useState({
    EPT_Testtype: "",
    EPT_Score: "",
    EPT_ExamDate: "",
    EPT_TestReport: null as File | null,
    KLT_TestType: "",
    KLT_Score: "",
    KLT_ExamDate: "",
    KLT_TestReport: null as File | null,
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [doneEPTTest, setDoneEPTTest] = useState(false);
  const handleEPTTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoneEPTTest(e.target.value === "yes");
    console.log("deniedVisa", doneEPTTest);
  };
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-sm mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Test Scores</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Share your standardized test results
        </p>
        <form className="mt-4 text-sm">
          {/* English Proficiency Test */}
          <div className="flex flex-col space-y-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md items-center">
              <h3 className="text-base">English Proficiency Test</h3>
              <p style={{ color: "var(--color-grayish)" }}>
                <input
                  type="checkbox"
                  name="doneELTTest"
                  id="doneEPTTest"
                  className="mr-3"
                />
                <label htmlFor="doneEPTTest" className="select-none">
                  I haven&apos;t done EPT yet
                </label>
              </p>
            </div>
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
                <select
                  id="EPT_Testtype"
                  value={formData.EPT_Testtype}
                  onChange={handleSelectChange}
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                    formData.EPT_Testtype == ""
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  <option value="" disabled>
                    --Select your test type--
                  </option>
                  <option className="text-gray-600">Option 1</option>
                  <option className="text-gray-600">Option 2</option>
                  <option className="text-gray-600">Option 3</option>
                </select>
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
                  placeholder="Score"
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                    formData.EPT_Score
                      ? "placeholder-gray-600"
                      : "placeholder-gray-300"
                  }`}
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
                <DatePicker
                  className="w-full bg-white rounded-lg h-14 border border-gray-300"
                  placeholder="2000/01/02"
                  format="YYYY/MM/DD"
                  id="passportExpiry"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
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
                  {formData.EPT_TestReport
                    ? formData.EPT_TestReport?.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>

          {/* Korean Language Test */}
          <div className="flex flex-col space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md items-center">
              <h3 className="text-base">Korean Language Test</h3>
              <p style={{ color: "var(--color-grayish)" }}>
                <input
                  type="checkbox"
                  name="doneKLTTest"
                  id="doneKLTTest"
                  className="mr-3"
                  onSelect={handleEPTTest}
                />
                <label htmlFor="doneKLTTest" className="select-none">
                  I haven&apos;t done EPT yet
                </label>
              </p>
            </div>
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
                <select
                  id="KLT_TestType"
                  value={formData.KLT_TestType}
                  onChange={handleSelectChange}
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                    formData.KLT_TestType == ""
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  <option value="" disabled>
                    --Select your test type--
                  </option>
                  <option value="Option 1" className="text-gray-600">
                    Option 1
                  </option>
                  <option value="Option 2" className="text-gray-600">
                    Option 2
                  </option>
                </select>
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
                  className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                    formData.KLT_TestType
                      ? "placeholder-gray-600"
                      : "placeholder-gray-300"
                  }`}
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
                <DatePicker
                  className="w-full bg-white rounded-lg h-14 border border-gray-300"
                  placeholder="2000/01/02"
                  format="YYYY/MM/DD"
                  id="passportExpiry"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            <div>
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
                  {formData.KLT_TestReport
                    ? formData.KLT_TestReport?.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-between mt-10">
          <PrimaryButton
            onClick={handlePrevious}
            title="Back"
            className="rounded-lg !bg-[#FFF] !text-[#000] w-1/5"
          />
          <PrimaryButton
            onClick={handleNext}
            title="Next"
            className="rounded-lg w-1/5"
          />
        </div>
      </section>
    </>
  );
};
export default TestScore;
