/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { useOrg, usePermission } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal, Tabs } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";

/* ─── validation ─────────────────────────────────────── */
function validate(f: typeof EMPTY_FORM) {
  if (!f.name.trim() || f.name.trim().length < 2)
    return "Exam name must be at least 2 characters.";
  if (!f.type) return "Please select an exam type.";
  if (!f.programId) return "Please select a program.";
  return null;
}

const EXAM_TYPES = [
  { value: "midterm", label: "Midterm" },
  { value: "final", label: "Final" },
  { value: "quiz", label: "Quiz" },
  { value: "assignment", label: "Assignment" },
];

const EMPTY_FORM = { name: "", type: "", programId: "", description: "" };

/* ─── Enter Marks sub-component ─────────────────────── */
function EnterMarksView({ exam }: { exam: any }) {
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedExamModuleId, setSelectedExamModuleId] = useState("");
  // keyed by studentDetails.id → obtainedMarks string
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  /* exam modules for this exam */
  const { data: examModulesRaw } = useFetch(
    exam?.id
      ? `/exam-modules?conditions=${JSON.stringify({ examId: exam.id })}&limit=100`
      : "",
    { now: !!exam?.id },
  ) as any;
  const examModules: any[] =
    examModulesRaw?.rows ||
    (Array.isArray(examModulesRaw) ? examModulesRaw : []);

  /* modules for the program (to look up names) */
  const { data: programModulesRaw } = useFetch(
    exam?.programId
      ? `/modules?limit=100&conditions=${JSON.stringify({ programId: exam.programId })}`
      : "",
    { now: !!exam?.programId },
  ) as any;
  const programModules: any[] =
    programModulesRaw?.rows ||
    (Array.isArray(programModulesRaw) ? programModulesRaw : []);
  const moduleNameMap: Record<string, string> = Object.fromEntries(
    programModules.map((m: any) => [m.id, `${m.name} (${m.code})`]),
  );

  /* groups for the exam's program */
  const { data: batchesRaw } = useFetch(
    exam?.programId
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: exam.programId })}`
      : "",
    { now: !!exam?.programId },
  ) as any;
  const batches: any[] =
    batchesRaw?.rows || (Array.isArray(batchesRaw) ? batchesRaw : []);
  const batchIds = batches.map((b: any) => b.id);

  const { data: groupsRaw } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 },
  ) as any;
  const groups: any[] =
    groupsRaw?.rows || (Array.isArray(groupsRaw) ? groupsRaw : []);

  /* students in selected group (with names via students-with-info) */
  const { data: studentsRaw, loading: studentsLoading } = useFetch(
    selectedGroupId ? `/students-with-info?groupId=${selectedGroupId}` : "",
    { now: !!selectedGroupId },
  ) as any;
  const students: any[] = Array.isArray(studentsRaw)
    ? studentsRaw
    : (studentsRaw?.rows ?? []);

  /* Existing marks for selected exam module — to pre-populate */
  const { data: existingMarksRaw, refetch: refetchMarks } = useFetch(
    selectedExamModuleId
      ? `/module-marks?conditions=${JSON.stringify({ examModuleId: selectedExamModuleId })}&limit=500`
      : "",
    { now: !!selectedExamModuleId },
  ) as any;
  const existingMarks: any[] =
    existingMarksRaw?.rows || (Array.isArray(existingMarksRaw) ? existingMarksRaw : []);

  const selectedExamModule = examModules.find(
    (em: any) => em.id === selectedExamModuleId,
  );

  /* Pre-populate marks from existing records when examModule or students change */
  useEffect(() => {
    if (!existingMarks.length) {
      setMarks({});
      return;
    }
    const populated: Record<string, string> = {};
    existingMarks.forEach((m: any) => {
      populated[m.studentId] = String(m.obtainedMarks ?? "");
    });
    setMarks(populated);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExamModuleId, existingMarksRaw]);

  const handleMarkChange = (studentId: string, value: string) => {
    if (value !== "" && selectedExamModule) {
      const num = Number(value);
      if (num < 0) return;
      if (num > Number(selectedExamModule.totalMarks)) return;
    }
    setMarks((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmitMarks = async () => {
    if (!selectedExamModuleId)
      return toast.error("Please select an exam module");
    if (!students.length) return toast.error("No students in this group");
    const entries = Object.entries(marks).filter(([, v]) => v !== "");
    if (!entries.length)
      return toast.error("Enter marks for at least one student");

    // Build a map of existing marks by studentId for upsert logic
    const existingMap: Record<string, any> = Object.fromEntries(
      existingMarks.map((m: any) => [m.studentId, m]),
    );

    setSubmitting(true);
    try {
      await Promise.all(
        entries.map(([studentId, obtainedMarks]) => {
          const existing = existingMap[studentId];
          if (existing?.id) {
            return fetchApi(`/module-marks/${existing.id}`, {
              method: "PUT",
              body: { obtainedMarks: Number(obtainedMarks) },
            });
          }
          return fetchApi("/module-marks", {
            method: "POST",
            body: {
              studentId,
              examModuleId: selectedExamModuleId,
              obtainedMarks: Number(obtainedMarks),
            },
          });
        }),
      );
      toast.success(`Marks saved for ${entries.length} student(s)`);
      await refetchMarks();
    } catch {
      toast.error("Failed to save marks");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 py-2">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block mb-1 font-medium">Select Exam Module</label>
          <select
            value={selectedExamModuleId}
            onChange={(e) => setSelectedExamModuleId(e.target.value)}
            className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
          >
            <option value="">— Select Module —</option>
            {examModules.map((em: any) => (
              <option key={em.id} value={em.id}>
                {moduleNameMap[em.moduleId] || em.moduleId} — {em.examType} (/{em.totalMarks})
              </option>
            ))}
          </select>
          {examModules.length === 0 && (
            <p className="text-xs text-amber-600 mt-1">
              No exam modules found. Add modules via the &quot;Exam Modules&quot; tab first.
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Select Group</label>
          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
          >
            <option value="">— Select Group —</option>
            {groups.map((g: any) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedGroupId && selectedExamModuleId && (
        <>
          {studentsLoading ? (
            <Loader />
          ) : students.length === 0 ? (
            <p className="text-gray-500 text-sm">No students in this group.</p>
          ) : (
            <div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-4 font-medium">Student Name</th>
                      <th className="text-left py-2 px-4 font-medium">
                        Marks {selectedExamModule ? `(out of ${selectedExamModule.totalMarks})` : ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student: any) => (
                      <tr key={student.id} className="border-t">
                        <td className="py-2 px-4 text-gray-700">
                          {student.name ||
                            `${student.firstName} ${student.lastName}`.trim() ||
                            student.userId}
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="number"
                            min="0"
                            max={selectedExamModule?.totalMarks || undefined}
                            value={marks[student.id] ?? ""}
                            onChange={(e) => handleMarkChange(student.id, e.target.value)}
                            className="py-1.5 px-3 border border-gray-200 rounded-md w-28 text-sm"
                            placeholder="—"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmitMarks}
                  disabled={submitting}
                  className="bg-primary text-white text-sm py-2 px-5 rounded-md hover:bg-primary-dark transition disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Save Marks"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Exam Modules manager ───────────────────────────── */
function ExamModulesManager({ exam }: { exam: any }) {
  const [moduleId, setModuleId] = useState("");
  const [examType, setExamType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: programModulesRaw } = useFetch(
    exam?.programId
      ? `/modules?limit=100&conditions=${JSON.stringify({ programId: exam.programId })}`
      : "",
  ) as any;
  const programModules: any[] =
    programModulesRaw?.rows ||
    (Array.isArray(programModulesRaw) ? programModulesRaw : []);
  const moduleNameMap: Record<string, string> = Object.fromEntries(
    programModules.map((m: any) => [m.id, `${m.name} (${m.code})`]),
  );

  const { data: examModulesRaw, refetch } = useFetch(
    exam?.id
      ? `/exam-modules?conditions=${JSON.stringify({ examId: exam.id })}&limit=100`
      : "",
  ) as any;
  const examModules: any[] =
    examModulesRaw?.rows ||
    (Array.isArray(examModulesRaw) ? examModulesRaw : []);

  const handleAdd = async () => {
    if (!moduleId) return toast.error("Select a module");
    if (!examType) return toast.error("Select exam type");
    if (!totalMarks || isNaN(Number(totalMarks)) || Number(totalMarks) <= 0)
      return toast.error("Enter valid total marks");

    // Prevent adding the same module twice
    if (examModules.some((em: any) => em.moduleId === moduleId)) {
      return toast.error("This module has already been added to the exam");
    }

    setSaving(true);
    try {
      await fetchApi("/exam-modules", {
        method: "POST",
        body: {
          examId: exam.id,
          moduleId,
          examType,
          totalMarks: Number(totalMarks),
        },
      });
      toast.success("Exam module added");
      setModuleId("");
      setExamType("");
      setTotalMarks("");
      refetch();
    } catch {
      toast.error("Failed to add exam module");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 py-2 text-sm">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block mb-1 font-medium">Module</label>
          <select
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            className="py-2 px-3 rounded-md border border-gray-200 w-full"
          >
            <option value="">Select module</option>
            {programModules.map((m: any) => {
              const alreadyAdded = examModules.some((em: any) => em.moduleId === m.id);
              return (
                <option key={m.id} value={m.id} disabled={alreadyAdded}>
                  {m.name} ({m.code}){alreadyAdded ? " — Already added" : ""}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Exam Type</label>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="py-2 px-3 rounded-md border border-gray-200 w-full"
          >
            <option value="">Select type</option>
            {EXAM_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Total Marks</label>
          <input
            type="number"
            min="1"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            className="py-2 px-3 rounded-md border border-gray-200 w-full"
            placeholder="e.g. 100"
          />
        </div>
      </div>
      <button
        onClick={handleAdd}
        disabled={saving}
        className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition disabled:opacity-60"
      >
        {saving ? "Adding..." : "+ Add Module"}
      </button>

      {examModules.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden mt-2">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-2 px-3 font-medium">Module</th>
                <th className="text-left py-2 px-3 font-medium">Type</th>
                <th className="text-left py-2 px-3 font-medium">Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {examModules.map((em: any) => (
                <tr key={em.id} className="border-t">
                  <td className="py-2 px-3">
                    {moduleNameMap[em.moduleId] || em.moduleId}
                  </td>
                  <td className="py-2 px-3 capitalize">{em.examType}</td>
                  <td className="py-2 px-3">{em.totalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ExamsPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const { canCreate, canEdit } = usePermission("exams");
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  /* viewItem always carries the raw programId UUID */
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId },
  ) as any;
  const programs: any[] =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programMap: Record<string, string> = Object.fromEntries(
    programs.map((p: any) => [p.id, p.name]),
  );

  const dataUrl = selectedProgramId
    ? `/exams?conditions=${JSON.stringify({ programId: selectedProgramId })}`
    : collegeId
      ? `/exams?conditions=${JSON.stringify({ programId: programs.map((p: any) => p.id) })}`
      : "";

  useEffect(() => {
    if (editItem) {
      setTimeout(() => {
        setFormData({
          name: editItem.name || "",
          type: editItem.type || "",
          programId: editItem.programId || "",
          description: editItem.description || "",
        });
      }, 0);
    } else if (createOpen) {
      setTimeout(() => {
        setFormData({ ...EMPTY_FORM, programId: selectedProgramId });
      }, 0);
    }
  }, [editItem, createOpen, selectedProgramId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const err = validate(formData);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      if (editItem) {
        await fetchApi(`/exams/${editItem.id}`, {
          method: "PUT",
          body: formData,
        });
        toast.success("Exam updated");
        setEditItem(null);
      } else {
        await fetchApi("/exams", { method: "POST", body: formData });
        toast.success("Exam created");
        setCreateOpen(false);
      }
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to save exam");
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
          title="Exams"
          dataApiUrl={dataUrl}
          headers={["Name", "Type", "Program", "Description"]}
          dataKeys={["name", "type", "programName", "description"]}
          searchKeys={["name", "type", "programName"]}
          /*
           * Keep programId as the original UUID; add programName for display.
           * onRowClick receives this enriched item — programId stays a UUID.
           */
          dataTransformer={(data) =>
            data.map((item: any) => ({
              ...item,
              programName: programMap[item.programId] || item.programId,
            }))
          }
          onRowClick={(item) => setViewItem(item)}
          onCreateClick={canCreate ? () => setCreateOpen(true) : undefined}
          extraFilters={programFilter}
        />
      )}

      {/* View Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          canEdit && (
            <button
              key="edit"
              onClick={() => {
                setEditItem(viewItem);
                setViewItem(null);
              }}
              className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition"
            >
              Edit
            </button>
          ),
        ].filter(Boolean)}
        title="Exam Details"
        width={740}
      >
        {viewItem && (
          <Tabs
            items={[
              {
                key: "info",
                label: "Details",
                children: (
                  <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <Detail label="Name" value={viewItem.name} />
                      <Detail label="Type" value={viewItem.type} />
                      <Detail
                        label="Program"
                        value={
                          viewItem.programName || programMap[viewItem.programId]
                        }
                      />
                    </div>
                    {viewItem.description && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase mb-1">
                          Description
                        </p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3">
                          {viewItem.description}
                        </p>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: "modules",
                label: "Exam Modules",
                children: <ExamModulesManager exam={viewItem} />,
              },
              {
                key: "marks",
                label: "Enter Marks",
                children: <EnterMarksView exam={viewItem} />,
              },
            ]}
          />
        )}
      </Modal>

      {/* Create / Edit Modal */}
      <Modal
        open={createOpen || !!editItem}
        onCancel={() => {
          setCreateOpen(false);
          setEditItem(null);
        }}
        onOk={handleSave}
        okText={submitting ? "Saving..." : editItem ? "Update" : "Create"}
        okButtonProps={{
          disabled: submitting,
          className: "bg-primary text-white",
        }}
        title={editItem ? "Edit Exam" : "Create Exam"}
        width={600}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div>
            <label className="block mb-1 font-medium">
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="e.g. Midterm 2026"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">Select Type</option>
              {EXAM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Program <span className="text-red-500">*</span>
            </label>
            <select
              name="programId"
              value={formData.programId}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">Select Program</option>
              {programs.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              rows={3}
            />
          </div>
        </div>
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
      <p className="text-sm text-gray-800 capitalize">{value ?? "—"}</p>
    </div>
  );
}
