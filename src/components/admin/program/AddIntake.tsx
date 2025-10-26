"use client";
import { DatePicker } from "antd";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";

const BasicInformation: React.FC<FormStepProps> = ({ handleNext }) => {
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-3xl mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Add Intakes</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Core details about this program
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="intake"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Intake month
              </label>
              <select
                id="intake"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]"
                defaultValue=""
              >
                <option value="" disabled>
                  Months
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Start Date
              </label>
              <DatePicker className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]" />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                End Date
              </label>
              <DatePicker className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]" />
            </div>
            {/* Second Row */}
            <div>
              <label
                htmlFor="intake"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Intake month
              </label>
              <select
                id="intake"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]"
                defaultValue=""
              >
                <option value="" disabled>
                  Months
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Start Date
              </label>
              <DatePicker className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]" />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                End Date
              </label>
              <DatePicker className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]" />
            </div>
          </div>
          <PrimaryButton
            title="Add intake"
            type="submit"
            className="rounded-lg md:w-1/4"
          />
          <p className="text-[#606060]">
            Note: Students can only apply for intakes marked as
            &lsquo;Open&rsquo;.
          </p>
          <div className="flex justify-end">
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
