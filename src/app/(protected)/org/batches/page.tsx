"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
    return "Batch name must be at least 2 characters.";
  if (!f.programId) return "Please select a program.";
  if (f.year && (isNaN(Number(f.year)) || Number(f.year) < 2000 || Number(f.year) > 2100))
    return "Year must be between 2000 and 2100.";
  return null;
}

const EMPTY_FORM = { name: "", programId: "", year: "", description: "" };

/* ─── Group quick-create form ──────────────────────────── */
function validate_group(f: typeof EMPTY_GROUP_FORM) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "Group name must be at least 2 characters.";
  if (!f.batchId) return "Batch is required.";
  if (f.year && (isNaN(Number(f.year)) || Number(f.year) < 2000 || Number(f.year) > 2100))
    return "Year must be between 2000 and 2100.";
  return null;
}
const EMPTY_GROUP_FORM = { name: "", batchId: "", year: "", description: "" };

export default function BatchesPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const searchParams = useSearchParams();
  const [selectedProgramId, setSelectedProgramId] = useState(searchParams.get("programId") || "");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  /* group quick-create */
  const [groupCreateOpen, setGroupCreateOpen] = useState(false);
  const [groupFormData, setGroupFormData] = useState(EMPTY_GROUP_FORM);
  const [groupSubmitting, setGroupSubmitting] = useState(false);

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs = programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programMap: Record<string, string> = Object.fromEntries(programs.map((p: any) => [p.id, p.name]));
  const programIds = programs.map((p: any) => p.id);

  const dataUrl = selectedProgramId
    ? `/batches?conditions=${JSON.stringify({ programId: selectedProgramId })}`
    : programIds.length
    ? `/batches?conditions=${JSON.stringify({ programId: programIds })}`
    : "";

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name || "",
        programId: editItem.programId || "",
        year: editItem.year?.toString() || "",
        description: editItem.description || "",
      });
    } else if (createOpen) {
      setFormData({ ...EMPTY_FORM, programId: selectedProgramId });
    }
  }, [editItem, createOpen, selectedProgramId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/batches/${editItem.id}`, {
          method: "PUT",
          body: { ...formData, year: formData.year ? Number(formData.year) : undefined },
        });
        toast.success("Batch updated");
        setEditItem(null);
      } else {
        await fetchApi("/batches", {
          method: "POST",
          body: { ...formData, year: formData.year ? Number(formData.year) : undefined },
        });
        toast.success("Batch created");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to save batch");
    } finally {
      setSubmitting(false);
    }
  };

  const openGroupCreate = (batch: any) => {
    setGroupFormData({ ...EMPTY_GROUP_FORM, batchId: batch.id });
    setGroupCreateOpen(true);
    setViewItem(null);
  };

  const handleGroupSave = async () => {
    const err = validate_group(groupFormData);
    if (err) return toast.error(err);
    setGroupSubmitting(true);
    try {
      await fetchApi("/groups", {
        method: "POST",
        body: { ...groupFormData, year: groupFormData.year ? Number(groupFormData.year) : undefined },
      });
      toast.success("Group created");
      setGroupCreateOpen(false);
      setGroupFormData(EMPTY_GROUP_FORM);
    } catch {
      toast.error("Failed to create group");
    } finally {
      setGroupSubmitting(false);
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
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  );

  return (
    <>
      {dataUrl && (
        <Table
          key={tableKey}
          title="Batches"
          dataApiUrl={dataUrl}
          headers={["Name", "Program", "Year", "Description"]}
          dataKeys={["name", "programName", "year", "description"]}
          searchKeys={["name", "year", "programName"]}
          onRowClick={(item) => setViewItem(item)}
          onCreateClick={() => setCreateOpen(true)}
          extraFilters={programFilter}
          dataTransformer={(data) =>
            data.map((item: any) => ({ ...item, programName: programMap[item.programId] || item.programId }))
          }
        />
      )}

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button key="group" onClick={() => openGroupCreate(viewItem)}
            className="border border-gray-300 text-gray-600 text-sm py-2 px-4 rounded-md hover:bg-gray-50 transition mr-2">
            + Create Group
          </button>,
          <button key="edit" onClick={() => { setEditItem(viewItem); setViewItem(null); }}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition">
            Edit
          </button>,
        ]}
        title="Batch Details"
        width={540}
      >
        {viewItem && (
          <div className="grid grid-cols-2 gap-4 py-2 text-sm">
            <Detail label="Name" value={viewItem.name} />
            <Detail label="Program" value={viewItem.programName} />
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
        title={editItem ? "Edit Batch" : "Create Batch"}
        width={560}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. Fall 2026" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Program <span className="text-red-500">*</span></label>
            <select name="programId" value={formData.programId} onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full">
              <option value="">Select Program</option>
              {programs.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
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

      {/* Quick Group Create Modal */}
      <Modal
        open={groupCreateOpen}
        onCancel={() => setGroupCreateOpen(false)}
        onOk={handleGroupSave}
        okText={groupSubmitting ? "Creating..." : "Create Group"}
        okButtonProps={{ disabled: groupSubmitting, className: "bg-primary text-white" }}
        title="Create Group for Batch"
        width={520}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">Group Name <span className="text-red-500">*</span></label>
            <input name="name" value={groupFormData.name}
              onChange={(e) => setGroupFormData({ ...groupFormData, name: e.target.value })}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. Group A" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input name="year" type="number" min="2000" max="2100" value={groupFormData.year}
              onChange={(e) => setGroupFormData({ ...groupFormData, year: e.target.value })}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="e.g. 2026" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea value={groupFormData.description}
              onChange={(e) => setGroupFormData({ ...groupFormData, description: e.target.value })}
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
