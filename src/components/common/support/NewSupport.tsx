/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/Buttons";

const categories = [
  "Application Support",
  "Visa & Immigration Support",
  "General Inquiries",
  "Payment & Finance Related",
  "Admission Support",
];

export default function CreateSupport() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
    attachment: null,
  }) as any;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="my-8">
      {/* Header */}
      <div className="text-center my-8 space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">
          Create Support Ticket
        </h1>
        <p className="text- text[#252C32]">
          Report a problem or ask a question, and our support team will respond.
        </p>
      </div>

      {/* Form */}
      <div className="bg-[#F9F9F9] rounded-2xl lg:rounded-3xl border border-gray-200 p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          {/* Subject and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter issue subject (e.g., Visa Processing Delay)"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-lg bg-white"
                >
                  <option value="">--Select issue category--</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={8}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Need assistance? Start typing..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none bg-white"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="flex items-center gap-4 bg-white rounded-lg overflow-hidden border border-[#F1F1F1]">
              <label className="cursor-pointer bg-[#F2F2F2] hover:bg-gray-200 px-8 py-3 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
                <span className="text-[#909090E5]">Choose file</span>
              </label>
              <span className="text-gray-500">
                {formData.attachment
                  ? formData.attachment?.name
                  : "No file chosen"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <Link
              href="/support"
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Back
            </Link>
            <PrimaryButton
              title="Submit"
              type="submit"
              className="rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
