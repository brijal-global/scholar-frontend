"use client";

import { use, useState, useEffect } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

function EditGroupForm({ id }: { id: string }) {
  const router = useRouter();
  const { collegeId } = useOrg();
  const { data, loading } = useFetch(`/groups/${id}`) as any;
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    batchId: "",
    year: "",
    description: "",
    supervisorId: "",
  });

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id,name&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const batches =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);

  const { data: employeesData } = useFetch(
    collegeId
      ? `/organization-employees?fields=id,userId,designation&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const employees =
    employeesData?.rows ||
    (Array.isArray(employeesData) ? employeesData : []);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        batchId: data.batchId || "",
        year: data.year?.toString() || "",
        description: data.description || "",
        supervisorId: data.supervisorId || "",
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
      await fetchApi(`/groups/${id}`, {
        method: "PUT",
        body: {
          ...formData,
          year: formData.year ? Number(formData.year) : undefined,
          supervisorId: formData.supervisorId || undefined,
        },
      });
      toast.success("Group updated successfully");
      router.push("/org/groups");
    } catch {
      toast.error("Failed to update group");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Edit Group</h1>
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
          <div>
            <label className="block mb-1 font-medium">Batch *</label>
            <select
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">Select Batch</option>
              {batches.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Supervisor (Optional)
            </label>
            <select
              name="supervisorId"
              value={formData.supervisorId}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">None</option>
              {employees.map((emp: any) => (
                <option key={emp.id} value={emp.id}>
                  {emp.designation || emp.userId}
                </option>
              ))}
            </select>
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

export default function EditGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EditGroupForm id={id} />;
}
