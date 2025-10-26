/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FormStepProps } from "./SetupDashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

const OperationalDetails: React.FC<FormStepProps> = ({
  handleNext,
  handlePrevious,
}) => {
  const [formData, setFormData] = useState({
    avgStudents: "",
    workingHours: "",
  });
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-sm mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Operational Details</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Upload your official registration and certificates to verify your
          consultancy.
        </p>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="avgStudents"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Average Students Per Year
              </label>
              <input
                type="text"
                id="avgStudents"
                placeholder="Avg. students per year"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.avgStudents
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="workingHours"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Working Hours
              </label>
              <input
                type="text"
                id="workingHours"
                placeholder="Sun–Fri, 10 AM – 5 PM"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.workingHours
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-between mt-10">
          <PrimaryButton
            onClick={handlePrevious}
            title="Back"
            className="rounded-lg bg-[#e5e7eb] w-1/5"
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
export default OperationalDetails;
