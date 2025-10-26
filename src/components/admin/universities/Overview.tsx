"use client";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";

const Overview: React.FC<FormStepProps> = ({ handleNext, handlePrevious }) => {
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-lg mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Overview</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Core details about the university
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          {/* Short discription */}
          <div>
            <label
              htmlFor="shortDescription"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Short description
            </label>
            <textarea
              id="shortDescription"
              className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-300`}
              placeholder="write here..."
              rows={10}
            />
          </div>
          <div>
            <label
              htmlFor="aboutUniversity"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              About the university
            </label>
            <textarea
              id="aboutUniversity"
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
export default Overview;
