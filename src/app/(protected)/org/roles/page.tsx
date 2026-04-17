/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useOrg, usePermission } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { Shield, Settings, CheckCircle2 } from "lucide-react";

interface RoleGroup {
  id: string;
  name: string;
  description?: string;
  isAdmin?: boolean;
  collegeId: string;
}

interface PlanModule {
  id: string;
  code: string;
  name: string;
}

interface PermRow {
  planModuleId: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const PERM_COLS = [
  { key: "canView", label: "View" },
  { key: "canCreate", label: "Create" },
  { key: "canEdit", label: "Edit" },
  // { key: "canDelete", label: "Delete" },
] as const;

function validate(f: typeof EMPTY_FORM) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "Role group name must be at least 2 characters.";
  return null;
}

const EMPTY_FORM = { name: "", description: "" };

export default function RoleGroupsPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const { canCreate, canEdit } = usePermission("roles");
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<RoleGroup | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  /* Permission matrix modal */
  const [permTarget, setPermTarget] = useState<RoleGroup | null>(null);
  const [permRows, setPermRows] = useState<PermRow[]>([]);
  const [savingPerms, setSavingPerms] = useState(false);

  const { data: roleGroupsData, refetch: refetchGroups } = useFetch(
    collegeId
      ? `/college-custom-role-groups?conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId },
  ) as any;
  const roleGroups: RoleGroup[] =
    roleGroupsData?.rows ||
    (Array.isArray(roleGroupsData) ? roleGroupsData : []);

  const { data: planModulesData } = useFetch("/plan-modules?limit=999999", {
    now: true,
  }) as any;
  const planModules: PlanModule[] = Array.isArray(planModulesData)
    ? planModulesData
    : (planModulesData?.rows ?? []);

  /* Load existing permissions when a role group is opened for editing */
  const { data: existingPermsData, refetch: refetchPerms } = useFetch(
    permTarget?.id
      ? `/college-custom-role-permissions?roleGroupId=${permTarget.id}&limit=999999`
      : "",
    { now: !!permTarget?.id },
  ) as any;

  useEffect(() => {
    if (!permTarget) return;
    const existing: any[] =
      existingPermsData?.rows ||
      (Array.isArray(existingPermsData) ? existingPermsData : []);
    const existingMap: Record<string, any> = Object.fromEntries(
      existing.map((p: any) => [p.planModuleId, p]),
    );
    const rows: PermRow[] = planModules.map((pm) => ({
      planModuleId: pm.id,
      canView: existingMap[pm.id]?.canView ?? false,
      canCreate: existingMap[pm.id]?.canCreate ?? false,
      canEdit: existingMap[pm.id]?.canEdit ?? false,
      canDelete: existingMap[pm.id]?.canDelete ?? false,
    }));
    setTimeout(() => {
      setPermRows(rows);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingPermsData, permTarget?.id]);

  useEffect(() => {
    if (editItem) {
      setTimeout(() => {
        setFormData({
          name: editItem.name,
          description: editItem.description || "",
        });
      }, 0);
    } else if (createOpen) {
      setTimeout(() => {
        setFormData(EMPTY_FORM);
      }, 0);
    }
  }, [editItem, createOpen]);

  const handlePermToggle = (modId: string, col: keyof PermRow) => {
    setPermRows((prev) =>
      prev.map((row) =>
        row.planModuleId === modId
          ? { ...row, [col]: !row[col as keyof PermRow] }
          : row,
      ),
    );
  };

  const handleSavePerms = async () => {
    if (!permTarget) return;
    setSavingPerms(true);
    try {
      await fetchApi("/college-custom-role-permissions/batch", {
        method: "POST",
        body: { roleGroupId: permTarget.id, permissions: permRows },
      });
      toast.success("Permissions saved");
      setPermTarget(null);
      await refetchPerms();
    } catch {
      toast.error("Failed to save permissions");
    } finally {
      setSavingPerms(false);
    }
  };

  const handleSaveGroup = async () => {
    if (!collegeId) return toast.error("College not found");
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/college-custom-role-groups/${editItem.id}`, {
          method: "PUT",
          body: formData,
        });
        toast.success("Role group updated");
        setEditItem(null);
      } else {
        await fetchApi("/college-custom-role-groups", {
          method: "POST",
          body: { ...formData, collegeId },
        });
        toast.success("Role group created");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
      await refetchGroups();
    } catch {
      toast.error("Failed to save role group");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Role Groups</h1>
        {canCreate && (
          <button
            onClick={() => setCreateOpen(true)}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition"
          >
            + Create Role Group
          </button>
        )}
      </div>

      {roleGroups.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">
          No role groups found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleGroups.map(
            (rg) =>
              !rg.isAdmin && (
                <div
                  key={rg.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 space-y-3 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={18} className="text-primary" />
                      <span className="font-medium text-gray-800">
                        {rg.name}
                      </span>
                    </div>
                  </div>
                  {rg.description && (
                    <p className="text-xs text-gray-500">{rg.description}</p>
                  )}
                  <div className="flex items-center gap-2 pt-1">
                    {canEdit && (
                      <button
                        onClick={() => setPermTarget(rg)}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <Settings size={13} /> Manage Permissions
                      </button>
                    )}
                    {canEdit && (
                      <button
                        onClick={() => setEditItem(rg)}
                        className="text-xs text-gray-500 hover:text-gray-700 hover:underline ml-auto"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={createOpen || !!editItem}
        onCancel={() => {
          setCreateOpen(false);
          setEditItem(null);
        }}
        onOk={handleSaveGroup}
        okText={submitting ? "Saving..." : editItem ? "Update" : "Create"}
        okButtonProps={{
          disabled: submitting,
          className: "bg-primary text-white",
        }}
        title={editItem ? "Edit Role Group" : "Create Role Group"}
        width={500}
      >
        <div className="flex flex-col gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. Teachers, Accountants"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              rows={3}
              placeholder="Optional description"
            />
          </div>
        </div>
      </Modal>

      {/* Permission Matrix Modal */}
      <Modal
        open={!!permTarget}
        onCancel={() => setPermTarget(null)}
        onOk={handleSavePerms}
        okText={savingPerms ? "Saving..." : "Save Permissions"}
        okButtonProps={{
          disabled: savingPerms,
          className: "bg-primary text-white",
        }}
        title={`Permissions — ${permTarget?.name}`}
        width={700}
      >
        {permTarget && (
          <div className="py-2">
            {planModules.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">
                No system modules found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">
                        Module
                      </th>
                      {PERM_COLS.map((c) => (
                        <th
                          key={c.key}
                          className="text-center py-2 px-3 font-medium text-gray-700 w-20"
                        >
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {planModules.map((pm) => {
                      const row = permRows.find(
                        (r) => r.planModuleId === pm.id,
                      );
                      return (
                        <tr key={pm.id} className="border-t">
                          <td className="py-2.5 px-3 text-gray-700 capitalize">
                            {pm.name}
                          </td>
                          {PERM_COLS.map((c) => (
                            <td key={c.key} className="text-center py-2.5 px-3">
                              <input
                                type="checkbox"
                                checked={row?.[c.key] ?? false}
                                onChange={() => handlePermToggle(pm.id, c.key)}
                                className="w-4 h-4 accent-primary cursor-pointer"
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
