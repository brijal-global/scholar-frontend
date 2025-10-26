"use client";
import { InputNumber } from "antd";
import ConsultancyImage from "@/assets/illustrations/ConsultancyLogo.svg";
import Image from "next/image";

export default function BasicInformation() {
  return (
    <>
      <section className="p-5">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Basic Information</h2>
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
              <Image src={ConsultancyImage} alt="Consultancy Image" />
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-400`}
                disabled
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
                disabled
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
                placeholder="2020"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-400`}
                disabled
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
                disabled
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
                disabled
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
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-gray-400`}
                disabled
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
                disabled
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
                disabled
              />
            </div>
            <div className="md:col-span-3">
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
                className={`w-full bg-white rounded-lg p-4 border border-gray-300 placeholder-gray-400`}
                disabled
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
