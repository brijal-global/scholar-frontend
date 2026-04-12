"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function NewRoleGroupPage() {
  const router = useRouter();
  const { collegeId, loading: orgLoading } = useOrg();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeId) return toast.error("College not found");
    setSubmitting(true);
    try {
      await fetchApi("/college-custom-role-groups", {
        method: "POST",
        body: {
          ...formData,
          collegeId,
        },
      });
      toast.success("Role group created successfully");
      router.push("/org/roles");
    } catch {
      toast.error("Failed to create role group");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Create Role Group</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Group Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="e.g. Administrators"
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
              placeholder="Role group description"
            />
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton
            type="submit"
            title={submitting ? "Creating..." : "Create Role Group"}
            disabled={submitting}
          />
        </div>
      </form>
    </div>
  );
}
