/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import hitApi from "@/lib/axios";

import Gamification from "@/components/modals/Gamification";
import FailedModal from "@/components/modals/FailedModal";
import Loader from "@/components/ui/Loader";

const EditPage = ({ id }: { id: string }) => {
  const [failedText, setFailedText] = useState("");
  const [successModalStatus, setSuccessModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(`/roles/${id}`) as any;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  }) as any;

  const handleChange = (e: any) => {
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      const maxSize = 2 * 1024 * 1024; // file size in bytes

      if (file) {
        if (file.size > maxSize) {
          setFailedText(
            `The selected file is too large. Please select a file smaller than ${
              maxSize / 1024 / 1024
            } MB.`
          );

          // Clear the input
          (e.target as HTMLInputElement).value = "";
          return;
        }

        setFormData({
          ...formData,
          [e.target.name]: file,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setFailedText("");

    // Send the form data to the server
    const res = await hitApi(`/roles/${id}`, { method: "PUT", body: formData });

    if (res?.success) {
      setSuccessModalStatus(true);
    } else {
      setFailedText(res?.message || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setFormData({
          name: data.name,
          description: data.description,
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
            Name <span className="text-red-500 text-sm">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            required
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2.5 text-darkText placeholder-[#555555] font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>

        <div className="flex flex-col md:col-span-2 gap-2">
          <label htmlFor="fullName" className="text-base">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData?.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2.5 text-darkText placeholder-[#555555]   font-normal component-paragraphs rounded-lg   outline-gray-400"
          />
        </div>
      </div>

      <div className="w-full flex sm:justify-end flex-col sm:flex-row mt-5 gap-4">
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

      {failedText && (
        <div className="w-full bg-red-100 rounded-lg p-3 mb-3 text-red-500 font-medium text-center">
          {failedText}
        </div>
      )}

      {successModalStatus && (
        <Gamification
          isOpen={successModalStatus}
          closeModal={() => setSuccessModalStatus(false)}
          title="Success"
          text="Role saved successfully"
          link={"/scholar/roles"}
        />
      )}

      {failedText && (
        <FailedModal
          isOpen={!!failedText}
          closeModal={() => setFailedText("")}
          title="Failed"
          text={failedText}
        />
      )}
    </form>
  );
};

export default EditPage;
