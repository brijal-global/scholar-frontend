"use client";

import { use, useState, useEffect } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";

function EditProgramForm({ id }: { id: string }) {
  const router = useRouter();
  const { data, loading } = useFetch(`/programs/${id}`) as any;
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    level: "",
    description: "",
    universityName: "",
    totalCredits: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        code: data.code || "",
        level: data.level || "",
        description: data.description || "",
        universityName: data.universityName || "",
        totalCredits: data.totalCredits?.toString() || "",
      });
    }
  }, [data]);

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
      await fetchApi(`/programs/${id}`, {
        method: "PUT",
        body: {
          ...formData,
          totalCredits: formData.totalCredits
            ? Number(formData.totalCredits)
            : undefined,
        },
      });
      toast.success("Program updated successfully");
      router.push("/org/programs");
    } catch {
      toast.error("Failed to update program");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Edit Program</h1>
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

export default function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EditProgramForm id={id} />;
}
