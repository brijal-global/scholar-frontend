/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { genders } from "@/data/enums";
import Loader from "@/components/ui/Loader";

const NewUser = () => {
  const [formData, setFormData] = useState({
    roleId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    gender: Object.values(genders)[0] as string,
    profileImage: null as File | null,
    isTermsAndConditionsAccepted: false,
  }) as any;

  const [loading, setLoading] = useState(false);

  // Fetch roles for the dropdown
  const { data: rolesData } = useFetch("/roles?fields=id,name") as any;

  useEffect(() => {
    if (rolesData?.length > 0 && !formData.roleId) {
      setTimeout(() => {
        setFormData((prev: any) => ({
          ...prev,
          roleId: rolesData[0].id,
        }));
      }, 0);
    }
  }, [rolesData, formData.roleId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
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

    await fetchApi("/users", {
      method: "POST",
      body: formData,
      showSuccessToast: true,
      successRoute: "/scholar/users",
      errorRoute: "/scholar/users/new",
    });

    setLoading(false);
  };

  if (!rolesData) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 my-2">
      <h2 className="text-base font-semibold">New User</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-base">
            First Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            required
            onChange={handleChange}
            placeholder="First name"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-base">
            Last Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
            placeholder="Last name"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-base">
            Email <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            placeholder="Email address"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-base">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="roleId" className="text-base">
            Role <span className="text-red-500 text-sm">*</span>
          </label>
          <select
            name="roleId"
            value={formData.roleId}
            required
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm bg-white border border-gray-300"
          >
            <option value="">Select a role</option>
            {rolesData?.map((role: any) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-base">
            Gender <span className="text-red-500 text-sm">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            required
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm bg-white border border-gray-300"
          >
            {Object.entries(genders).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="profileImage" className="text-base">
            Profile Image
          </label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="address" className="text-base">
            Address <span className="text-red-500 text-sm">*</span>
          </label>
          <textarea
            name="address"
            rows={3}
            value={formData.address}
            required
            onChange={handleChange}
            placeholder="Full address"
            className="w-full text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg outline-gray-400 py-2.5 px-4 text-sm resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition w-fit">
            <input
              type="checkbox"
              name="isTermsAndConditionsAccepted"
              checked={formData.isTermsAndConditionsAccepted}
              onChange={handleChange}
              required
              className="w-5 h-5 text-primary accent-primary cursor-pointer"
            />
            <span className="text-sm font-medium">
              Terms and Conditions Accepted{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>

      <div className="w-full flex sm:justify-end sm:items-center flex-col sm:flex-row mt-5 gap-4">
        <Link
          href={"/scholar/users"}
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

export default NewUser;
