"use client";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";

const StudentLife: React.FC<FormStepProps> = ({ handleNext }) => {
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-3xl mb-10 border border-gray-200">
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
          <div className="pt-6 flex justify-end">
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
export default StudentLife;
