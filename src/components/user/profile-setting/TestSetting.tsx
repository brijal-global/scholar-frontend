"use client";

import { PrimaryButton } from "@/components/ui/Buttons";

export default function testScore() {
  return (
    <>
      <section className="bg-[#F9F9F9] p-5 rounded-sm">
        <h2 className="font-semibold text-xl">English Proficiency Test</h2>
        <p className="text-[#929292] text-sm">
          Share your standardized test results
        </p>
        {/* English Proficiency Test Form */}
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="country"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Test Type
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option>Person Test of English</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Score
              </label>
              <input
                type="text"
                id="score"
                placeholder="76"
                className="w-full h-14 bg-white rounded-lg p-4 border border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Date of Exam
              </label>
              <input
                type="Date"
                id="examDate"
                placeholder="ed. Bachlor's in computer science"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]"
              />
            </div>
          </div>
          {/* Save Button */}
          <div className="flex justify-end mt-10">
            <PrimaryButton
              title="Save"
              type="submit"
              className="rounded-lg w-1/5"
            />
          </div>
        </form>
      </section>
    </>
  );
}
