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
    return "Group name must be at least 2 characters.";
  if (!f.batchId) return "Please select a batch.";
  if (f.year && (isNaN(Number(f.year)) || Number(f.year) < 2000 || Number(f.year) > 2100))
    return "Year must be between 2000 and 2100.";
  return null;
}

const EMPTY_FORM = { name: "", batchId: "", year: "", description: "" };

export default function GroupsPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
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
  const programs = programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id,name,programId&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const allBatches = batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const filteredBatches = selectedProgramId
    ? allBatches.filter((b: any) => b.programId === selectedProgramId)
    : allBatches;
  const batchMap: Record<string, string> = Object.fromEntries(allBatches.map((b: any) => [b.id, b.name]));
  const batchIds = filteredBatches.map((b: any) => b.id);

  /* data url — show all groups or filter */
  const queryBatchIds = selectedBatchId
    ? [selectedBatchId]
    : batchIds.length
    ? batchIds
    : null;

  const dataUrl = queryBatchIds
    ? `/groups?conditions=${JSON.stringify({ batchId: queryBatchIds })}`
    : "";

  useEffect(() => {
    setSelectedBatchId(""); // reset batch filter when program changes
  }, [selectedProgramId]);

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name || "",
        batchId: editItem.batchId || "",
        year: editItem.year?.toString() || "",
        description: editItem.description || "",
      });
    } else if (createOpen) {
      setFormData({ ...EMPTY_FORM, batchId: selectedBatchId });
    }
  }, [editItem, createOpen, selectedBatchId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/groups/${editItem.id}`, {
          method: "PUT",
          body: { ...formData, year: formData.year ? Number(formData.year) : undefined },
        });
        toast.success("Group updated");
        setEditItem(null);
      } else {
        await fetchApi("/groups", {
          method: "POST",
          body: { ...formData, year: formData.year ? Number(formData.year) : undefined },
        });
        toast.success("Group created");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to save group");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  const filters = (
    <div className="flex items-center gap-2">
      <select value={selectedProgramId} onChange={(e) => setSelectedProgramId(e.target.value)}
        className="py-2 px-3 text-sm rounded-md border border-gray-200 min-w-[150px]">
        <option value="">All Programs</option>
        {programs.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <select value={selectedBatchId} onChange={(e) => setSelectedBatchId(e.target.value)}
        className="py-2 px-3 text-sm rounded-md border border-gray-200 min-w-[140px]">
        <option value="">All Batches</option>
        {filteredBatches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>
    </div>
  );

  return (
    <>
      {dataUrl ? (
        <Table
          key={tableKey}
          title="Groups"
          dataApiUrl={dataUrl}
          headers={["Name", "Batch", "Year", "Description"]}
          dataKeys={["name", "batchName", "year", "description"]}
          searchKeys={["name", "batchName"]}
          onRowClick={(item) => setViewItem(item)}
          onCreateClick={() => setCreateOpen(true)}
          extraFilters={filters}
          dataTransformer={(data) =>
            data.map((item: any) => ({ ...item, batchName: batchMap[item.batchId] || item.batchId }))
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">{filters}</div>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No batches found</p>
            <p className="text-sm mt-1">Create programs and batches first to manage groups.</p>
          </div>
        </div>
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
        title="Group Details"
        width={500}
      >
        {viewItem && (
          <div className="grid grid-cols-2 gap-4 py-2 text-sm">
            <Detail label="Name" value={viewItem.name} />
            <Detail label="Batch" value={viewItem.batchName || batchMap[viewItem.batchId]} />
            <Detail label="Year" value={viewItem.year} />
            <Detail label="Description" value={viewItem.description} />
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
        title={editItem ? "Edit Group" : "Create Group"}
        width={520}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">Group Name <span className="text-red-500">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. Group A" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Batch <span className="text-red-500">*</span></label>
            <select name="batchId" value={formData.batchId} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full">
              <option value="">Select Batch</option>
              {allBatches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input name="year" type="number" min="2000" max="2100" value={formData.year} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. 2026" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" rows={2} />
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
