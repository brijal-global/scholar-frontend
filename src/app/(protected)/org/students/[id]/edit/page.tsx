"use client";

import { use, useState, useEffect } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

function EditStudentForm({ id }: { id: string }) {
  const router = useRouter();
  const { collegeId } = useOrg();
  const { data, loading } = useFetch(`/student-details/${id}`) as any;
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    groupId: "",
    dob: "",
  });

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const batches =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const batchIds = batches.map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groups =
    groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);

  useEffect(() => {
    if (data) {
      setFormData({
        userId: data.userId || "",
        groupId: data.groupId || "",
        dob: data.dob || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetchApi(`/student-details/${id}`, {
        method: "PUT",
        body: formData,
      });
      toast.success("Student record updated successfully");
      router.push("/org/students");
    } catch {
      toast.error("Failed to update student record");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">User ID *</label>
            <input
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Group *</label>
            <select
              name="groupId"
              value={formData.groupId}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">Select Group</option>
              {groups.map((g: any) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Date of Birth *</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
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

export default function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EditStudentForm id={id} />;
}
