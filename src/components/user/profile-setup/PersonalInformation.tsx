"use client";
import { DatePicker } from "antd";
import { BsQuestionCircle } from "react-icons/bs";
import { FormStepProps } from "./ProfileSetupDashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

const PersonalInformation: React.FC<FormStepProps> = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    countryCitizenship: "",
    passportNumber: "",
    passportExpiry: "",
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
        <h2 className="font-semibold text-xl">Personal Information</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Tell us about yourself
        </p>
        {/* Form */}
        <form className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="photo"
                style={{ color: "var(--color-grayish)" }}
              >
                Photo{" "}
              </label>

              {/* Upload  button */}
              <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
                <span className="text-grayish truncate max-w-[80%]">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="photo"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
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
                onChange={handleInputChange}
                placeholder="Please enter your frist name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.firstName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                onChange={handleInputChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.middleName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div className="flex flex-col">
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
                placeholder="Please enter your last name"
                onChange={handleInputChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.lastName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>

            {/* Second Row */}
            <div className="flex flex-col">
              <label
                htmlFor="dob"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Date of Birth
              </label>
              <DatePicker
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 "
                placeholder="2000/01/02"
                format="YYYY/MM/DD"
              />
            </div>
            <div className="flex flex-col">
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
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="citizenship"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country of Citizenship
              </label>
              <input
                type="text"
                id="lastName"
                onChange={handleInputChange}
                placeholder="Please enter your citizenship country"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.countryCitizenship
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>

            {/* Third Row */}
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="passportNumber"
                style={{ color: "var(--color-grayish)" }}
              >
                Passport Number <BsQuestionCircle className="inline" />{" "}
              </label>
              <input
                type="text"
                id="passportNumber"
                onChange={handleInputChange}
                placeholder="Your password number"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.passportNumber
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div className="flex flex-col">
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
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="passportPhoto"
                style={{ color: "var(--color-grayish)" }}
              >
                Upload Passport (BothSides){" "}
                <BsQuestionCircle className="inline" />{" "}
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
export default PersonalInformation;
