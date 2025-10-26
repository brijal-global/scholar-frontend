/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function OperationalDetails() {
  const [formData, setFormData] = useState({
    totalStaff: "",
    avgStudents: "",
    koreaTeamContact: "",
    support: "",
    workingHours: "",
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
          <h2 className="font-semibold text-xl">Operational Details</h2>
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
                htmlFor="totalStaff"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Number of Staff
              </label>
              <input
                type="number"
                id="totalStaff"
                placeholder="30"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.totalStaff
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>
            <div>
              <label
                htmlFor="avgStudent"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Average Students Per Year
              </label>
              <input
                type="number"
                id="avgStudent"
                placeholder="200"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.avgStudents
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
                Dedicated Korea Team Contact
              </label>
              <input
                type="text"
                id="koreaTeamContact"
                placeholder="Ms. Sita Gurung"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.koreaTeamContact
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
                htmlFor="support"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Support Email for Students
              </label>
              <input
                type="email"
                id="support"
                placeholder="support@globaledu.com"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.support
                    ? "placeholder-gray-600"
                    : "placeholder-gray-300"
                }`}
                disabled={isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block font-medium mb-2"
                htmlFor="workingHours"
                style={{ color: "var(--color-grayish)" }}
              >
                Working Hours
              </label>
              <input
                type="text"
                id="workingHours"
                placeholder="Sun–Fri, 10 AM – 5 PM"
                className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                  formData.workingHours
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
