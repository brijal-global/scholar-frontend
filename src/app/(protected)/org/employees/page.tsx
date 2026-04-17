"use client";

import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";

function validate(f: typeof EMPTY_FORM) {
  if (!f.userId.trim()) return "User ID is required.";
  if (!f.designation.trim() || f.designation.trim().length < 2)
    return "Designation must be at least 2 characters.";
  if (!f.collegeCustomRoleGroupId) return "Please select a role group.";
  return null;
}

const EMPTY_FORM = {
  userId: "",
  collegeCustomRoleGroupId: "",
  designation: "",
  entry: "",
  associatedModuleId: "",
};

export default function EmployeesPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const { data: roleGroupsData } = useFetch(
    collegeId
      ? `/college-custom-role-groups?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const roleGroups: any[] =
    roleGroupsData?.rows || (Array.isArray(roleGroupsData) ? roleGroupsData : []);
  const roleGroupMap: Record<string, string> = Object.fromEntries(
    roleGroups.map((rg: any) => [rg.id, rg.name])
  );

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs: any[] =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: modulesData } = useFetch(
    programIds.length
      ? `/modules?fields=id,name&limit=200&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const modules: any[] =
    modulesData?.rows || (Array.isArray(modulesData) ? modulesData : []);

  useEffect(() => {
    if (editItem) {
      setFormData({
        userId: editItem.userId || "",
        collegeCustomRoleGroupId: editItem.collegeCustomRoleGroupId || "",
        designation: editItem.designation || "",
        entry: editItem.entry ? new Date(editItem.entry).toISOString().split("T")[0] : "",
        associatedModuleId: editItem.associatedModuleId || "",
      });
    } else if (createOpen) {
      setFormData(EMPTY_FORM);
    }
  }, [editItem, createOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!collegeId) return toast.error("College not found");
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/organization-employees/${editItem.id}`, {
          method: "PUT",
          body: {
            ...formData,
            associatedModuleId: formData.associatedModuleId || undefined,
            entry: formData.entry || undefined,
          },
        });
        toast.success("Employee updated");
        setEditItem(null);
      } else {
        await fetchApi("/organization-employees", {
          method: "POST",
          body: {
            ...formData,
            collegeId,
            associatedModuleId: formData.associatedModuleId || undefined,
            entry: formData.entry || undefined,
          },
        });
        toast.success("Employee added");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to save employee");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  const dataUrl = collegeId
    ? `/organization-employees-with-info?collegeId=${collegeId}`
    : "";

  return (
    <>
      {dataUrl && (
        <Table
          key={tableKey}
          title="Employees"
          dataApiUrl={dataUrl}
          headers={["Name", "Email", "Designation", "Role Group"]}
          dataKeys={["name", "email", "designation", "roleGroupName"]}
          searchKeys={["name", "email", "designation", "roleGroupName"]}
          onRowClick={(item) => setViewItem(item)}
          onCreateClick={() => setCreateOpen(true)}
        />
      )}

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button
            key="edit"
            onClick={() => { setEditItem(viewItem); setViewItem(null); }}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition"
          >
            Edit
          </button>,
        ]}
        title="Employee Details"
        width={520}
      >
        {viewItem && (
          <div className="grid grid-cols-2 gap-4 py-2 text-sm">
            <Detail label="Name" value={viewItem.name} />
            <Detail label="Email" value={viewItem.email} />
            <Detail label="Designation" value={viewItem.designation} />
            <Detail label="Role Group" value={viewItem.roleGroupName || roleGroupMap[viewItem.collegeCustomRoleGroupId]} />
            <Detail label="Module" value={viewItem.moduleName} />
            <Detail label="Entry Date" value={viewItem.entry ? new Date(viewItem.entry).toLocaleDateString() : undefined} />
          </div>
        )}
      </Modal>

      {/* Create / Edit Modal */}
      <Modal
        open={createOpen || !!editItem}
        onCancel={() => { setCreateOpen(false); setEditItem(null); }}
        onOk={handleSave}
        okText={submitting ? "Saving..." : editItem ? "Update" : "Add Employee"}
        okButtonProps={{ disabled: submitting, className: "bg-primary text-white" }}
        title={editItem ? "Edit Employee" : "Add Employee"}
        width={560}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">User ID <span className="text-red-500">*</span></label>
            <input
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              disabled={!!editItem}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full disabled:bg-gray-50"
              placeholder="Enter user UUID"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Designation <span className="text-red-500">*</span></label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. Professor, HOD"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Role Group <span className="text-red-500">*</span></label>
            <select
              name="collegeCustomRoleGroupId"
              value={formData.collegeCustomRoleGroupId}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">Select Role Group</option>
              {roleGroups.map((rg: any) => (
                <option key={rg.id} value={rg.id}>{rg.name}</option>
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
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Associated Module (Optional)</label>
            <select
              name="associatedModuleId"
              value={formData.associatedModuleId}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">None</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Detail({ label, value }: { label: string; value?: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">{label}</p>
      <p className="text-sm text-gray-800">{value ?? "—"}</p>
    </div>
  );
}
