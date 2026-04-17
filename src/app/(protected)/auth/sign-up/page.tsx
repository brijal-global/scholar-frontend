"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import fetchApi from "@/lib/axios";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { collegeTypes } from "@/data/enums";
import { genders } from "@/data/enums";
import { ChevronLeft, ChevronRight, CheckCircle, User, Building2, ClipboardList } from "lucide-react";

const steps = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "College Info", icon: Building2 },
  { id: 3, label: "Review & Submit", icon: ClipboardList },
];

const SignUpPage = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "male",
    address: "",
    collegeName: "",
    collegeType: Object.values(collegeTypes)[0],
    country: "",
    city: "",
    streetAddress: "",
    isTermsAndConditionsAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateStep1 = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setErr("Please fill in all required fields.");
      return false;
    }
    if (formData.password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErr("Passwords do not match.");
      return false;
    }
    setErr("");
    return true;
  };

  const validateStep2 = () => {
    if (
      !formData.collegeName ||
      !formData.collegeType ||
      !formData.country ||
      !formData.city ||
      !formData.streetAddress
    ) {
      setErr("Please fill in all required college fields.");
      return false;
    }
    setErr("");
    return true;
  };

  const goNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const goBack = () => {
    setErr("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.isTermsAndConditionsAccepted) {
      setErr("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    setErr("");

    try {
      const res = await fetchApi("/auth/signup/college-owner", {
        method: "POST",
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          gender: formData.gender,
          address: formData.address,
          collegeName: formData.collegeName,
          collegeType: formData.collegeType,
          country: formData.country,
          city: formData.city,
          streetAddress: formData.streetAddress,
          isTermsAndConditionsAccepted: true,
        },
      });

      if (res?.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2000);
      } else {
        setErr(res?.message || "Signup failed. Please try again.");
      }
    } catch {
      setErr("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "floating-input py-2 px-5 text-sm rounded-md w-full";
  const labelBase =
    "floating-label absolute left-5 top-2.5 text-gray-500 transition-all duration-300";

  return (
    <div className="relative flex items-center justify-center h-full bg-white overflow-y-auto">
      <section className="w-full max-w-lg p-8 rounded-lg">
        <h2 className="text-2xl text-center font-semibold mb-1 text-primary select-none">
          Create your account
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6 select-none">
          Register your college on Scholar
        </p>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  title={step.label}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle size={18} />
                  ) : (
                    <StepIcon size={18} />
                  )}
                </div>
                {step.id < 3 && (
                  <div
                    className={`w-10 h-px ${currentStep > step.id ? "bg-primary" : "bg-gray-300"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={inputClass}
                    placeholder=""
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="firstName" className={labelBase}>
                    First Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={inputClass}
                    placeholder=""
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="lastName" className={labelBase}>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={inputClass}
                  placeholder=""
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email" className={labelBase}>
                  Email <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={inputClass}
                  placeholder=""
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone" className={labelBase}>
                  Phone
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={inputClass}
                    placeholder=""
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password" className={labelBase}>
                    Password <span className="text-red-500">*</span>
                  </label>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-4 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    <HugeiconsIcon
                      icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                      className="h-5 w-5 text-gray-700"
                    />
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={inputClass}
                    placeholder=""
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="confirmPassword" className={labelBase}>
                    Confirm <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    className="py-3 px-5 text-sm rounded-md w-full"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    {Object.entries(genders).map(([key, value]) => (
                      <option key={key} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <label className="text-xs text-gray-400 mb-1 block absolute -top-4 left-1">
                    Gender
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={inputClass}
                    placeholder=""
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <label htmlFor="address" className={labelBase}>
                    Address
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: College Info */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  className={inputClass}
                  placeholder=""
                  value={formData.collegeName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="collegeName" className={labelBase}>
                  College Name <span className="text-red-500">*</span>
                </label>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  College Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="collegeType"
                  name="collegeType"
                  className="py-3 px-5 text-sm rounded-md w-full"
                  value={formData.collegeType}
                  onChange={handleChange}
                  required
                >
                  {Object.entries(collegeTypes).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="country"
                  name="country"
                  className={inputClass}
                  placeholder=""
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="country" className={labelBase}>
                  Country <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={inputClass}
                  placeholder=""
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="city" className={labelBase}>
                  City <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  className={inputClass}
                  placeholder=""
                  value={formData.streetAddress}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="streetAddress" className={labelBase}>
                  Street Address <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-5">
              <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Personal Info
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>{" "}
                    <span className="text-gray-700">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span>{" "}
                    <span className="text-gray-700">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div>
                      <span className="text-gray-400">Phone:</span>{" "}
                      <span className="text-gray-700">{formData.phone}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">Gender:</span>{" "}
                    <span className="text-gray-700 capitalize">
                      {formData.gender}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  College Info
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>{" "}
                    <span className="text-gray-700">
                      {formData.collegeName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span>{" "}
                    <span className="text-gray-700 capitalize">
                      {formData.collegeType}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Location:</span>{" "}
                    <span className="text-gray-700">
                      {formData.city}, {formData.country}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Address:</span>{" "}
                    <span className="text-gray-700">
                      {formData.streetAddress}
                    </span>
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isTermsAndConditionsAccepted"
                  checked={formData.isTermsAndConditionsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4"
                />
                <span className="text-sm text-gray-600">
                  I accept the{" "}
                  <Link
                    href="/terms"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
          )}

          {err && (
            <p className="w-full bg-red-100 text-red-500 text-center text-sm font-medium rounded-md p-2.5 mt-4">
              {err}
            </p>
          )}
          {success && (
            <p className="w-full bg-green-100 text-green-600 text-center text-sm font-medium rounded-md p-2.5 mt-4">
              Account created successfully! Redirecting to sign in...
            </p>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6 gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition cursor-pointer"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded text-sm transition cursor-pointer"
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded text-sm transition cursor-pointer disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            )}
          </div>
        </form>

        <div className="flex justify-center items-center gap-x-2 mt-6 select-none">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
