"use client";
import { Edit } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function Address() {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    streetAddress: "",
  });
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

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
          <h2 className="font-semibold text-xl">Address & Location</h2>
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
                htmlFor="country"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Country
              </label>
              <div>
                <select
                  id="country"
                  value={formData.country}
                  onChange={handleSelectChange}
                  className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                    formData.country == "" ? "text-gray-300" : "text-gray-600"
                  }`}
                  disabled={isEditable}
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
                disabled={isEditable}
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
                disabled={isEditable}
              />
            </div>
          </div>
          {/* Second Row */}
          <div>
            <label
              htmlFor="streetAddress"
              className="block font-medium mb-2 mt-4"
              style={{ color: "var(--color-grayish)" }}
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300  ${
                formData.streetAddress
                  ? "placeholder-gray-600"
                  : "placeholder-gray-300"
              }`}
              placeholder="Enter street address"
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
