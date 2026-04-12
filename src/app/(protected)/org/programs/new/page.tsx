"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function NewProgramPage() {
  const router = useRouter();
  const { collegeId, loading: orgLoading } = useOrg();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    level: "",
    description: "",
    universityName: "",
    totalCredits: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeId) return toast.error("College not found");
    setSubmitting(true);
    try {
      await fetchApi("/programs", {
        method: "POST",
        body: {
          ...formData,
          collegeId,
          totalCredits: formData.totalCredits
            ? Number(formData.totalCredits)
            : undefined,
        },
      });
      toast.success("Program created successfully");
      router.push("/org/programs");
    } catch {
      toast.error("Failed to create program");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Create New Program</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Program Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="e.g. Computer Science"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Code *</label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="e.g. CS-101"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Level *</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">Select Level</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="diploma">Diploma</option>
              <option value="certificate">Certificate</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">University Name</label>
            <input
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="Affiliated university"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Total Credits</label>
            <input
              name="totalCredits"
              type="number"
              value={formData.totalCredits}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="e.g. 120"
            />
          </div>
          <div className="md:col-span-2 xl:col-span-3">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
              rows={3}
              placeholder="Program description"
            />
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton
            type="submit"
            title={submitting ? "Creating..." : "Create Program"}
            disabled={submitting}
          />
        </div>
      </form>
    </div>
  );
}
