"use client";

import { useState, useEffect, useMemo } from "react";
import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal, Tabs } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { genders } from "@/data/enums";
import { formatDate } from "@/utils/dateFormatters";

/* ─── helpers ────────────────────────────────────────── */
function generatePassword() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function validateCreate(f: typeof EMPTY_CREATE) {
  if (!f.firstName.trim() || f.firstName.trim().length < 2) return "First name must be at least 2 characters.";
  if (!f.lastName.trim() || f.lastName.trim().length < 2) return "Last name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return "Please enter a valid email address.";
  if (f.phone && !/^\+?[\d\s\-().]{7,15}$/.test(f.phone)) return "Please enter a valid phone number.";
  if (!f.groupId) return "Please select a group.";
  if (!f.dob) return "Date of birth is required.";
  const dob = new Date(f.dob);
  if (isNaN(dob.getTime())) return "Invalid date of birth.";
  if (dob >= new Date()) return "Date of birth must be in the past.";
  const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (age < 5 || age > 100) return "Age must be between 5 and 100.";
  return null;
}

function validateEdit(f: typeof EMPTY_EDIT) {
  if (!f.groupId) return "Please select a group.";
  if (!f.dob) return "Date of birth is required.";
  const dob = new Date(f.dob);
  if (isNaN(dob.getTime())) return "Invalid date of birth.";
  if (dob >= new Date()) return "Date of birth must be in the past.";
  return null;
}

const EMPTY_CREATE = {
  firstName: "", lastName: "", email: "", phone: "", gender: "male", address: "", groupId: "", dob: "",
};
const EMPTY_EDIT = { userId: "", groupId: "", dob: "" };

