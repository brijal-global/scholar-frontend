"use client";
import { PrimaryButton } from "@/components/ui/Buttons";
export default function EducationalInformation() {
  return (
    <>
      <section className="bg-[#F9F9F9] p-5 rounded-sm">
        <h2 className="font-semibold text-xl">Education Background</h2>
        <p className="text-[#929292] text-sm">Your academic journey so far</p>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* First Row */}
            <div>
              <label
                htmlFor="highestEducation"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Highest Education Level
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option>Bachlor&apos;s Degree</option>
                <option>Diploma</option>
                <option>High School</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program/Stream
              </label>
              <input
                type="text"
                id="state"
                placeholder="Science"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Bachlors in Computer Science"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>

            {/* Second Row */}
            <div className="flex flex-col">
              <label
                htmlFor="institution"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Institution name
              </label>
              <input
                type="text"
                id="institution"
                placeholder="Kathmandu University"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div>
              <label
                htmlFor="studyCountry"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Study
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="China">China</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="board"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Board/University
              </label>
              <input
                type="text"
                name="board"
                id="board"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292] placeholder-[#929292]"
                placeholder="KU"
              />
            </div>

            {/* Third Row */}
            <div>
              <label
                htmlFor="graduationYear"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Graduation Year
              </label>
              <input
                type="text"
                id="graduationYear"
                placeholder="2023"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div>
              <label
                htmlFor="secondaryContact"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Grade / GPA / %
              </label>
              <input
                type="text"
                id="secondaryContact"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
                placeholder="3.6"
              />
            </div>
            <div>
              <label
                htmlFor="markingSystem"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Marking system
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option value="Grade">Garde(4.0 scale)</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>
          </div>
          <hr />

          {/* Second Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10">
            {/* First Row */}
            <div>
              <label
                htmlFor="country"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Education Level
              </label>
              <input
                type="text"
                id="country"
                placeholder="High School Degree"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program/Stream
              </label>
              <input
                type="text"
                id="state"
                placeholder="Science"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Institution name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="St. Xavier’s College"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>

            {/* Second Row */}
            <div>
              <label
                htmlFor="studyCountry"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Study
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="board"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Board/University
              </label>
              <input
                type="text"
                name="board"
                id="postalCode"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
                placeholder="NEB"
              />
            </div>
            <div>
              <label
                htmlFor="graduationYear"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Graduation Year
              </label>
              <input
                type="email"
                id="graduationYear"
                placeholder="2019"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>

            {/* Third Row */}
            <div>
              <label
                htmlFor="secondaryContact"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Grade / GPA / %
              </label>
              <input
                type="text"
                id="secondaryContact"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292] placeholder-[#929292]"
                placeholder="4.0"
              />
            </div>
            <div>
              <label
                htmlFor="passportUpload"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Marking system
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
              </select>
            </div>
          </div>
          <hr />

          {/* Third Section of the form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10">
            {/* First Row */}
            <div>
              <label
                htmlFor="country"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Education Level
              </label>
              <input
                type="text"
                id="country"
                placeholder="Seconday Education (SEE)"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Program/Stream
              </label>
              <input
                type="text"
                id="state"
                placeholder="GEMS School"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>

            {/* Second Row */}
            <div>
              <label
                htmlFor="studyCountry"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Study
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="board"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Board/University
              </label>
              <input
                type="text"
                name="board"
                id="postalCode"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
                placeholder="NEB"
              />
            </div>
            <div>
              <label
                htmlFor="graduationYear"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Graduation Year
              </label>
              <input
                type="email"
                id="graduationYear"
                placeholder="2019"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>

            {/* Third Row */}
            <div>
              <label
                htmlFor="secondaryContact"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Grade / GPA / %
              </label>
              <input
                type="text"
                id="secondaryContact"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292] placeholder-[#929292]"
                placeholder="4.0"
              />
            </div>
            <div>
              <label
                htmlFor="passportUpload"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Marking system
              </label>
              <select
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]"
                defaultValue="Nepal"
              >
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
              </select>
            </div>
          </div>

          {/* Save */}
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
