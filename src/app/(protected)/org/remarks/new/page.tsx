"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";
import { useOrg } from "@/contexts/OrgContext";

export default function NewRemarkPage() {
  const router = useRouter();
  const { userData } = useAuth();
  const { loading: orgLoading } = useOrg();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    remarkType: "",
    subject: "",
    message: "",
    attachment: "",
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
    setSubmitting(true);
    try {
      await fetchApi("/student-remarks", {
        method: "POST",
        body: {
          ...formData,
          teacherId: userData?.id,
          attachment: formData.attachment || undefined,
        },
      });
      toast.success("Remark created successfully");
      router.push("/org/remarks");
    } catch {
      toast.error("Failed to create remark");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Create Student Remark</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Student ID *</label>
            <input
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="Enter student ID"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Remark Type *</label>
            <select
              name="remarkType"
              value={formData.remarkType}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">Select Type</option>
              <option value="academic">Academic</option>
              <option value="behavioral">Behavioral</option>
              <option value="attendance">Attendance</option>
              <option value="general">General</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Subject *</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="Remark subject"
            />
          </div>
          <div className="md:col-span-2 xl:col-span-3">
            <label className="block mb-1 font-medium">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              rows={4}
              placeholder="Remark message"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Attachment URL (Optional)
            </label>
            <input
              name="attachment"
              value={formData.attachment}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton
            type="submit"
            title={submitting ? "Creating..." : "Create Remark"}
            disabled={submitting}
          />
        </div>
      </form>
    </div>
  );
}
