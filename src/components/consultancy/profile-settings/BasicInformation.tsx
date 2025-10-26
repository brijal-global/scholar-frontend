/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { PrimaryButton } from "@/components/ui/Buttons";
import { InputNumber } from "antd";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function BasicInformation() {
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
          <h2 className="font-semibold text-xl">Basic Information</h2>
          <Edit
            className="text-[#929292] text-xl cursor-pointer"
            onClick={handleEdit}
          />
        </div>
        {/* Form */}
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="logo"
                style={{ color: "var(--color-grayish)" }}
              >
                Logo
              </label>
              <input
                type="text"
                id="Logo"
                placeholder="Logo.png"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.consultancyName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                htmlFor="consultancyName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Consultancy Name
              </label>
              <input
                type="text"
                id="consultancyName"
                placeholder="ABC Education Consultancy"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.consultancyName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="registeredNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Registeration Number
              </label>
              <InputNumber
                type="number"
                id="registeredNumber"
                placeholder="1234567890"
                style={{
                  width: "100%",
                  height: "3.5rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
                controls={false}
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
                Estalibished Year
              </label>
              <input
                type="text"
                id="establishedYear"
                placeholder="Please enter your last name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.establishedYear
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>

            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="Business_Registration_Certificate"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Person Name
              </label>

              <input
                type="text"
                id="establishedYear"
                placeholder="Jhon Snow"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300`}
                disabled={isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="Ownership_document"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Person Designation
              </label>

              <input
                type="text"
                id="establishedYear"
                placeholder="Director"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300`}
                disabled={isEditable}
              />
            </div>

            {/* Third Row */}
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="officialMail"
                style={{ color: "var(--color-grayish)" }}
              >
                Official Email
              </label>
              <input
                type="email"
                id="officialMail"
                placeholder="admin@abcedu.com"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.officialMail
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="phoneNumber"
                style={{ color: "var(--color-grayish)" }}
              >
                Phone Number
              </label>
              <InputNumber
                type="number"
                id="phoneNumber"
                placeholder="0159231632"
                style={{
                  width: "100%",
                  height: "3.5rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
                controls={false}
                disabled={isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="whatsapp"
                style={{ color: "var(--color-grayish)" }}
              >
                Mobile/whatsapp
              </label>
              <InputNumber
                type="number"
                id="whatsapp"
                placeholder="9812345678"
                style={{
                  width: "100%",
                  height: "3.5rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
                controls={false}
                disabled={isEditable}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="block font-medium mb-2"
              htmlFor="aboutConsultancy"
              style={{ color: "var(--color-grayish)" }}
            >
              About Consultancy (Optional)
            </label>
            <textarea
              id="aboutConsultancy"
              cols={50}
              rows={5}
              placeholder="We specialize in Korean student visas…"
              className={`apperiance-none w-full bg-white rounded-lg p-4 border border-gray-300 ${
                formData.aboutConsultancy
                  ? "placeholder-gray-600"
                  : "placeholder-gray-300"
              }`}
              disabled={isEditable}
            />
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
