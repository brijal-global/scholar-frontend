/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import fetchApi from "@/lib/axios";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";
import { collegeTypes } from "@/data/enums";

const EditCollegePage = ({ collegeId }: { collegeId: string }) => {
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(`/colleges/${collegeId}`) as any;

  const [formData, setFormData] = useState({
    name: "",
    collegeType: "",
    country: "",
    city: "",
    streetAddress: "",
    logo: null as File | null,
    coverImage: null as File | null,
    isAttendanceClassBased: false,
  }) as any;

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (file && file.size > maxSize) {
        toast.error(
          `The selected file is too large. Please select a file smaller than ${
            maxSize / 1024 / 1024
          } MB.`,
        );
        e.target.value = "";
        return;
      }

      setFormData({
        ...formData,
        [name]: file || null,
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    await fetchApi(`/colleges/${collegeId}`, {
      method: "PUT",
      body: formData,
      showSuccessToast: true,
      successRoute: "/scholar/colleges",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setFormData({
          name: data.name || "",
          collegeType:
            data.collegeType || (Object.values(collegeTypes)[0] as string),
          country: data.country || "",
          city: data.city || "",
          streetAddress: data.streetAddress || "",
          logo: null,
          coverImage: null,
          isAttendanceClassBased: data.isAttendanceClassBased ?? false,
        });
      }, 0);
    }
  }, [data]);

  if (!data) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-base">
            College Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            required
            onChange={handleChange}
            placeholder="College full name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="collegeType" className="text-base">
            College Type <span className="text-red-500 text-sm">*</span>
          </label>
          <select
            name="collegeType"
            value={formData?.collegeType || ""}
            required
            onChange={handleChange}
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 bg-white border border-gray-300"
          >
            <option value="">Select type</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="community">Community</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="text-base">
            Country <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData?.country || ""}
            required
            onChange={handleChange}
            placeholder="Country name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-base">
            City <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData?.city || ""}
            required
            onChange={handleChange}
            placeholder="City name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="streetAddress" className="text-base">
            Street Address <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="streetAddress"
            value={formData?.streetAddress || ""}
            required
            onChange={handleChange}
            placeholder="Street address"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="logo" className="text-base">
            Logo
          </label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
          />
          {data?.logo && (
            <p className="text-xs text-gray-500">Current: {data.logo}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="coverImage" className="text-base">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
          />
          {data?.coverImage && (
            <p className="text-xs text-gray-500">Current: {data.coverImage}</p>
          )}
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/scholar/colleges"}
          className="px-12 py-2.5 text-secondary hover:bg-secondary hover:text-white transition border-2 border-secondary rounded-lg text-center"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className={`px-16 py-3 bg-primary hover:bg-primary-dark transition text-white rounded-lg flex items-center justify-center text-center ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditCollegePage;
