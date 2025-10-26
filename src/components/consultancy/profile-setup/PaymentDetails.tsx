/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FormStepProps } from "./SetupDashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
const PaymentDetails: React.FC<FormStepProps> = ({
  handleNext,
  handlePrevious,
}) => {
  const [formData, setFormData] = useState({
    bankName: "",
    EPT_Score: "",
    accHolderName: "",
    bankAccNumber: "",
    KLT_Score: "",
    KLT_ExamDate: "",
    KLT_TestReport: null as File | null,
  });
  const [fileName, setFileName] = useState("Upload"); // Default placeholder text

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "Upload"); // Show file name or revert to placeholder
  };

  return (
    <>
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-sm mb-10 border border-gray-200">
        <h2 className="font-semibold text-xl">Bank & Payment Details</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Provide banking info for internal settlements and fee processing.
        </p>
        <form className="mt-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="bankName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                placeholder="Enter Bank name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.bankName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="accHolderName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Account Holder Name
              </label>
              <input
                type="text"
                id="accHolderName"
                placeholder="Acc. holder name"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.accHolderName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="bankAccNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Bank Account Number
              </label>
              <input
                type="number"
                id="bankAccNumber"
                placeholder="123-456-789-0001"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.bankAccNumber
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="bankAccNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                SWIFT / Routing Code
              </label>
              <input
                type="text"
                id="bankAccNumber"
                placeholder="e.g. NABILNPKA"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.bankAccNumber
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="qrCode"
                style={{ color: "var(--color-grayish)" }}
              >
                QR code
              </label>

              {/* Upload  button */}
              <label className="bg-white rounded-lg border border-gray-300 p-4 text-center font-medium">
                <span className="text-grayish truncate max-w-[80%]">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="qrCode"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </form>
        <div className="flex justify-between mt-10">
          <PrimaryButton
            onClick={handlePrevious}
            title="Back"
            className="rounded-lg bg-[#e5e7eb] w-1/5"
          />
          <PrimaryButton
            onClick={handleNext}
            title="Next"
            className="rounded-lg w-1/5"
          />
        </div>
      </section>
    </>
  );
};
export default PaymentDetails;
