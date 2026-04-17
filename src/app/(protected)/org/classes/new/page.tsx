"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function NewClassPage() {
  const router = useRouter();
  const { collegeId, loading: orgLoading } = useOrg();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    moduleId: "",
    groupId: "",
    isWeekly: false,
    date: "",
    startTime: "",
    endTime: "",
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

  const { data: modulesData } = useFetch(
    programIds.length
      ? `/modules?fields=id,name&limit=200&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const modules =
    modulesData?.rows || (Array.isArray(modulesData) ? modulesData : []);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetchApi("/classes", {
        method: "POST",
        body: formData,
      });
      toast.success("Class created successfully");
      router.push("/org/classes");
    } catch {
      toast.error("Failed to create class");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Create New Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Module *</label>
            <select
              name="moduleId"
              value={formData.moduleId}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">Select Module</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
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
            <label className="block mb-1 font-medium">Date *</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Start Time *</label>
            <input
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">End Time *</label>
            <input
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              name="isWeekly"
              type="checkbox"
              checked={formData.isWeekly}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="font-medium">Recurring Weekly</label>
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton
            type="submit"
            title={submitting ? "Creating..." : "Create Class"}
            disabled={submitting}
          />
        </div>
      </form>
    </div>
  );
}
