"use client";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";

const AdmissionRequirement: React.FC<FormStepProps> = ({
  handleNext,
  handlePrevious,
}) => {
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-lg mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Admission Requirement</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Core details about the university
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          {/* Language Program Requirements */}
          <div>
            <label
              htmlFor="languageRequirement"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Language Program Requirements (For D4-1 Visa)
            </label>
            <textarea
              id="languageRequirement"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div>
            <label
              htmlFor="degreeProgram"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Degree program requirements (for D2 Visa)
            </label>
            <textarea
              id="degreeProgram"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div>
            <label
              htmlFor="jobTraining"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Job training and vocational courses requirement (For D4-7 VIsa)
            </label>
            <textarea
              id="jobTraining"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div>
            <label
              htmlFor="apply"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              How to apply
            </label>
            <textarea
              id="apply"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div className="pt-6 flex gap-2">
            <PrimaryButton
              title="Back"
              onClick={handlePrevious}
              className="rounded-lg md:w-1/4 !bg-[#E9E9E9] !text-black"
            />
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
export default AdmissionRequirement;
