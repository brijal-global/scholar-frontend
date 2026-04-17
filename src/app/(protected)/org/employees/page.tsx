/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { UserPlus, Link2 } from "lucide-react";

/* ─── types ─────────────────────────────────────────────── */
const EMPTY_CREATE_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  designation: "",
  collegeCustomRoleGroupId: "",
  entry: "",
  associatedModuleId: "",
};

const EMPTY_EDIT_FORM = {
  designation: "",
  collegeCustomRoleGroupId: "",
  entry: "",
  associatedModuleId: "",
};

function validateCreate(f: typeof EMPTY_CREATE_FORM) {
  if (!f.firstName.trim()) return "First name is required.";
  if (!f.lastName.trim()) return "Last name is required.";
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    return "A valid email is required.";
  if (!f.designation.trim() || f.designation.trim().length < 2)
    return "Designation must be at least 2 characters.";
  if (!f.collegeCustomRoleGroupId) return "Please select a role group.";
  return null;
}

function validateEdit(f: typeof EMPTY_EDIT_FORM) {
  if (!f.designation.trim() || f.designation.trim().length < 2)
    return "Designation must be at least 2 characters.";
  if (!f.collegeCustomRoleGroupId) return "Please select a role group.";
  return null;
}

export default function EmployeesPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [createForm, setCreateForm] = useState(EMPTY_CREATE_FORM);
  const [editForm, setEditForm] = useState(EMPTY_EDIT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  /* Role groups — fetch with isAdmin flag so we can exclude admin */
  const { data: roleGroupsData } = useFetch(
    collegeId
      ? `/college-custom-role-groups?limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId },
  ) as any;
  const allRoleGroups: any[] =
    roleGroupsData?.rows ||
    (Array.isArray(roleGroupsData) ? roleGroupsData : []);
  /* Only show non-admin role groups in the selector */
  const roleGroups = allRoleGroups.filter((rg: any) => !rg.isAdmin);

  /* Modules for the associated-module selector */
  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId },
  ) as any;
  const programIds: string[] = (
    programsData?.rows || (Array.isArray(programsData) ? programsData : [])
  ).map((p: any) => p.id);

  const { data: modulesData } = useFetch(
    programIds.length
      ? `/modules?fields=id,name&limit=200&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 },
  ) as any;
  const modules: any[] =
    modulesData?.rows || (Array.isArray(modulesData) ? modulesData : []);

  /* Seed form when opening edit */
  useEffect(() => {
    if (editItem) {
      setTimeout(() => {
        setEditForm({
          designation: editItem.designation || "",
          collegeCustomRoleGroupId: editItem.collegeCustomRoleGroupId || "",
          entry: editItem.entry
            ? new Date(editItem.entry).toISOString().split("T")[0]
            : "",
          associatedModuleId: editItem.associatedModuleId || "",
        });
      }, 0);
    }
    if (createOpen) {
      setTimeout(() => {
        setCreateForm(EMPTY_CREATE_FORM);
      }, 0);
    }
  }, [editItem, createOpen]);

  /* ── create: call create-or-link endpoint ── */
  const handleCreate = async () => {
    if (!collegeId) return toast.error("College not found");
    const err = validateCreate(createForm);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      const res = await fetchApi("/organization-employees/create-or-link", {
        method: "POST",
        body: { ...createForm, collegeId },
      });
      const { isNewUser } = res?.data || {};
      toast.success(
        isNewUser
          ? "New user account created and added as employee"
          : "Existing user linked as employee",
      );
      setCreateOpen(false);
      setTableKey((k) => k + 1);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message || e?.message || "Failed to add employee";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── edit: update designation / role / entry ── */
  const handleEdit = async () => {
    if (!editItem) return;
    const err = validateEdit(editForm);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      await fetchApi(`/organization-employees/${editItem.id}`, {
        method: "PUT",
        body: {
          collegeCustomRoleGroupId: editForm.collegeCustomRoleGroupId,
          designation: editForm.designation,
          entry: editForm.entry || undefined,
          associatedModuleId: editForm.associatedModuleId || undefined,
        },
      });
      toast.success("Employee updated");
      setEditItem(null);
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to update employee");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  const dataUrl = collegeId
    ? `/organization-employees-with-info?collegeId=${collegeId}`
    : "";

  const roleGroupMap: Record<string, string> = Object.fromEntries(
    allRoleGroups.map((rg: any) => [rg.id, rg.name]),
  );
  const moduleMap: Record<string, string> = Object.fromEntries(
    modules.map((m: any) => [m.id, m.name]),
  );

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

      {/* ── View Modal ── */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button
            key="edit"
            onClick={() => {
              setEditItem(viewItem);
              setViewItem(null);
            }}
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
            <Detail label="Phone" value={viewItem.phone} />
            <Detail
              label="Role Group"
              value={
                viewItem.roleGroupName ||
                roleGroupMap[viewItem.collegeCustomRoleGroupId]
              }
            />
            <Detail label="Designation" value={viewItem.designation} />
            <Detail
              label="Entry Date"
              value={
                viewItem.entry
                  ? new Date(viewItem.entry).toLocaleDateString()
                  : undefined
              }
            />
            <Detail
              label="Associated Module"
              value={
                moduleMap[viewItem.associatedModuleId] || viewItem.moduleName
              }
            />
          </div>
        )}
      </Modal>

      {/* ── Create Modal ── */}
      <Modal
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onOk={handleCreate}
        okText={submitting ? "Saving..." : "Add Employee"}
        okButtonProps={{
          disabled: submitting,
          className: "bg-primary text-white",
        }}
        title="Add Employee"
        width={580}
      >
        {/* Info banner */}
        <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
          <Link2 size={14} className="mt-0.5 shrink-0" />
          <span>
            If an account with this email already exists, it will be linked
            automatically. Otherwise, a new account is created.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              value={createForm.firstName}
              onChange={(e) =>
                setCreateForm({ ...createForm, firstName: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              value={createForm.lastName}
              onChange={(e) =>
                setCreateForm({ ...createForm, lastName: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="Last name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={createForm.email}
              onChange={(e) =>
                setCreateForm({ ...createForm, email: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="employee@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              value={createForm.phone}
              onChange={(e) =>
                setCreateForm({ ...createForm, phone: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="+1 555 000 0000"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              value={createForm.designation}
              onChange={(e) =>
                setCreateForm({ ...createForm, designation: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. Professor, HOD"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Role Group <span className="text-red-500">*</span>
            </label>
            <select
              value={createForm.collegeCustomRoleGroupId}
              onChange={(e) =>
                setCreateForm({
                  ...createForm,
                  collegeCustomRoleGroupId: e.target.value,
                })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">Select Role Group</option>
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
              type="date"
              value={createForm.entry}
              onChange={(e) =>
                setCreateForm({ ...createForm, entry: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            />
          </div>
        </div>
      </Modal>

      {/* ── Edit Modal ── */}
      <Modal
        open={!!editItem}
        onCancel={() => setEditItem(null)}
        onOk={handleEdit}
        okText={submitting ? "Saving..." : "Update"}
        okButtonProps={{
          disabled: submitting,
          className: "bg-primary text-white",
        }}
        title="Edit Employee"
        width={520}
      >
        {editItem && (
          <div className="space-y-4 text-sm">
            {/* Read-only identity row */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <UserPlus size={16} className="text-gray-400 shrink-0" />
              <div>
                <p className="font-medium text-gray-800">{editItem.name}</p>
                <p className="text-xs text-gray-500">{editItem.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  value={editForm.designation}
                  onChange={(e) =>
                    setEditForm({ ...editForm, designation: e.target.value })
                  }
                  className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
                  placeholder="e.g. Professor"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Role Group <span className="text-red-500">*</span>
                </label>
                <select
                  value={editForm.collegeCustomRoleGroupId}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      collegeCustomRoleGroupId: e.target.value,
                    })
                  }
                  className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
                >
                  <option value="">Select Role Group</option>
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
                  type="date"
                  value={editForm.entry}
                  onChange={(e) =>
                    setEditForm({ ...editForm, entry: e.target.value })
                  }
                  className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Associated Module
                </label>
                <select
                  value={editForm.associatedModuleId}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      associatedModuleId: e.target.value,
                    })
                  }
                  className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
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
          </div>
        )}
      </Modal>
    </>
  );
}

function Detail({ label, value }: { label: string; value?: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">
        {label}
      </p>
      <p className="text-sm text-gray-800">{value ?? "—"}</p>
    </div>
  );
}
