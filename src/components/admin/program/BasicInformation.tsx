"use client";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";

const BasicInformation: React.FC<FormStepProps> = ({ handleNext }) => {
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-3xl mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Basic Information</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Core details about this program
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div className="md:col-span-3">
              <label
                htmlFor="uniName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program Name
              </label>
              <input
                type="text"
                id="uniName"
                placeholder="Master in Business Administration"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
              />
            </div>
            <div>
              <label
                htmlFor="uniName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                University
              </label>
              <select
                id="uniName"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]"
              >
                <option>Seoul University</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="degreeType"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Degree Type
              </label>
              <select
                id="degreeType"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#C6C6C6E5]"
              >
                <option>Seoul University</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Duration
              </label>
              <input
                type="number"
                id="duration"
                placeholder="4 years"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
              />
            </div>

            {/* Second Row */}
            <div>
              <label
                htmlFor="tution"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Tuition (avg)
              </label>
              <input
                type="text"
                id="tution"
                placeholder="$1,500 – $4,000/semester"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Scholarship Availability
              </label>
              <div className="flex gap-4 text-[#C6C6C6E5]">
                <label className="flex items-center select-none">
                  <input
                    type="radio"
                    name="scolarship"
                    id="No"
                    className="mr-2 h-14 focus:outline-none"
                  />
                  No
                </label>
                <label className="flex items-center select-none">
                  <input
                    type="radio"
                    name="scolarship"
                    id="Yes"
                    className="mr-2 h-14 focus:outline-none"
                  />
                  Yes
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="language"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Language of Instruction
              </label>
              <input
                type="text"
                id="language"
                placeholder="Dropdown"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-300`}
              />
            </div>
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
export default BasicInformation;
