"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function VisaHistory() {
  const visaType = ["Visa Type 1", "Tourist Visa", "Student Visa"];
  const [isEditable, setisEditable] = useState(true);
  const denialReason = [
    "Reason 1",
    "Reason 2",
    "Reason 3",
    "Reason 4",
    "Reason 5",
  ];

  const [formData, setFormData] = useState({
    visaType: "",
    denialReason: "",
  });

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

  const [deniedVisa, setDeniedVisa] = useState(false);
  const handleDeniedVisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "yesKorea") {
      setDeniedVisa(true);
    } else if (e.target.id === "noKorea") {
      setDeniedVisa(false);
    }
  };

  const handleEdit = () => {
    setisEditable(false);
  };

  const handleSave = () => {
    setisEditable(true);
  };

  return (
    <>
      {/* Actual */}
      <section className="w-4xl bg-[#F9F9F9] p-5 rounded-sm mb-10 border border-gray-200">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Visa History & Finalize</h2>
          <Edit
            className="text-[#929292] text-xl cursor-pointer"
            onClick={handleEdit}
          />
        </div>
        <form className="mt-5 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Row */}
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Have you ever been denied a visa to South Korea?
              </label>
              <div className="flex gap-4">
                <label
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  <input
                    type="radio"
                    name="beenKorea"
                    id="yesKorea"
                    className="mr-2 focus:outline-none"
                    onChange={handleDeniedVisa}
                    checked={deniedVisa}
                    value="yes"
                    disabled={isEditable}
                  />
                  Yes
                </label>
                <label
                  className="block font-medium mb-2"
                  style={{ color: "var(--color-grayish)" }}
                >
                  <input
                    type="radio"
                    name="beenKorea"
                    id="noKorea"
                    className="mr-2 focus:outline-none"
                    onChange={handleDeniedVisa}
                    checked={!deniedVisa}
                    value="no"
                    disabled={isEditable}
                  />
                  No
                </label>
              </div>
            </div>
            <div className={`flex flex-col ${deniedVisa ? "" : "hidden"}`}>
              <label
                className="block font-medium mb-2"
                htmlFor="visatype"
                style={{ color: "var(--color-grayish)" }}
              >
                Visa Type
              </label>
              <select
                id="visaType"
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                className={`w-full appearance-none px-4 py-3 border border-gray-200 rounded-lg bg-white ${
                  formData.visaType === "" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <option value="" disabled hidden>
                  --Select issue category--
                </option>
                {visaType.map((visaType) => (
                  <option
                    key={visaType}
                    value={visaType}
                    className="text-gray-600"
                  >
                    {visaType}
                  </option>
                ))}
              </select>
            </div>

            {/* Second Row */}
            <div className={`flex flex-col ${deniedVisa ? "" : "hidden"}`}>
              <label
                className="block font-medium mb-2"
                htmlFor="appliedYear"
                style={{ color: "var(--color-grayish)" }}
              >
                Application Year
              </label>
              <input
                type="text"
                id="appliedYear"
                onChange={handleInputChange}
                placeholder="e.g. 2022"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 "
              />
            </div>

            <div className={`flex flex-col ${deniedVisa ? "" : "hidden"}`}>
              <label
                className="block font-medium mb-2"
                htmlFor="denialReason"
                style={{ color: "var(--color-grayish)" }}
              >
                Reason for Denial
              </label>
              <select
                id="denialReason"
                name="denialReason"
                value={formData.denialReason}
                onChange={handleInputChange}
                className={`w-full appearance-none px-4 py-3 border border-gray-200 rounded-lg bg-white ${
                  formData.denialReason === ""
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                <option value="" disabled hidden>
                  --Select issue category--
                </option>
                {denialReason.map((Reason) => (
                  <option key={Reason} value={Reason} className="text-gray-600">
                    {Reason}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Third row */}
          <div className={`flex flex-col ${deniedVisa ? "mt-5" : "hidden"}`}>
            <label
              className="block font-medium mb-2"
              htmlFor="additionalNotes"
              style={{ color: "var(--color-grayish)" }}
            >
              Additional Notes (optional)
            </label>
            <textarea
              name="additionalNotes"
              id="additionalNotes"
              cols={30}
              rows={5}
              className="w-full bg-white rounded-lg p-4 border border-gray-300 "
              placeholder="e.g. Rejected due to missing financial documents"
            />
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
        </form>
      </section>
    </>
  );
}
