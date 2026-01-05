/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { formatRoute } from "@/utils/stringFormatters";

const NewPermission = ({ roleId }: { roleId: string }) => {
  const [formData, setFormData] = useState({
    roleId: roleId,
    name: "",
    route: "",
    canView: false,
    canUpdate: false,
    canCreate: false,
    canDelete: false,
  }) as any;

  const [loading, setLoading] = useState(false);

  // Fetch roles for the dropdown
  const { data: roles } = useFetch("/roles?fields=name,id") as any;

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
      route: `/api/${formatRoute(formData.route)}`,
    };

    await fetchApi("/permissions", {
      method: "POST",
      body: payload,
      showSuccessToast: true,
      successRoute: `/scholar/roles/${roleId}/permissions`,
      errorRoute: `/scholar/roles/${roleId}/permissions/new`,
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="roleId" className="text-base">
            Role <span className="text-red-500 text-sm">*</span>
          </label>
          <select
            name="roleId"
            value={formData.roleId}
            required
            onChange={handleChange}
            disabled
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm bg-white border border-gray-300"
          >
            <option value="">Select a role</option>
            {roles?.map((role: any) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

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
            placeholder="Permission name (e.g., Users Management)"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="route" className="text-base">
            Route <span className="text-red-500 text-sm">*</span>
          </label>
          <div className="flex gap-0">
            <input
              type="text"
              name="route-prefix"
              value="/api/"
              disabled
              className="w-auto text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-l-lg outline-none py-2.5 px-4 text-sm"
            />
            <input
              type="text"
              name="route"
              value={formData.route}
              required
              onChange={handleChange}
              placeholder="xx/xx/xx"
              className="w-full flex-1 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-none py-2.5 px-4 text-sm border-t-0 border-b-0 border-l-0! border-r-0! border-gray-300! outline-none!"
            />
            <input
              type="text"
              name="route-suffix"
              value=":identifier"
              disabled
              className="w-auto text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-r-lg outline-nonepy-2.5 px-4 text-sm"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-base font-medium mb-4 block">
            Permissions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-3 p-3  rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                name="canView"
                checked={formData.canView}
                onChange={handleChange}
                className="w-5 h-5 text-primary accent-primary cursor-pointer"
              />
              <span className="text-sm font-medium">View</span>
            </label>

            <label className="flex items-center gap-3 p-3  rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                name="canUpdate"
                checked={formData.canUpdate}
                onChange={handleChange}
                className="w-5 h-5 text-primary accent-primary cursor-pointer"
              />
              <span className="text-sm font-medium">Update</span>
            </label>

            <label className="flex items-center gap-3 p-3  rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                name="canCreate"
                checked={formData.canCreate}
                onChange={handleChange}
                className="w-5 h-5 text-primary accent-primary cursor-pointer"
              />
              <span className="text-sm font-medium">Create</span>
            </label>

            <label className="flex items-center gap-3 p-3  rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                name="canDelete"
                checked={formData.canDelete}
                onChange={handleChange}
                className="w-5 h-5 text-primary accent-primary cursor-pointer"
              />
              <span className="text-sm font-medium">Delete</span>
            </label>
          </div>
        </div>
      </div>

      <div className="w-full flex sm:justify-end sm:items-center flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/scholar/permissions"}
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

export default NewPermission;
