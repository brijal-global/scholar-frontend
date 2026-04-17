/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/Table";
import { useOrg } from "@/contexts/OrgContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Modal, Tabs } from "antd";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { genders } from "@/data/enums";
import { formatDate } from "@/utils/dateFormatters";
import { usePermission } from "@/contexts/OrgContext";

/* ─── helpers ────────────────────────────────────────── */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getAllDaysOfYear(year: number): Date[] {
  const days: Date[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
}

function toDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

/* ─── helpers ────────────────────────────────────────── */
function generatePassword() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  return Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

function validateCreate(f: typeof EMPTY_CREATE) {
  if (!f.firstName.trim() || f.firstName.trim().length < 2)
    return "First name must be at least 2 characters.";
  if (!f.lastName.trim() || f.lastName.trim().length < 2)
    return "Last name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    return "Please enter a valid email address.";
  if (f.phone && !/^\+?[\d\s\-().]{7,15}$/.test(f.phone))
    return "Please enter a valid phone number.";
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
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "male",
  address: "",
  groupId: "",
  dob: "",
};
const EMPTY_EDIT = { userId: "", groupId: "", dob: "" };

/* ─── Attendance Calendar ────────────────────────────── */
function AttendanceCalendar({ userId }: { userId: string }) {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState("");
  const [expandedMonth, setExpandedMonth] = useState<number | null>(
    new Date().getMonth(),
  );

  const { data: attendanceData } = useFetch(
    userId
      ? `/attendances?conditions=${JSON.stringify({ userId })}&limit=1000`
      : "",
    { now: !!userId },
  ) as any;
  const allAttendances: any[] =
    attendanceData?.rows ||
    (Array.isArray(attendanceData) ? attendanceData : []);

  /* Build set of present date keys */
  const presentDates = useMemo(() => {
    const s = new Set<string>();
    allAttendances.forEach((a: any) => {
      if (a.dateTime) s.add(toDateKey(new Date(a.dateTime)));
    });
    return s;
  }, [allAttendances]);

  const allDays = useMemo(() => getAllDaysOfYear(currentYear), [currentYear]);

  /* If a date is selected, show just that single day across all months */
  const daysToShow = selectedDate
    ? allDays.filter((d) => toDateKey(d) === selectedDate)
    : allDays;

  /* Group by month */
  const byMonth: Record<number, Date[]> = {};
  daysToShow.forEach((d) => {
    const m = d.getMonth();
    if (!byMonth[m]) byMonth[m] = [];
    byMonth[m].push(d);
  });

  const presentCount = daysToShow.filter((d) => {
    const key = toDateKey(d);
    return presentDates.has(key) && d.getDay() !== 6;
  }).length;

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-600 font-medium whitespace-nowrap">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            min={`${currentYear}-01-01`}
            max={`${currentYear}-12-31`}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="py-1.5 px-3 border border-gray-200 rounded-md text-sm"
          />
        </div>
        {selectedDate && (
          <button
            onClick={() => setSelectedDate("")}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Show full year
          </button>
        )}
        <div className="flex items-center gap-2 ml-auto text-xs">
          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">
            Present
          </span>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded font-medium">
            Absent
          </span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded font-medium">
            Holiday
          </span>
        </div>
      </div>

      {selectedDate ? (
        /* Single day view */
        <div className="text-sm">
          {daysToShow.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              Date not in current year.
            </p>
          ) : (
            daysToShow.map((d) => {
              const key = toDateKey(d);
              const isSat = d.getDay() === 6;
              return (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-800">
                    {DAYS[d.getDay()]}, {d.getDate()} {MONTHS[d.getMonth()]}{" "}
                    {currentYear}
                  </span>
                  {isSat ? (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                      Holiday
                    </span>
                  ) : presentDates.has(key) ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                      Present
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-medium">
                      Absent
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Full year — grouped by month, collapsible */
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            {presentCount} days present this year
          </p>
          {MONTHS.map((monthName, mIdx) => {
            const days = byMonth[mIdx] || [];
            if (!days.length) return null;
            const isExpanded = expandedMonth === mIdx;
            const monthPresent = days.filter(
              (d) => presentDates.has(toDateKey(d)) && d.getDay() !== 6,
            ).length;
            const monthTotal = days.filter((d) => d.getDay() !== 6).length;
            return (
              <div
                key={mIdx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedMonth(isExpanded ? null : mIdx)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition"
                >
                  <span>
                    {monthName} {currentYear}
                  </span>
                  <span className="text-xs text-gray-500 font-normal">
                    {monthPresent}/{monthTotal} days present ·{" "}
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </button>
                {isExpanded && (
                  <div className="grid grid-cols-7 text-center text-xs p-2 gap-1">
                    {DAYS.map((d) => (
                      <div key={d} className="py-1 font-semibold text-gray-400">
                        {d}
                      </div>
                    ))}
                    {/* Blank cells before first day */}
                    {Array.from({ length: days[0].getDay() }).map((_, i) => (
                      <div key={`blank-${i}`} />
                    ))}
                    {days.map((d) => {
                      const key = toDateKey(d);
                      const isSat = d.getDay() === 6;
                      let cls = "rounded py-1 ";
                      if (isSat) cls += "bg-gray-100 text-gray-400";
                      else if (presentDates.has(key))
                        cls += "bg-green-100 text-green-700 font-medium";
                      else cls += "bg-red-50 text-red-500";
                      return (
                        <div
                          key={key}
                          className={cls}
                          title={
                            isSat
                              ? "Holiday"
                              : presentDates.has(key)
                                ? "Present"
                                : "Absent"
                          }
                        >
                          {d.getDate()}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Student Results Tab ────────────────────────────── */
function StudentResultsTab({ student }: { student: any }) {
  const [programId, setProgramId] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<any>(null);

  /* Resolve programId via group → batch → program */
  const { data: groupData } = useFetch(
    student?.groupId ? `/groups/${student.groupId}` : "",
    { now: !!student?.groupId },
  ) as any;
  const batchId = groupData?.batchId || null;

  const { data: batchData } = useFetch(batchId ? `/batches/${batchId}` : "", {
    now: !!batchId,
  }) as any;

  useEffect(() => {
    if (batchData?.programId)
      setTimeout(() => {
        setProgramId(batchData.programId);
      }, 0);
  }, [batchData]);

  /* Fetch exams for the program */
  const { data: examsData } = useFetch(
    programId
      ? `/exams?conditions=${JSON.stringify({ programId })}&limit=100`
      : "",
    { now: !!programId },
  ) as any;
  const exams: any[] =
    examsData?.rows || (Array.isArray(examsData) ? examsData : []);

  /* Fetch student marks (keyed by examModuleId) */
  const { data: marksData } = useFetch(
    student?.id
      ? `/module-marks?conditions=${JSON.stringify({ studentId: student.id })}&limit=500`
      : "",
    { now: !!student?.id },
  ) as any;
  const allMarks: any[] =
    marksData?.rows || (Array.isArray(marksData) ? marksData : []);
  const marksMap: Record<string, any> = Object.fromEntries(
    allMarks.map((m: any) => [m.examModuleId, m]),
  );

  /* Fetch exam modules for selected exam */
  const { data: examModulesData } = useFetch(
    selectedExam?.id
      ? `/exam-modules?conditions=${JSON.stringify({ examId: selectedExam.id })}&limit=100`
      : "",
    { now: !!selectedExam?.id },
  ) as any;
  const examModules: any[] =
    examModulesData?.rows ||
    (Array.isArray(examModulesData) ? examModulesData : []);

  /* Fetch program modules for name lookup */
  const { data: programModulesData } = useFetch(
    programId
      ? `/modules?conditions=${JSON.stringify({ programId })}&limit=200`
      : "",
    { now: !!programId },
  ) as any;
  const programModules: any[] =
    programModulesData?.rows ||
    (Array.isArray(programModulesData) ? programModulesData : []);
  const moduleNameMap: Record<string, string> = Object.fromEntries(
    programModules.map((m: any) => [
      m.id,
      `${m.name}${m.code ? ` (${m.code})` : ""}`,
    ]),
  );

  if (!programId) {
    return (
      <p className="text-gray-500 text-sm text-center py-6">
        Loading student program...
      </p>
    );
  }

  return (
    <div className="space-y-3 py-2">
      {exams.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          No exams found for this program.
        </p>
      ) : (
        <div className="space-y-2">
          {exams.map((exam: any) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExam(exam)}
              className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary-light transition text-sm"
            >
              <p className="font-medium text-gray-800">{exam.name}</p>
              <p className="text-xs text-gray-500 capitalize">{exam.type}</p>
            </button>
          ))}
        </div>
      )}

      {/* Exam Marks Popup */}
      <Modal
        open={!!selectedExam}
        onCancel={() => setSelectedExam(null)}
        footer={null}
        title={selectedExam ? `${selectedExam.name} — Marks` : ""}
        width={560}
      >
        {selectedExam && (
          <div className="py-2">
            {examModules.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">
                No exam modules configured for this exam.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-2 px-3 font-medium">Module</th>
                    <th className="text-left py-2 px-3 font-medium">Type</th>
                    <th className="text-center py-2 px-3 font-medium">
                      Obtained
                    </th>
                    <th className="text-center py-2 px-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {examModules.map((em: any) => {
                    const mark = marksMap[em.id];
                    const obtained = mark?.obtainedMarks ?? 0;
                    return (
                      <tr key={em.id} className="border-t">
                        <td className="py-2 px-3">
                          {moduleNameMap[em.moduleId] || em.moduleId}
                        </td>
                        <td className="py-2 px-3 capitalize text-gray-500">
                          {em.examType}
                        </td>
                        <td className="py-2 px-3 text-center font-medium">
                          <span
                            className={
                              obtained === 0 && !mark
                                ? "text-gray-400"
                                : "text-gray-800"
                            }
                          >
                            {obtained}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center text-gray-500">
                          {em.totalMarks}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ─── Student Detail Tabs ────────────────────────────── */
function StudentDetailView({
  student,
  groupMap,
}: {
  student: any;
  groupMap: Record<string, string>;
}) {
  /* Fetch full user info if not already in student object */
  const { data: userData } = useFetch(
    student?.userId && !student.email ? `/users/${student.userId}` : "",
    { now: !!student?.userId && !student.email },
  ) as any;

  const resolvedUser = student.email ? student : userData;
  const fullName =
    student.name ||
    (resolvedUser
      ? `${resolvedUser.firstName || ""} ${resolvedUser.lastName || ""}`.trim()
      : "") ||
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
                <Detail
                  label="Date of Birth"
                  value={
                    student.dob ? formatDate(student.dob, "long") : undefined
                  }
                />
                <Detail
                  label="Group"
                  value={groupMap[student.groupId] || student.groupName}
                />
                <Detail label="Address" value={resolvedUser?.address} />
                <Detail
                  label="Enrolled"
                  value={
                    student.createdAt
                      ? formatDate(student.createdAt, "long")
                      : undefined
                  }
                />
              </div>
            </div>
          ),
        },
        {
          key: "attendance",
          label: "Attendance",
          children: <AttendanceCalendar userId={student.userId} />,
        },
        {
          key: "results",
          label: "Results",
          children: <StudentResultsTab student={student} />,
        },
      ]}
    />
  );
}

export default function StudentsPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const { canCreate } = usePermission("students");
  const router = useRouter();
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [createForm, setCreateForm] = useState(EMPTY_CREATE);
  const [editForm, setEditForm] = useState(EMPTY_EDIT);
  const [submitting, setSubmitting] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  useEffect(() => {
    console.log("canCreate", canCreate);
  }, [canCreate]);

  /* hierarchical data */
  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId },
  ) as any;
  const programs: any[] =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id,programId&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 },
  ) as any;
  const allBatches: any[] =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const filteredBatches = selectedProgramId
    ? allBatches.filter((b: any) => b.programId === selectedProgramId)
    : allBatches;
  const batchIds = filteredBatches.map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 },
  ) as any;
  const groups: any[] =
    groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);
  const groupMap: Record<string, string> = Object.fromEntries(
    groups.map((g: any) => [g.id, g.name]),
  );
  const groupIds = groups.map((g: any) => g.id);

  const queryGroupIds = selectedGroupId ? [selectedGroupId] : groupIds;

  /* Use /students-with-info to get name+email in the table.
     Only build the URL once groups have actually loaded to avoid
     sending an empty groupIds request that returns a 400. */
  const dataUrl = useMemo(() => {
    if (!queryGroupIds.length) return "";
    if (queryGroupIds.length === 1) {
      return `/students-with-info?groupId=${queryGroupIds[0]}`;
    }
    return `/students-with-info?${queryGroupIds.map((id) => `groupIds=${id}`).join("&")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGroupIds.join(",")]);

  useEffect(() => {
    setTimeout(() => {
      setSelectedGroupId("");
    }, 0);
  }, [selectedProgramId]);

  useEffect(() => {
    if (editItem) {
      setTimeout(() => {
        setEditForm({
          userId: editItem.userId || "",
          groupId: editItem.groupId || "",
          dob: editItem.dob ? editItem.dob.split("T")[0] : "",
        });
      }, 0);
    } else if (createOpen) {
      setTimeout(() => {
        setCreateForm({ ...EMPTY_CREATE, groupId: selectedGroupId });
      }, 0);
    }
  }, [editItem, createOpen, selectedGroupId]);

  const handleCreateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setCreateForm({ ...createForm, [e.target.name]: e.target.value });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

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
      await fetchApi(`/student-details/${editItem.id}`, {
        method: "PUT",
        body: editForm,
      });
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
      <select
        value={selectedProgramId}
        onChange={(e) => setSelectedProgramId(e.target.value)}
        className="py-2 px-3 text-sm rounded-md border border-gray-200 min-w-[140px]"
      >
        <option value="">All Programs</option>
        {programs.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <select
        value={selectedGroupId}
        onChange={(e) => setSelectedGroupId(e.target.value)}
        className="py-2 px-3 text-sm rounded-md border border-gray-200 min-w-[130px]"
      >
        <option value="">All Groups</option>
        {groups.map((g: any) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
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
          dataTransformer={(data) =>
            data.map((item: any) => ({
              ...item,
              groupName:
                groupMap[item.groupId] || item.groupName || item.groupId,
            }))
          }
          onRowClick={(item) => setViewItem(item)}
          onCreateClick={canCreate ? () => setCreateOpen(true) : undefined}
          extraFilters={filters}
          showActiveToggle={false}
          actions={{
            view: {
              label: "View Analytics",
              href: (id: string) => `/org/students/${id}`,
            },
          }}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">{filters}</div>
            {canCreate && (
              <button
                onClick={() => setCreateOpen(true)}
                className="border border-secondary text-secondary text-sm py-2 px-4 rounded-md hover:bg-secondary hover:text-white transition"
              >
                + Create
              </button>
            )}
          </div>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No students found</p>
            <p className="text-sm mt-1">
              Create programs, batches, and groups first.
            </p>
          </div>
        </div>
      )}

      {/* View / Detail Modal */}
      <Modal
        open={!!viewItem}
        onCancel={() => setViewItem(null)}
        footer={[
          <button
            key="analytics"
            onClick={() => {
              if (viewItem?.id) {
                router.push(`/org/students/${viewItem.id}`);
              }
            }}
            className="bg-indigo-600 text-white text-sm py-2 px-4 rounded-md hover:bg-indigo-700 transition mr-3"
          >
            View Full Analytics
          </button>,
          <button
            key="edit"
            onClick={() => {
              setEditItem(viewItem);
              setViewItem(null);
            }}
            className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition"
          >
            Edit Enrollment
          </button>,
        ]}
        title="Student Details"
        width={700}
      >
        {viewItem && (
          <StudentDetailView student={viewItem} groupMap={groupMap} />
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editItem}
        onCancel={() => setEditItem(null)}
        onOk={handleEdit}
        okText={submitting ? "Saving..." : "Update"}
        okButtonProps={{
          disabled: submitting,
          className: "bg-primary text-white",
        }}
        title="Edit Student Enrollment"
        width={500}
      >
        <div className="grid grid-cols-2 gap-4 py-3 text-sm">
          <div className="col-span-2">
            <label className="block mb-1 font-medium">
              Group <span className="text-red-500">*</span>
            </label>
            <select
              name="groupId"
              value={editForm.groupId}
              onChange={handleEditChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">Select Group</option>
              {groups.map((g: any) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              name="dob"
              type="date"
              value={editForm.dob}
              onChange={handleEditChange}
              max={new Date().toISOString().split("T")[0]}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            />
          </div>
        </div>
      </Modal>

      {/* Create Modal */}
      <Modal
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onOk={handleCreate}
        okText={submitting ? "Registering..." : "Register Student"}
        okButtonProps={{
          disabled: submitting,
          className: "bg-primary text-white",
        }}
        title="Register New Student"
        width={680}
      >
        <p className="text-xs text-gray-500 mb-4">
          A temporary password will be auto-generated for the student.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              value={createForm.firstName}
              onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              value={createForm.lastName}
              onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="Last name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={createForm.email}
              onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="student@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              name="phone"
              type="tel"
              value={createForm.phone}
              onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="+1 555 000 0000"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={createForm.gender}
              onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              {Object.entries(genders).map(([k, v]) => (
                <option key={k} value={v}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              name="dob"
              type="date"
              value={createForm.dob}
              onChange={handleCreateChange}
              max={new Date().toISOString().split("T")[0]}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Group <span className="text-red-500">*</span>
            </label>
            <select
              name="groupId"
              value={createForm.groupId}
              onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
            >
              <option value="">Select Group</option>
              {groups.map((g: any) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              name="address"
              value={createForm.address}
              onChange={handleCreateChange}
              className="py-2.5 px-4 rounded-md border border-gray-200 w-full"
              placeholder="Address"
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
      <p className="text-sm text-gray-800">{value ?? "—"}</p>
    </div>
  );
}
