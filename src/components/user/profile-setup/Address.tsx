/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FormStepProps } from "./ProfileSetupDashboard";
import { useState } from "react";
import { PrimaryButton, SecondaryOutlineButton } from "@/components/ui/Buttons";

const Address: React.FC<FormStepProps> = ({ handleNext, handlePrevious }) => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
    email: "",
    phoneNumber: "",
    secondaryContact: "",
    whatsappContact: "",
    fathersName: "",
    fathersContactNumber: "",
    mothersName: "",
    mothersContactNumber: "",
  });
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-sm mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Address & Contact</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          How can we reach you?
        </p>
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
              <select
                id="country"
                value={formData.country}
                onChange={handleSelectChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.country == "" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option value="Nepal" className="text-gray-600">
                  Nepal
                </option>
                <option value="India" className="text-gray-600">
                  India
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                State/Province
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={handleSelectChange}
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.state == "" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <option value="" disabled>
                  --Select State/Province--
                </option>
                <option value="ProvinceNo1" className="text-gray-600">
                  Province No 1
                </option>
                <option value="Bagmati" className="text-gray-600">
                  Bagmati
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.city
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.address
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                placeholder="Enter address"
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.postalCode
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                placeholder="Enter Postal Code"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{ color: "var(--color-grayish)" }}
                className="block font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Please enter your email"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.email
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.phoneNumber
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.secondaryContact
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                placeholder="Please enter your email"
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                  formData.whatsappContact
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                placeholder="981234567"
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
                    className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                      formData.fathersName
                        ? "placeholder-gray-600"
                        : "placeholder-gray-300"
                    }`}
                    placeholder="Full Name"
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
                    className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                      formData.fathersContactNumber
                        ? "placeholder-gray-600"
                        : "placeholder-gray-300"
                    }`}
                    placeholder="9812345678"
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
                    className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                      formData.mothersName
                        ? "placeholder-gray-600"
                        : "placeholder-gray-300"
                    }`}
                    placeholder="Full Name"
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
                    className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 ${
                      formData.mothersContactNumber
                        ? "placeholder-gray-600"
                        : "placeholder-gray-300"
                    }`}
                    placeholder="9812345678"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <PrimaryButton
                  onClick={handlePrevious}
                  title="Back"
                  className="rounded-lg !bg-[#FFF] !text-[#000] w-1/5"
                />
                <PrimaryButton
                  onClick={handleNext}
                  title="Next"
                  className="rounded-lg w-1/5"
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default Address;
