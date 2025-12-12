/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import fetchApi from "@/lib/axios";
import Loader from "@/components/ui/Loader";

const EditInquiryPage = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(`/inquiries/${id}`) as any;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organizationName: "",
    message: "",
    status: "pending",
    replyMessage: "",
  }) as any;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    await fetchApi(`/inquiries/${id}`, {
      method: "PUT",
      body: formData,
      showSuccessToast: true,
      successRoute: "/scholar/inquiries",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          organizationName: data.organizationName || "",
          message: data.message || "",
          status: data.status || "pending",
          replyMessage: data.replyMessage || "",
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
          <label htmlFor="fullName" className="text-base">
            Full Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData?.fullName || ""}
            required
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-base">
            Email <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData?.email || ""}
            required
            onChange={handleChange}
            placeholder="Email address"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-base">
            Phone <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData?.phone || ""}
            required
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="organizationName" className="text-base">
            Organization Name
          </label>
          <input
            type="text"
            name="organizationName"
            value={formData?.organizationName || ""}
            onChange={handleChange}
            placeholder="Organization name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="message" className="text-base">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData?.message || ""}
            onChange={handleChange}
            placeholder="Inquiry message"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-base">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm bg-white border border-gray-300"
          >
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="replyMessage" className="text-base">
            Reply Message
          </label>
          <textarea
            name="replyMessage"
            rows={4}
            value={formData?.replyMessage || ""}
            onChange={handleChange}
            placeholder="Reply message"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 resize-none"
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/scholar/inquiries"}
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

export default EditInquiryPage;

