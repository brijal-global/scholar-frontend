/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import fetchApi from "@/lib/axios";

const NewRoles = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  }) as any;

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    await fetchApi("/roles", {
      method: "POST",
      body: formData,
      showSuccessToast: true,
      successRoute: "/scholar/roles",
      errorRoute: "/scholar/roles/new",
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-base">
            Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            placeholder="Name"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="description" className="text-base">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm resize-none"
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end sm:items-center flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/scholar/roles"}
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

export default NewRoles;
