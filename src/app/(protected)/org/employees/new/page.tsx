"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

export default function NewEmployeePage() {
  const router = useRouter();
  const { collegeId, loading: orgLoading } = useOrg();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    collegeCustomRoleGroupId: "",
    designation: "",
    entry: "",
    associatedModuleId: "",
  });

  const { data: roleGroupsData } = useFetch(
    collegeId
      ? `/college-custom-role-groups?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const roleGroups =
    roleGroupsData?.rows ||
    (Array.isArray(roleGroupsData) ? roleGroupsData : []);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeId) return toast.error("College not found");
    setSubmitting(true);
    try {
      await fetchApi("/organization-employees", {
        method: "POST",
        body: {
          ...formData,
          collegeId,
          collegeCustomRoleGroupId:
            formData.collegeCustomRoleGroupId || undefined,
          associatedModuleId: formData.associatedModuleId || undefined,
          entry: formData.entry || undefined,
        },
      });
      toast.success("Employee added successfully");
      router.push("/org/employees");
    } catch {
      toast.error("Failed to add employee");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Add Employee</h1>
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
              placeholder="Enter user ID"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Designation *</label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
              placeholder="e.g. Professor, HOD"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Role Group (Optional)
            </label>
            <select
              name="collegeCustomRoleGroupId"
              value={formData.collegeCustomRoleGroupId}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">None</option>
              {roleGroups.map((rg: any) => (
                <option key={rg.id} value={rg.id}>
                  {rg.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Entry Date</label>
            <input
              name="entry"
              type="date"
              value={formData.entry}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Associated Module (Optional)
            </label>
            <select
              name="associatedModuleId"
              value={formData.associatedModuleId}
              onChange={handleChange}
              className="py-3 px-5 text-sm rounded-md w-full"
            >
              <option value="">None</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton
            type="submit"
            title={submitting ? "Adding..." : "Add Employee"}
            disabled={submitting}
          />
        </div>
      </form>
    </div>
  );
}