/* ─── Student Detail Tabs ────────────────────────────── */
function StudentDetailView({ student, groupMap }: { student: any; groupMap: Record<string, string> }) {
  const [attStartDate, setAttStartDate] = useState("");
  const [attEndDate, setAttEndDate] = useState("");

  /* Fetch full user info if not already in student object */
  const { data: userData } = useFetch(
    student?.userId && !student.email ? `/users/${student.userId}` : ""
  ) as any;

  /* Fetch attendance records for this student (by userId) */
  const { data: attendanceData } = useFetch(
    student?.userId
      ? `/attendances?conditions=${JSON.stringify({ userId: student.userId })}&limit=500`
      : ""
  ) as any;
  const allAttendances: any[] = attendanceData?.rows || (Array.isArray(attendanceData) ? attendanceData : []);

  /* Client-side date range filter */
  const attendances = useMemo(() => {
    if (!attStartDate && !attEndDate) return allAttendances;
    return allAttendances.filter((a: any) => {
      const dt = a.dateTime ? new Date(a.dateTime) : null;
      if (!dt) return false;
      if (attStartDate && dt < new Date(attStartDate)) return false;
      if (attEndDate && dt > new Date(attEndDate + "T23:59:59")) return false;
      return true;
    });
  }, [allAttendances, attStartDate, attEndDate]);

  /* Fetch module marks by studentId (studentDetails.id, not userId) */
  const { data: marksData } = useFetch(
    student?.id
      ? `/module-marks?conditions=${JSON.stringify({ studentId: student.id })}&limit=100`
      : ""
  ) as any;
  const marks: any[] = marksData?.rows || (Array.isArray(marksData) ? marksData : []);

  const resolvedUser = student.email ? student : userData;
  const fullName =
    student.name ||
    (resolvedUser ? `${resolvedUser.firstName || ""} ${resolvedUser.lastName || ""}`.trim() : "") ||
    student.userId;

  return (
    <Tabs
      items={[
        {
          key: "info",
          label: "Personal Info",
          children: (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="Full Name" value={fullName} />
                <Detail label="Email" value={resolvedUser?.email} />
                <Detail label="Phone" value={resolvedUser?.phone} />
                <Detail label="Gender" value={resolvedUser?.gender} />
                <Detail label="Date of Birth" value={student.dob ? formatDate(student.dob, "long") : undefined} />
                <Detail label="Group" value={groupMap[student.groupId] || student.groupName} />
                <Detail label="Address" value={resolvedUser?.address} />
                <Detail label="Enrolled" value={student.createdAt ? formatDate(student.createdAt, "long") : undefined} />
              </div>
            </div>
          ),
        },
        {
          key: "attendance",
          label: `Attendance (${attendances.length}${allAttendances.length !== attendances.length ? ` of ${allAttendances.length}` : ""})`,
          children: (
            <div className="space-y-3 py-2">
              {/* Date range filter */}
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 font-medium whitespace-nowrap">From:</label>
                  <input
                    type="date"
                    value={attStartDate}
                    onChange={(e) => setAttStartDate(e.target.value)}
                    className="py-1.5 px-3 border border-gray-200 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 font-medium whitespace-nowrap">To:</label>
                  <input
                    type="date"
                    value={attEndDate}
                    onChange={(e) => setAttEndDate(e.target.value)}
                    className="py-1.5 px-3 border border-gray-200 rounded-md text-sm"
                  />
                </div>
                {(attStartDate || attEndDate) && (
                  <button
                    onClick={() => { setAttStartDate(""); setAttEndDate(""); }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              {attendances.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">No attendance records found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3 font-medium">#</th>
                        <th className="text-left py-2 px-3 font-medium">Date & Time</th>
                        <th className="text-left py-2 px-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendances.map((a: any, i: number) => (
                        <tr key={a.id} className="border-t">
                          <td className="py-2 px-3 text-gray-500">{i + 1}</td>
                          <td className="py-2 px-3">{a.dateTime ? formatDate(a.dateTime, "long") : "—"}</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">Present</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ),
        },
        {
          key: "results",
          label: `Results (${marks.length})`,
          children: (
            <div className="space-y-2 py-2">
              {marks.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">No exam results found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3 font-medium">Exam Module</th>
                        <th className="text-left py-2 px-3 font-medium">Marks Obtained</th>
                        <th className="text-left py-2 px-3 font-medium">Remarks</th>
                        <th className="text-left py-2 px-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marks.map((m: any) => (
                        <tr key={m.id} className="border-t">
                          <td className="py-2 px-3 text-gray-600 text-xs">{m.examModuleId || "—"}</td>
                          <td className="py-2 px-3 font-medium">{m.obtainedMarks ?? "—"}</td>
                          <td className="py-2 px-3 text-gray-600">{m.remarks || "—"}</td>
                          <td className="py-2 px-3">{m.createdAt ? formatDate(m.createdAt, "long") : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ),
        },
      ]}
    />
  );
}

export default function StudentsPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [createForm, setCreateForm] = useState(EMPTY_CREATE);
  const [editForm, setEditForm] = useState(EMPTY_EDIT);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  /* hierarchical data */
  const { data: programsData } = useFetch(
    collegeId ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}` : "",
    { now: !!collegeId }
  ) as any;
  const programs: any[] = programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length ? `/batches?fields=id,programId&limit=100&conditions=${JSON.stringify({ programId: programIds })}` : "",
    { now: programIds.length > 0 }
  ) as any;
  const allBatches: any[] = batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const filteredBatches = selectedProgramId
    ? allBatches.filter((b: any) => b.programId === selectedProgramId)
    : allBatches;
  const batchIds = filteredBatches.map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}` : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groups: any[] = groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);
  const groupMap: Record<string, string> = Object.fromEntries(groups.map((g: any) => [g.id, g.name]));
  const groupIds = groups.map((g: any) => g.id);

  const queryGroupIds = selectedGroupId ? [selectedGroupId] : groupIds;

  /* Use /students-with-info to get name+email in the table */
  const dataUrl = useMemo(() => {
    if (!queryGroupIds.length) return "";
    if (queryGroupIds.length === 1) {
      return `/students-with-info?groupId=${queryGroupIds[0]}`;
    }
    return `/students-with-info?${queryGroupIds.map((id) => `groupIds[]=${id}`).join("&")}`;
  }, [queryGroupIds.join(",")]);

  useEffect(() => { setSelectedGroupId(""); }, [selectedProgramId]);

  useEffect(() => {
    if (editItem) {
      setEditForm({ userId: editItem.userId || "", groupId: editItem.groupId || "", dob: editItem.dob ? editItem.dob.split("T")[0] : "" });
    } else if (createOpen) {
      setCreateForm({ ...EMPTY_CREATE, groupId: selectedGroupId });
    }
  }, [editItem, createOpen, selectedGroupId]);

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    const err = validateCreate(createForm);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      const password = generatePassword();
      const res = await fetchApi("/register-student", {
        method: "POST",
        body: { ...createForm, password },
      });
      if (res?.success !== false) {
        toast.success("Student registered successfully");
        setCreateOpen(false);
        setTableKey((k) => k + 1);
      }
    } catch {
      toast.error("Failed to register student");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    const err = validateEdit(editForm);
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      await fetchApi(`/student-details/${editItem.id}`, { method: "PUT", body: editForm });
      toast.success("Student updated");
      setEditItem(null);
      setTableKey((k) => k + 1);
    } catch {
      toast.error("Failed to update student");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  const filters = (
    <div className="flex items-center gap-2">
      <select value={selectedProgramId} onChange={(e) => setSelectedProgramId(e.target.value)}
        className="py-2 px-3 text-sm rounded-md border border-gray-200 min-w-[140px]">
        <option value="">All Programs</option>
        {programs.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <select value={selectedGroupId} onChange={(e) => setSelectedGroupId(e.target.value)}
        className="py-2 px-3 text-sm rounded-md border border-gray-200 min-w-[130px]">
        <option value="">All Groups</option>
        {groups.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
    </div>
  );

  return (
    <>
      {dataUrl ? (
        <Table
          key={tableKey}
          title="Students"
          dataApiUrl={dataUrl}
          headers={["Name", "Email", "Group", "Date of Birth"]}
          dataKeys={["name", "email", "groupName", "dob"]}
          searchKeys={["name", "email", "groupName"]}
          /* Add groupName for display; keep groupId as UUID */
          dataTransformer={(data) =>
            data.map((item: any) => ({
              ...item,
              groupName: groupMap[item.groupId] || item.groupName || item.groupId,
            }))
          }
          onRowClick={(item) => setViewItem(item)}
          onCreateClick={() => setCreateOpen(true)}
          extraFilters={filters}
          showActiveToggle={false}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">{filters}</div>
            <button onClick={() => setCreateOpen(true)}
              className="border border-secondary text-secondary text-sm py-2 px-4 rounded-md hover:bg-secondary hover:text-white transition">
              + Create
            </button>
          </div>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No students found</p>
            <p className="text-sm mt-1">Create programs, batches, and groups first.</p>
          </div>
        </div>
      )}

      {/* View / Detail Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button key="edit" onClick={() => { setEditItem(viewItem); setViewItem(null); }}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition">
            Edit Enrollment
          </button>,
        ]}
        title="Student Details"
        width={700}
      >
        {viewItem && <StudentDetailView student={viewItem} groupMap={groupMap} />}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editItem}
        onCancel={() => setEditItem(null)}
        onOk={handleEdit}
        okText={submitting ? "Saving..." : "Update"}
        okButtonProps={{ disabled: submitting, className: "bg-primary text-white" }}
        title="Edit Student Enrollment"
        width={500}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Group <span className="text-red-500">*</span></label>
            <select name="groupId" value={editForm.groupId} onChange={handleEditChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full">
              <option value="">Select Group</option>
              {groups.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Date of Birth <span className="text-red-500">*</span></label>
            <input name="dob" type="date" value={editForm.dob} onChange={handleEditChange}
              max={new Date().toISOString().split("T")[0]}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" />
          </div>
        </div>
      </Modal>

      {/* Create Modal */}
      <Modal
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onOk={handleCreate}
        okText={submitting ? "Registering..." : "Register Student"}
        okButtonProps={{ disabled: submitting, className: "bg-primary text-white" }}
        title="Register New Student"
        width={680}
      >
        <p className="text-xs text-gray-500 mb-4">A temporary password will be auto-generated for the student.</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">First Name <span className="text-red-500">*</span></label>
            <input name="firstName" value={createForm.firstName} onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="First name" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name <span className="text-red-500">*</span></label>
            <input name="lastName" value={createForm.lastName} onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="Last name" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
            <input name="email" type="email" value={createForm.email} onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="student@email.com" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input name="phone" type="tel" value={createForm.phone} onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="+1 555 000 0000" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select name="gender" value={createForm.gender} onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full">
              {Object.entries(genders).map(([k, v]) => <option key={k} value={v}>{k}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Date of Birth <span className="text-red-500">*</span></label>
            <input name="dob" type="date" value={createForm.dob} onChange={handleCreateChange}
              max={new Date().toISOString().split("T")[0]}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Group <span className="text-red-500">*</span></label>
            <select name="groupId" value={createForm.groupId} onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full">
              <option value="">Select Group</option>
              {groups.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input name="address" value={createForm.address} onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full" placeholder="Address" />
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
