/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { PrimaryButton } from "@/components/ui/Buttons";
import { InputNumber } from "antd";
import { Edit } from "lucide-react";
import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";

export default function PersonalInformation() {
  const [formData, setFormData] = useState({
    consultancyName: "",
    establishedYear: "",
    registeredNumber: "",
    officialMail: "",
    phoneNumber: "",
    whatsapp: "",
    aboutConsultancy: "",
  });

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
          <h2 className="font-semibold text-xl">Personal Information</h2>
          <Edit
            className="text-[#929292] text-xl cursor-pointer"
            onClick={handleEdit}
          />
        </div>
        {/* Form */}
        <form className="space-y-6 text-sm mt-4">
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
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
                placeholder=""
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
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Maharjan"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
            {/* Second Row */}
            <div className="flex flex-col">
              <label
                htmlFor="establishedYear"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="establishedYear"
                placeholder="2000/01/02"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
                <label
                  style={{ color: "var(--color-grayish)" }}
                  className="flex items-center mb-2 h-14 font-medium"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    className="mr-2 focus:outline-none"
                    disabled={isEditable}
                  />
                  Male
                </label>
                <label
                  style={{ color: "var(--color-grayish)" }}
                  className="flex items-center mb-2 h-14 font-medium"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    className="mr-2 focus:outline-none"
                    disabled={isEditable}
                  />
                  Female
                </label>
              </div>
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="Ownership_document"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Citizenship
              </label>

              <input
                type="text"
                id="establishedYear"
                placeholder="Nepal"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>

            {/* Third Row */}
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
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
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
              <input
                type="text"
                id="passportExpiry"
                placeholder="2000/01/02"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled={isEditable}
              />
            </div>
          </div>
        </form>
        {/* Save Button */}
        <div className="flex justify-end mt-10">
          <PrimaryButton
            title="Save"
            onClick={handleSave}
            className={`rounded-lg w-1/5 ${isEditable ? "hidden" : "block"}`}
          />
        </div>
      </section>
    </>
  );
}
