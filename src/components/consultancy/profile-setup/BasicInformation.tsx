"use client";
import { InputNumber } from "antd";
import { FormStepProps } from "./SetupDashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

const BasicInformation: React.FC<FormStepProps> = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    consultancyName: "",
    establishedYear: "",
    registeredNumber: "",
    officialMail: "",
    phoneNumber: "",
    whatsapp: "",
    aboutConsultancy: "",
  });

  const [fileName, setFileName] = useState("Upload"); // Default placeholder text

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "Upload"); // Show file name or revert to placeholder
  };
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-lg mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Basic Information</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Tell us about your consultancy and key contact details.
        </p>
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

              {/* Upload  button */}
              <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
                <span className="text-grayish truncate max-w-[80%]">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="passportPhoto"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
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
                onChange={handleInputChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.consultancyName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
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
                onChange={handleInputChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.establishedYear
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>

            {/* Second Row */}
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
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="Business_Registration_Certificate"
                style={{ color: "var(--color-grayish)" }}
              >
                Business Registration Certificate
              </label>

              {/* Upload  button */}
              <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
                <span className="text-grayish truncate max-w-[80%]">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="Business_Registration_Certificate"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="Ownership_document"
                style={{ color: "var(--color-grayish)" }}
              >
                Ownership document
              </label>

              {/* Upload  button */}
              <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
                <span className="text-grayish truncate max-w-[80%]">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="Ownership_document"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
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
                onChange={handleInputChange}
                placeholder="admin@abcedu.com"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.officialMail
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
              rows={8}
              onChange={handleInputChange}
              placeholder="We specialize in Korean student visas…"
              className={`apperiance-none w-full bg-white rounded-lg p-4 border border-gray-300 ${
                formData.aboutConsultancy
                  ? "placeholder-gray-600"
                  : "placeholder-gray-300"
              }`}
            />
          </div>
          <div className="flex justify-end pt-6">
            <PrimaryButton
              title="Next"
              onClick={handleNext}
              className="rounded-lg w-1/5"
            />
          </div>
        </form>
      </section>
    </>
  );
};
export default BasicInformation;
