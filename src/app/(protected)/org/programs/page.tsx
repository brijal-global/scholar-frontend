"use client";

import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";
import { Modal } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/* ─── validation ─────────────────────────────────────── */
function validate(f: typeof EMPTY_FORM) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "Program name must be at least 2 characters.";
  if (!f.code.trim()) return "Code is required.";
  if (!/^[A-Za-z0-9 _-]+$/.test(f.code.trim()))
    return "Code may only contain letters, numbers, spaces, hyphens or underscores.";
  if (!f.level) return "Please select a level.";
  if (f.totalCredits && (isNaN(Number(f.totalCredits)) || Number(f.totalCredits) < 0))
    return "Total credits must be a non-negative number.";
  return null;
}

const EMPTY_FORM = {
  name: "",
  code: "",
  level: "",
  universityName: "",
  totalCredits: "",
  description: "",
};

const LEVELS = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
];

export default function ProgramsPage() {
  const router = useRouter();
  const { collegeId, loading } = useOrg();
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name || "",
        code: editItem.code || "",
        level: editItem.level || "",
        universityName: editItem.universityName || "",
        totalCredits: editItem.totalCredits?.toString() || "",
        description: editItem.description || "",
      });
    } else if (createOpen) {
      setFormData(EMPTY_FORM);
    }
  }, [editItem, createOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!collegeId) return toast.error("College not found");
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/programs/${editItem.id}`, {
          method: "PUT",
          body: { ...formData, totalCredits: formData.totalCredits ? Number(formData.totalCredits) : undefined },
        });
        toast.success("Program updated successfully");
        setEditItem(null);
      } else {
        await fetchApi("/programs", {
          method: "POST",
          body: { ...formData, collegeId, totalCredits: formData.totalCredits ? Number(formData.totalCredits) : undefined },
        });
        toast.success("Program created successfully");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to save program");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  const conditions = JSON.stringify({ collegeId });

  return (
    <>
      <Table
        key={tableKey}
        title="Programs"
        dataApiUrl={`/programs?conditions=${conditions}`}
        headers={["Name", "Code", "Level", "University", "Credits"]}
        dataKeys={["name", "code", "level", "universityName", "totalCredits"]}
        searchKeys={["name", "code", "universityName"]}
        onRowClick={(item) => setViewItem(item)}
        onCreateClick={() => setCreateOpen(true)}
      />

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button key="batch" onClick={() => {
            setViewItem(null);
            router.push(`/org/batches?programId=${viewItem?.id}`);
          }}
            className="border border-gray-300 text-gray-600 text-sm py-2 px-4 rounded-md hover:bg-gray-50 transition mr-2">
            + Add Batch
          </button>,
          <button key="module" onClick={() => {
            setViewItem(null);
            router.push(`/org/courses?programId=${viewItem?.id}`);
          }}
            className="border border-gray-300 text-gray-600 text-sm py-2 px-4 rounded-md hover:bg-gray-50 transition mr-2">
            + Add Module
          </button>,
          <button key="edit" onClick={() => { setEditItem(viewItem); setViewItem(null); }}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition">
            Edit
          </button>,
        ]}
        title="Program Details"
        width={600}
      >
        {viewItem && (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Name" value={viewItem.name} />
              <Detail label="Code" value={viewItem.code} />
              <Detail label="Level" value={viewItem.level} />
              <Detail label="University" value={viewItem.universityName} />
              <Detail label="Total Credits" value={viewItem.totalCredits} />
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
        title={editItem ? "Edit Program" : "Create Program"}
        width={640}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. Computer Science" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Code <span className="text-red-500">*</span></label>
            <input name="code" value={formData.code} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. CS-101" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Level <span className="text-red-500">*</span></label>
            <select name="level" value={formData.level} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full">
              <option value="">Select Level</option>
              {LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">University Name</label>
            <input name="universityName" value={formData.universityName} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="Affiliated university" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Total Credits</label>
            <input name="totalCredits" type="number" min="0" value={formData.totalCredits} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. 120" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" rows={3}
              placeholder="Program description" />
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
      <p className="text-sm text-gray-800 capitalize">{value ?? "—"}</p>
    </div>
  );
}
