"use client";

import { useState, useEffect, useMemo } from "react";
import Table from "@/components/ui/Table";
import { useOrg, usePermission } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal, Select } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

const REMARK_TYPES = [
  { value: "academic", label: "Academic" },
  { value: "behavioral", label: "Behavioral" },
  { value: "attendance", label: "Attendance" },
  { value: "general", label: "General" },
];

function validate(f: typeof EMPTY_FORM) {
  if (!f.studentId) return "Please select a student.";
  if (!f.remarkType) return "Please select a remark type.";
  if (!f.subject.trim() || f.subject.trim().length < 2)
    return "Subject must be at least 2 characters.";
  if (!f.message.trim() || f.message.trim().length < 5)
    return "Message must be at least 5 characters.";
  return null;
}

const EMPTY_FORM = {
  studentId: "",
  remarkType: "",
  subject: "",
  message: "",
};

export default function RemarksPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const { canCreate, canEdit } = usePermission("remarks");
  const { userData } = useAuth();
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  /* Hierarchical student load: programs → batches → groups → students */
  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs: any[] =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id&limit=200&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const batchIds: string[] = (
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : [])
  ).map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length
      ? `/groups?fields=id&limit=400&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groupIds: string[] = (
    groupsData?.rows || (Array.isArray(groupsData) ? groupsData : [])
  ).map((g: any) => g.id);

  const { data: studentsData } = useFetch(
    groupIds.length
      ? `/students-with-info?${groupIds.map((id) => `groupIds=${id}`).join("&")}`
      : "",
    { now: groupIds.length > 0 }
  ) as any;
  const students: any[] = Array.isArray(studentsData)
    ? studentsData
    : (studentsData?.rows ?? []);

  /* Map studentDetailId → display name for table rendering */
  const studentMap: Record<string, string> = useMemo(
    () => Object.fromEntries(students.map((s: any) => [s.id, s.name || `${s.firstName} ${s.lastName}`.trim()])),
    [students]
  );

  const studentOptions = students.map((s: any) => ({
    value: s.id,
    label: s.name || `${s.firstName} ${s.lastName}`.trim() || s.email,
  }));

  useEffect(() => {
    if (editItem) {
      setFormData({
        studentId: editItem.studentId || "",
        remarkType: editItem.remarkType || "",
        subject: editItem.subject || "",
        message: editItem.message || "",
      });
    } else if (createOpen) {
      setFormData(EMPTY_FORM);
    }
  }, [editItem, createOpen]);

  const handleSave = async () => {
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/student-remarks/${editItem.id}`, {
          method: "PUT",
          body: { ...formData, teacherId: userData?.id },
        });
        toast.success("Remark updated");
        setEditItem(null);
      } else {
        await fetchApi("/student-remarks", {
          method: "POST",
          body: { ...formData, teacherId: userData?.id },
        });
        toast.success("Remark created");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to save remark");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <>
      <Table
        key={tableKey}
        title="Student Remarks"
        dataApiUrl="/student-remarks"
        headers={["Student", "Remark Type", "Subject", "Message"]}
        dataKeys={["studentName", "remarkType", "subject", "message"]}
        searchKeys={["subject", "remarkType"]}
          onRowClick={(item) => setViewItem(item)}
          onCreateClick={canCreate ? () => setCreateOpen(true) : undefined}
        dataTransformer={(data) =>
          data.map((item: any) => ({
            ...item,
            studentName: studentMap[item.studentId] || item.studentId,
          }))
        }
      />

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          canEdit && (
            <button
              key="edit"
              onClick={() => { setEditItem(viewItem); setViewItem(null); }}
              className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition"
            >
              Edit
            </button>
          ),
        ].filter(Boolean)}
        title="Remark Details"
        width={560}
      >
        {viewItem && (
          <div className="space-y-4 py-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">Student</p>
                <p className="text-sm text-gray-800">{studentMap[viewItem.studentId] || viewItem.studentId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">Type</p>
                <p className="text-sm text-gray-800 capitalize">{viewItem.remarkType}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">Subject</p>
                <p className="text-sm text-gray-800">{viewItem.subject}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Message</p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3">{viewItem.message}</p>
            </div>
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
        title={editItem ? "Edit Remark" : "Add Remark"}
        width={600}
      >
        <div className="flex flex-col gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">
              Student <span className="text-red-500">*</span>
            </label>
            <Select
              showSearch
              className="w-full"
              placeholder="Search student by name..."
              value={formData.studentId || undefined}
              onChange={(val) => setFormData({ ...formData, studentId: val })}
              options={studentOptions}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              size="large"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Remark Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.remarkType}
              onChange={(e) => setFormData({ ...formData, remarkType: e.target.value })}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">Select Type</option>
              {REMARK_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="Remark subject"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              rows={4}
              placeholder="Remark message"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
