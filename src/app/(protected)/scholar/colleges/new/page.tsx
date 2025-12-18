/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { collegeTypes } from "@/data/enums";

const NewCollege = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    name: "",
    collegeType: Object.values(collegeTypes)[0] as string,
    country: "",
    city: "",
    streetAddress: "",
    logo: null,
    coverImage: null,
    isAttendanceClassBased: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]:
        e.target instanceof HTMLInputElement
          ? e.target.value
          : e.target instanceof HTMLSelectElement
          ? (e.target as HTMLSelectElement).value
          : e.target instanceof HTMLTextAreaElement
          ? e.target.value
          : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetchApi("/colleges", {
        method: "POST",
        body: formData,
      });
      if (res?.success) {
        toast.success(res?.message || "College created successfully!");
        router.push("/scholar/colleges");
      } else {
        toast.error(res?.message || "Failed to create college!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to create college!");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-base font-semibold">New College</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm"
      >
        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-gray-500 transition-all duration-300"
          >
            College Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="py-3 px-5 text-sm rounded-md w-full"
            placeholder="College full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="collegeType"
            className="text-gray-500 transition-all duration-300"
          >
            College Type <span className="text-red-500">*</span>
          </label>
          <select
            id="collegeType"
            name="collegeType"
            className="py-3 px-5 text-sm rounded-md w-full"
            value={formData.collegeType}
            onChange={handleChange}
            required
          >
            {Object.entries(collegeTypes).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="country"
            className="text-gray-500 transition-all duration-300"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="py-3 px-5 text-sm rounded-md w-full"
            placeholder="Country name"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="city"
            className="text-gray-500 transition-all duration-300"
          >
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="py-3 px-5 text-sm rounded-md w-full"
            placeholder="City name"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="streetAddress"
            className="text-gray-500 transition-all duration-300"
          >
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            className="py-3 px-5 text-sm rounded-md w-full"
            placeholder="Street address"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative flex items-end">
          <label
            htmlFor="isAttendanceClassBased"
            className="text-gray-500 transition-all duration-300 text-nowrap cursor-pointer select-none"
          >
            Is Attendance Class Based
          </label>
          <input
            type="checkbox"
            id="isAttendanceClassBased"
            name="isAttendanceClassBased"
            className="py-3 px-5 text-sm rounded-md w-full"
            onChange={handleChange}
          />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="logo"
            className="text-gray-500 transition-all duration-300"
          >
            Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            className="py-3 px-5 text-sm rounded-md w-full"
            onChange={handleChange}
          />
        </div>

        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="coverImage"
            className="text-gray-500 transition-all duration-300"
          >
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            className="py-3 px-5 text-sm rounded-md w-full"
            onChange={handleChange}
          />
        </div>

        <hr className="col-span-full border-gray-200 my-5" />

        <div className="relative flex justify-end col-span-full">
          <PrimaryButton
            type="submit"
            title="Create College"
            className="w-full md:w-auto"
          />
        </div>
      </form>
    </div>
  );
};

export default NewCollege;
