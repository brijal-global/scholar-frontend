"use client";

import { use, useState, useEffect } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";

function EditRoleGroupForm({ id }: { id: string }) {
  const router = useRouter();
  const { data, loading } = useFetch(
    `/college-custom-role-groups/${id}`
  ) as any;
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        description: data.description || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetchApi(`/college-custom-role-groups/${id}`, {
        method: "PUT",
        body: formData,
      });
      toast.success("Role group updated successfully");
      router.push("/org/roles");
    } catch {
      toast.error("Failed to update role group");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Edit Role Group</h1>
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
            />
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton
            type="submit"
            title={submitting ? "Saving..." : "Save Changes"}
            disabled={submitting}
          />
        </div>
      </form>
    </div>
  );
}

export default function EditRoleGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EditRoleGroupForm id={id} />;
}
