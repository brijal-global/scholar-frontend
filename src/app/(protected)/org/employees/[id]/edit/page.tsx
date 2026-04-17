/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useState, useEffect } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";

function EditEmployeeForm({ id }: { id: string }) {
  const router = useRouter();
  const { collegeId } = useOrg();
  const { data, loading } = useFetch(`/organization-employees/${id}`) as any;
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
    { now: !!collegeId },
  ) as any;
  const roleGroups =
    roleGroupsData?.rows ||
    (Array.isArray(roleGroupsData) ? roleGroupsData : []);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setFormData({
          userId: data.userId || "",
          collegeCustomRoleGroupId: data.collegeCustomRoleGroupId || "",
          designation: data.designation || "",
          entry: data.entry || "",
          associatedModuleId: data.associatedModuleId || "",
        });
      }, 0);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetchApi(`/organization-employees/${id}`, {
        method: "PUT",
        body: {
          ...formData,
          collegeCustomRoleGroupId:
            formData.collegeCustomRoleGroupId || undefined,
          associatedModuleId: formData.associatedModuleId || undefined,
          entry: formData.entry || undefined,
        },
      });
      toast.success("Employee updated successfully");
      router.push("/org/employees");
    } catch {
      toast.error("Failed to update employee");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold mb-6">Edit Employee</h1>
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
            <label className="block mb-1 font-medium">Designation *</label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="py-3 px-5 text-sm rounded-md w-full"
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

export default function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EditEmployeeForm id={id} />;
}
