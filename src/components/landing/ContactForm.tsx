/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import { ChevronDown } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

const countries = [
  "Nepal",
  "India",
  "Bangladesh",
  "South Korea",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Ireland",
  "New Zealand",
  "Singapore",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "Argentina",
  "Chile",
  "South Africa",
  "UAE",
  "Saudi Arabia",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    country: "Nepal",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://formspree.io/f/xnngrkow", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Form response: ", res);
      if (res?.ok) {
        setSubmitted(true);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "Nepal",
      message: "",
    });
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center component-px component-py">
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 p-8 lg:p-12 max-w-2xl w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-blackish mb-3">
              Thank You!
            </h1>
            <p className="text-grayish text-lg mb-2">
              We&apos;ve received your message
            </p>
            <p className="text-grayish">
              Our team will contact you soon to assist with your inquiry.
            </p>
          </div>

          <div className="bg-primary-light rounded-xl p-6 mb-6">
            <p className="text-sm text-blackish">
              <span className="font-medium">What&apos;s next?</span>
              <br />
              We typically respond within 24 hours during business days. Keep an
              eye on your email for our response.
            </p>
          </div>

          <button
            onClick={handleBackToForm}
            className="text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="get-in-touch"
      className="flex items-center justify-center component-px component-py"
    >
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl lg:text-4xl font-semibold text-blackish">
            Get in Touch
          </h1>
          <p className="text-grayish text-base lg:text-lg">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-200 p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-grayish mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#F5F5F5] focus:bg-white transition-colors text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-grayish mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#F5F5F5] focus:bg-white transition-colors text-sm"
              />
            </div>

            {/* Phone and Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-grayish mb-2"
                >
                  Phone <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#F5F5F5] focus:bg-white transition-colors text-sm"
                />
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-grayish mb-2"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-lg bg-[#F5F5F5] focus:bg-white transition-colors text-sm"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-grayish mb-2"
              >
                Message <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#F5F5F5] focus:bg-white transition-colors resize-none text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <PrimaryButton
                title={loading ? "Submitting..." : "Submit"}
                type="submit"
                className="w-full rounded-lg"
                disabled={loading}
              />
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-grayish">
            By submitting this form, you agree to our privacy policy and terms
            of service.
          </p>
        </div>
      </div>
    </div>
  );
}
