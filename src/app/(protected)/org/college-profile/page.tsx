"use client";

import { useState, useEffect } from "react";
import { useOrg } from "@/contexts/OrgContext";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";

const COLLEGE_TYPES = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
  { value: "community", label: "Community" },
];

interface CollegeForm {
  name: string;
  type: string;
  country: string;
  city: string;
  streetAddress: string;
  description: string;
}

function validate(f: CollegeForm) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "College name must be at least 2 characters.";
  if (!f.country.trim()) return "Country is required.";
  if (!f.city.trim()) return "City is required.";
  return null;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
      <h2 className="text-base font-semibold text-gray-800 border-b pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function CollegeProfilePage() {
  const { collegeId, collegeData, refetch: refetchOrg } = useOrg();
  const [form, setForm] = useState<CollegeForm>({
    name: "",
    type: "private",
    country: "",
    city: "",
    streetAddress: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (collegeData) {
      setForm({
        name: collegeData.name || "",
        type: (collegeData as any).type || (collegeData as any).collegeType || "private",
        country: (collegeData as any).country || "",
        city: (collegeData as any).city || "",
        streetAddress: (collegeData as any).streetAddress || "",
        description: (collegeData as any).description || "",
      });
    }
  }, [collegeData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeId) return toast.error("College not found");
    const err = validate(form);
    if (err) return toast.error(err);
    setSaving(true);
    try {
      await fetchApi(`/colleges/${collegeId}`, {
        method: "PUT",
        body: form,
      });
      toast.success("College profile updated successfully");
      if (refetchOrg) refetchOrg();
    } catch {
      toast.error("Failed to update college profile");
    } finally {
      setSaving(false);
    }
  };

  if (!collegeId) return <Loader />;

  const inputCls =
    "py-2.5 px-4 rounded-md border border-gray-200 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  const labelCls = "block mb-1 text-sm font-medium text-gray-700";

  return (
    <div className="max-w-3xl space-y-6">
      <Section title="College Profile">
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                College Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputCls}
                placeholder="College name"
              />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputCls}
              >
                {COLLEGE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>
                Country <span className="text-red-500">*</span>
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className={inputCls}
                placeholder="e.g. United States"
              />
            </div>
            <div>
              <label className={labelCls}>
                City <span className="text-red-500">*</span>
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className={inputCls}
                placeholder="e.g. New York"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Street Address</label>
              <input
                name="streetAddress"
                value={form.streetAddress}
                onChange={handleChange}
                className={inputCls}
                placeholder="Street address"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className={`${inputCls} resize-none`}
                rows={4}
                placeholder="About your college"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white text-sm py-2.5 px-6 rounded-lg hover:bg-primary-dark transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update College Profile"}
            </button>
          </div>
        </form>
      </Section>
    </div>
  );
}
