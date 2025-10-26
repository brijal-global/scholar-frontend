"use client";
import { Edit } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function Address() {
  const [isEditable, setisEditable] = useState(true);

  const handleEdit = () => {
    setisEditable(false);
  };

  const handleSave = () => {
    setisEditable(true);
  };

  return (
    <>
      <section className="bg-[#F9F9F9] p-5 rounded-sm">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold text-xl">Address & Contact</h2>
            <p className="text-[#929292] text-sm">How can we reach you?</p>
          </div>
          <Edit
            className="text-[#929292] text-xl cursor-pointer"
            onClick={handleEdit}
          />
        </div>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="country"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                placeholder="Nepal"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                State/Province
              </label>
              <input
                type="text"
                id="state"
                placeholder="Bagmati"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                City
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Dhadhing"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>

            {/* Second Row */}
            <div>
              <label
                htmlFor="address"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
                placeholder="Dhading 13"
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
                placeholder="33700"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Email
              </label>
              <input
                type="email"
                id="citizenship"
                placeholder="jamesmhz@gmail.com"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>

            {/* Third Row */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="+977 9812345678"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                htmlFor="secondaryContact"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Secondary Contact(optional)
              </label>
              <input
                type="text"
                id="secondaryContact"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
                placeholder="Please contact number"
              />
            </div>
            <div>
              <label
                htmlFor="passportUpload"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                WhatsApp Contact(optional)
              </label>
              <input
                type="text"
                id="secondaryContact"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
                placeholder="+977 981234567"
              />
            </div>
            {/* Fourth Row */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fathersName"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Father&apos;s Name
                  </label>
                  <input
                    type="text"
                    id="fathersName"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                    disabled={isEditable}
                    placeholder="James Maharjan"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fathersContactNumber"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Father&apos;s Contact Number
                  </label>
                  <input
                    type="text"
                    id="fathersContactNumber"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                    disabled={isEditable}
                    placeholder="+977 9812345678"
                  />
                </div>
              </div>
            </div>
            {/* Fifth row */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="mothersName"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Mother&apos;s Name
                  </label>
                  <input
                    type="text"
                    id="mothersName"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                    disabled={isEditable}
                    placeholder="Jesse Maharjan"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mothersContactNumber"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Mother&apos;s Contact Number
                  </label>
                  <input
                    type="text"
                    id="mothersContactNumber"
                    className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                    disabled={isEditable}
                    placeholder="+977 9812345678"
                  />
                </div>
              </div>
              {/* Save Button */}
              <div className="flex justify-end mt-10">
                <PrimaryButton
                  title="Save"
                  onClick={handleSave}
                  className={`rounded-lg w-1/5 ${
                    isEditable ? "hidden" : "block"
                  }`}
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
