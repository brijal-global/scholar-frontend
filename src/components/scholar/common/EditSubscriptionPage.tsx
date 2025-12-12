/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import fetchApi from "@/lib/axios";
import Loader from "@/components/ui/Loader";

const EditSubscriptionPage = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(`/subscriptions/${id}`) as any;
  const { data: colleges } = useFetch("/colleges") as any;

  const [formData, setFormData] = useState({
    collegeId: "",
    maxAllowedStudents: "",
    startDate: "",
    expiryDate: "",
    totalAmount: "",
    attachment: null as File | null,
    isActive: true,
  }) as any;

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files?.[0] || null,
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

    const payload = {
      ...formData,
      maxAllowedStudents: parseInt(formData.maxAllowedStudents),
      totalAmount: parseFloat(formData.totalAmount),
    };

    await fetchApi(`/subscriptions/${id}`, {
      method: "PUT",
      body: payload,
      showSuccessToast: true,
      successRoute: "/scholar/subscriptions",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setFormData({
          collegeId: data.collegeId || "",
          maxAllowedStudents: data.maxAllowedStudents?.toString() || "",
          startDate: data.startDate?.split("T")[0] || "",
          expiryDate: data.expiryDate?.split("T")[0] || "",
          totalAmount: data.totalAmount?.toString() || "",
          attachment: null,
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
          <label htmlFor="collegeId" className="text-base">
            College <span className="text-red-500 text-sm">*</span>
          </label>
          <select
            name="collegeId"
            value={formData.collegeId}
            required
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm bg-white border border-gray-300"
          >
            <option value="">Select a college</option>
            {colleges?.map((college: any) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="maxAllowedStudents" className="text-base">
            Max Allowed Students <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="number"
            name="maxAllowedStudents"
            value={formData?.maxAllowedStudents || ""}
            required
            onChange={handleChange}
            placeholder="Maximum number of students"
            min="1"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-base">
            Start Date <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData?.startDate || ""}
            required
            onChange={handleChange}
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="expiryDate" className="text-base">
            Expiry Date <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData?.expiryDate || ""}
            required
            onChange={handleChange}
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="totalAmount" className="text-base">
            Total Amount <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="number"
            name="totalAmount"
            value={formData?.totalAmount || ""}
            required
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="attachment" className="text-base">
            Attachment
          </label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
          />
          {data?.attachment && (
            <p className="text-xs text-gray-500">
              Current: {data.attachment}
            </p>
          )}
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
          href={"/scholar/subscriptions"}
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

export default EditSubscriptionPage;

