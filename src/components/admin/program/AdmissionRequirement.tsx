"use client";
import { FormStepProps } from "./AddNewDashboard";
import { PrimaryButton } from "@/components/ui/Buttons";

const BasicInformation: React.FC<FormStepProps> = ({ handleNext }) => {
  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-3xl mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Admission Requirements </h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Tell us about yourself
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="minGPA"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                Minimum GPA
              </label>
              <input
                type="number"
                id="minGPA"
                placeholder="4.2"
                className={`appearance-none outline-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placholder-gray-300`}
              />
            </div>
            <div>
              <label
                htmlFor="iltsScore"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                IELTS Score
              </label>
              <input
                type="number"
                id="iltsScore"
                placeholder="4.2"
                className={`appearance-none outline-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placholder-gray-300`}
              />
            </div>
            <div>
              <label
                htmlFor="TOEFLScore"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                TOEFL Score
              </label>
              <input
                type="number"
                id="TOEFLScore"
                placeholder="4.2"
                className={`appearance-none outline-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placholder-gray-300`}
              />
            </div>
            {/* Second Row */}
            <div>
              <label
                htmlFor="TOPIKScore"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                TOPIK Score
              </label>
              <input
                type="number"
                id="TOPIKScore"
                placeholder="4.2"
                className={`appearance-none outline-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placholder-gray-300`}
              />
            </div>
            <div className="flex flex-col space-y-2 text-[#C6C6C6E5]">
              <label
                htmlFor="mandatoryDocs"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                Mandatory documents
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="password"
                  id="password"
                  className="text-black bg-[#70B792] border-[#29935C]"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="transcript"
                  id="transcript"
                  className="text-black bg-[#70B792] border-[#29935C]"
                />
                <label htmlFor="transcript">Transcript</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="sop"
                  id="sop"
                  className="text-black bg-[#70B792] border-[#29935C]"
                />
                <label htmlFor="sop">SOP</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="lor"
                  id="lor"
                  className="text-black bg-[#70B792] border-[#29935C]"
                />
                <label htmlFor="lor">LOR</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="financialProof"
                  id="financialProof"
                  className="text-black bg-[#70B792] border-[#29935C]"
                />
                <label htmlFor="financialProof">Financial Proof</label>
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-[#C6C6C6E5]">
              <label
                htmlFor="mandatoryDocs"
                className="block font-medium mb-2 cols-3"
                style={{ color: "var(--color-grayish)" }}
              >
                Optional documents
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="certificates"
                  id="certificates"
                  className="text-black bg-[#70B792] border-[#29935C]"
                />
                <label htmlFor="password">Certificates</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="transcript"
                  id="transcript"
                  className="text-black bg-[#70B792] border-[#29935C]"
                />
                <label htmlFor="transcript">Transcript</label>
              </div>
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
