/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import fetchApi from "@/lib/axios";
import Loader from "@/components/ui/Loader";

const EditPlanModulePage = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(`/plan-modules/${id}`) as any;

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    monthlyPrice: "",
    offerName: "",
    offerMonthlyPrice: "",
    isActive: true,
  }) as any;

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      ...formData,
      monthlyPrice: parseFloat(formData.monthlyPrice),
      offerMonthlyPrice: parseFloat(formData.offerMonthlyPrice),
    };

    await fetchApi(`/plan-modules/${id}`, {
      method: "PUT",
      body: payload,
      showSuccessToast: true,
      successRoute: "/scholar/modules",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setFormData({
          name: data.name || "",
          code: data.code || "",
          monthlyPrice: data.monthlyPrice?.toString() || "",
          offerName: data.offerName || "",
          offerMonthlyPrice: data.offerMonthlyPrice?.toString() || "",
          isActive: data.isActive ?? true,
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
            Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            required
            onChange={handleChange}
            placeholder="Module name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="text-base">
            Code <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="code"
            value={formData?.code || ""}
            required
            onChange={handleChange}
            placeholder="Module code"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="monthlyPrice" className="text-base">
            Monthly Price <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="number"
            name="monthlyPrice"
            value={formData?.monthlyPrice || ""}
            required
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="offerName" className="text-base">
            Offer Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="offerName"
            value={formData?.offerName || ""}
            required
            onChange={handleChange}
            placeholder="Offer name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="offerMonthlyPrice" className="text-base">
            Offer Monthly Price <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="number"
            name="offerMonthlyPrice"
            value={formData?.offerMonthlyPrice || ""}
            required
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base">Status</label>
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition w-fit">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 text-primary accent-primary cursor-pointer"
            />
            <span className="text-sm font-medium">Active</span>
          </label>
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/scholar/modules"}
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

export default EditPlanModulePage;

