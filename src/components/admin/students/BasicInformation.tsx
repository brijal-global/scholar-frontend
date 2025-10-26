"use client";

import { BsQuestionCircle } from "react-icons/bs";

export default function BasicInformation() {
  return (
    <>
      <section className="p-5">
        <div>
          <h2 className="font-semibold text-xl">Basic Information</h2>
          <p className="text-sm text-[#929292]">
            Core details about the Student
          </p>
        </div>
        {/* Personal Information */}
        <h3 className="text-[#258654] font-bold mt-5 mb-3">
          Personal Information
        </h3>
        <form className="space-y-6 text-sm mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="studentName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                placeholder="James Maharjan"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="contactNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNummber"
                placeholder="9848569254"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            {/* Second Row */}
            <div>
              <label
                htmlFor="DOB"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="DOB"
                placeholder="2020"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
          </div>
        </form>

        {/* Consultancy */}
        <h3 className="text-[#258654] font-bold mt-5 mb-3">
          Consultancy Information
        </h3>
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="agencyName"
                style={{ color: "var(--color-grayish)" }}
              >
                Agency Name
              </label>

              <input
                type="text"
                id="agencyName"
                placeholder="ABC Consultancy"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="contactPerson"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Person
                <BsQuestionCircle className="inline" />
              </label>

              <input
                type="text"
                id="contactPerson"
                placeholder="Shyam Maharjan"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="contactNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNummber"
                placeholder="9848569254"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                disabled
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
