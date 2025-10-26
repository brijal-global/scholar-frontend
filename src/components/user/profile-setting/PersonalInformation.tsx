"use client";
import { PrimaryButton } from "@/components/ui/Buttons";
import { DatePicker } from "antd";
import { BsQuestionCircle } from "react-icons/bs";

export default function PersonalInformation() {
  return (
    <>
      <section className="bg-[#F9F9F9] p-5 rounded-sm">
        <h2 className="font-semibold text-xl">Personal Information</h2>
        <p className="text-[#929292] text-sm">Tell us about yourself</p>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="James"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div>
              <label
                htmlFor="middleName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                placeholder="Please enter your middle name"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
                placeholder="Maharjan"
              />
            </div>

            {/* Second Row */}
            <div>
              <label
                htmlFor="dob"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Date of Birth
              </label>
              <DatePicker
                className="w-full bg-white rounded-lg h-14 border border-gray-300"
                placeholder="2000/01/02"
                format="YYYY/MM/DD"
                id="dob"
              />
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    className="mr-2 h-14 focus:outline-none"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    className="mr-2 h-14 focus:outline-none"
                  />
                  Female
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="citizenship"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Citizenship
              </label>
              <select className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-[#929292]">
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
              </select>
            </div>
          </div>
          {/* Third Row */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="passportNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Passport Number <BsQuestionCircle className="inline" />
              </label>
              <input
                type="text"
                id="passportNumber"
                placeholder="PA0123456"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-[#929292]"
              />
            </div>
            <div>
              <label
                htmlFor="passportExpiry"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Passport Expiry Date
              </label>
              <DatePicker
                className="w-full bg-white rounded-lg h-14 border border-gray-300"
                placeholder="2000/01/02"
                format="YYYY/MM/DD"
                id="passportExpiry"
              />
            </div>
          </div>
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
