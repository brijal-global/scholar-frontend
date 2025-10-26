/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function PaymentDetails() {
  const [formData, setFormData] = useState({
    bankName: "",
    accHolderName: "",
    bankAccNumber: "",
    routingCode: "",
    qrCode: "",
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
          <h2 className="font-semibold text-xl">Bank & Payment Details</h2>
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
                htmlFor="bankName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                placeholder="Sunrise Bank"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.bankName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
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
                type="number"
                id="accHolderName"
                placeholder="200"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.accHolderName
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                htmlFor="bankAccNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                SWIFT / Routing Code
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
                disabled={isEditable}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="routingCode"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                SWIFT / Routing Code
              </label>
              <input
                type="text"
                id="routingCode"
                placeholder="NABILNPKA"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.routingCode
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="qrCode"
                style={{ color: "var(--color-grayish)" }}
              >
                Qr Code
              </label>
              <input
                type="text"
                id="qrCode"
                placeholder="Qr.png"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-center  ${
                  formData.qrCode
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
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
