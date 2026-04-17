"use client";

import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";

/* ─── validation ─────────────────────────────────────── */
function validate(f: typeof EMPTY_FORM) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "Module name must be at least 2 characters.";
  if (!f.programId) return "Please select a program.";
  if (!f.code.trim()) return "Module code is required.";
  if (!/^[A-Za-z0-9 _-]+$/.test(f.code.trim()))
    return "Code may only contain letters, numbers, spaces, hyphens or underscores.";
  if (f.credits && (isNaN(Number(f.credits)) || Number(f.credits) < 0))
    return "Credits must be a non-negative number.";
  return null;
}

const EMPTY_FORM = {
  name: "",
  programId: "",
  code: "",
  description: "",
  credits: "",
};

export default function ModulesPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [selectedProgramId, setSelectedProgramId] = useState("");

  /* modals */
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);

  const programMap: Record<string, string> = Object.fromEntries(
    programs.map((p: any) => [p.id, p.name])
  );

  const dataUrl = selectedProgramId
    ? `/modules?conditions=${JSON.stringify({ programId: selectedProgramId })}`
    : collegeId
    ? `/modules?conditions=${JSON.stringify({ programId: programs.map((p: any) => p.id) })}`
    : "";

  /* sync form when editing */
  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name || "",
        programId: editItem.programId || "",
        code: editItem.code || "",
        description: editItem.description || "",
        credits: editItem.credits?.toString() || "",
      });
    } else if (createOpen) {
      setFormData({ ...EMPTY_FORM, programId: selectedProgramId });
    }
  }, [editItem, createOpen, selectedProgramId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/modules/${editItem.id}`, {
          method: "PUT",
          body: { ...formData, credits: formData.credits ? Number(formData.credits) : undefined },
        });
        toast.success("Module updated successfully");
        setEditItem(null);
      } else {
        await fetchApi("/modules", {
          method: "POST",
          body: { ...formData, credits: formData.credits ? Number(formData.credits) : undefined },
        });
        toast.success("Module created successfully");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to save module");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  const programFilter = (
    <select
      value={selectedProgramId}
      onChange={(e) => setSelectedProgramId(e.target.value)}
      className="py-2 px-4 text-sm rounded-md border border-gray-200 min-w-[180px]"
    >
      <option value="">All Programs</option>
      {programs.map((p: any) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );

  return (
    <>
      {dataUrl && (
        <Table
          key={tableKey}
          title="Modules"
          dataApiUrl={dataUrl}
          headers={["Name", "Code", "Program", "Credits", "Description"]}
          dataKeys={["name", "code", "programId", "credits", "description"]}
          searchKeys={["name", "code"]}
          onRowClick={(item) => setViewItem({ ...item, programName: programMap[item.programId] })}
          onCreateClick={() => setCreateOpen(true)}
          extraFilters={programFilter}
          dataTransformer={(data) =>
            data.map((item: any) => ({
              ...item,
              programId: programMap[item.programId] || item.programId,
            }))
          }
        />
      )}

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button key="edit" onClick={() => { setEditItem(viewItem); setViewItem(null); }}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition">
            Edit
          </button>,
        ]}
        title="Module Details"
        width={560}
      >
        {viewItem && (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Name" value={viewItem.name} />
              <Detail label="Code" value={viewItem.code} />
              <Detail label="Program" value={viewItem.programName || programMap[viewItem.programId]} />
              <Detail label="Credits" value={viewItem.credits} />
            </div>
            {viewItem.description && (
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Description</p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3">{viewItem.description}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Create / Edit Modal */}
      <Modal
        open={createOpen || !!editItem}
        onCancel={() => { setCreateOpen(false); setEditItem(null); }}
        onOk={handleSave}
        okText={submitting ? "Saving..." : editItem ? "Update" : "Create"}
        okButtonProps={{ disabled: submitting, className: "bg-primary text-white" }}
        title={editItem ? "Edit Module" : "Create Module"}
        width={600}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. Data Structures" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Code <span className="text-red-500">*</span></label>
            <input name="code" value={formData.code} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. CS-201" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Program <span className="text-red-500">*</span></label>
            <select name="programId" value={formData.programId} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full">
              <option value="">Select Program</option>
              {programs.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Credits</label>
            <input name="credits" type="number" min="0" value={formData.credits} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. 3" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" rows={3}
              placeholder="Module description" />
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
