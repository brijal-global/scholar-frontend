/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useOrg, usePermission } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/dateFormatters";
import { CheckCircle2, XCircle, Users } from "lucide-react";

/* ─── types ─────────────────────────────────────────── */
interface AttendanceRow {
  studentDetailId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  isPresent: boolean;
  attendanceId: string | null;
}

type PresentMap = Record<string, boolean>; // userId → true/false

export default function AttendancePage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const { canEdit } = usePermission("attendance");

  /* ── step 1: program ── */
  const [selectedProgramId, setSelectedProgramId] = useState("");

  /* ── step 2: group ── */
  const [selectedGroupId, setSelectedGroupId] = useState("");

  /* ── step 3: date ── */
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  /* ── attendance data ── */
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [presentMap, setPresentMap] = useState<PresentMap>({});
  const [originalPresentMap, setOriginalPresentMap] = useState<PresentMap>({});
  const [originalAttendanceIds, setOriginalAttendanceIds] = useState<Record<string, string>>({});
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ─────────────────── programs ────────────────────── */
  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs = programsData?.rows || (Array.isArray(programsData) ? programsData : []);

  /* ─────────────────── batches for selected program ── */
  const { data: batchesData } = useFetch(
    selectedProgramId
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: selectedProgramId })}`
      : "",
    { now: !!selectedProgramId }
  ) as any;
  const batches = batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const batchIds = batches.map((b: any) => b.id);

  /* ─────────────────── groups for those batches ────── */
  const { data: groupsData, loading: groupsLoading } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groups = groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);

  /* reset downstream on program change */
  useEffect(() => {
    setSelectedGroupId("");
    setRows([]);
    setPresentMap({});
  }, [selectedProgramId]);

  /* reset attendance when group or date changes */
  useEffect(() => {
    setRows([]);
    setPresentMap({});
    setOriginalPresentMap({});
    setOriginalAttendanceIds({});
  }, [selectedGroupId, selectedDate]);

  /* ─────────────────── load attendance ────────────── */
  const loadAttendance = useCallback(async () => {
    if (!selectedGroupId || !selectedDate) return;
    setLoadingAttendance(true);
    try {
      const res = await fetchApi(
        `/attendance-by-group?groupId=${selectedGroupId}&date=${selectedDate}`
      );
      // fetchApi returns response.data (axios); successResponse puts array at .data
      const raw = res?.data ?? res;
      const data: AttendanceRow[] = Array.isArray(raw) ? raw : (raw?.rows ?? []);

      setRows(data);

      const pm: PresentMap = {};
      const attIds: Record<string, string> = {};
      data.forEach((r) => {
        pm[r.userId] = r.isPresent;
        if (r.attendanceId) attIds[r.userId] = r.attendanceId;
      });
      setPresentMap(pm);
      setOriginalPresentMap(pm);
      setOriginalAttendanceIds(attIds);
    } catch {
      toast.error("Failed to load attendance data");
    } finally {
      setLoadingAttendance(false);
    }
  }, [selectedGroupId, selectedDate]);

  /* auto-load when group + date are ready */
  useEffect(() => {
    if (selectedGroupId && selectedDate) {
      loadAttendance();
    }
  }, [selectedGroupId, selectedDate, loadAttendance]);

  /* ─────────────────── toggle ─────────────────────── */
  const toggleStudent = (userId: string) => {
    setPresentMap((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const markAll = (present: boolean) => {
    const next: PresentMap = {};
    rows.forEach((r) => (next[r.userId] = present));
    setPresentMap(next);
  };

  /* ─────────────────── save ───────────────────────── */
  const handleSave = async () => {
    if (!selectedGroupId || !selectedDate) return;

    const toAdd: string[] = [];    // userId: was absent, now present
    const toRemove: string[] = []; // userId: was present, now absent

    rows.forEach((r) => {
      const wasPresent = originalPresentMap[r.userId] ?? false;
      const isNowPresent = presentMap[r.userId] ?? false;
      if (!wasPresent && isNowPresent) toAdd.push(r.userId);
      if (wasPresent && !isNowPresent) toRemove.push(r.userId);
    });

    if (!toAdd.length && !toRemove.length) {
      return toast.info("No changes to save");
    }

    setSubmitting(true);
    try {
      /* create new attendance records */
      await Promise.all(
        toAdd.map((userId) =>
          fetchApi("/attendances", {
            method: "POST",
            body: { userId, dateTime: `${selectedDate}T12:00:00.000Z` },
          })
        )
      );

      /* delete removed attendance records */
      await Promise.all(
        toRemove
          .filter((userId) => originalAttendanceIds[userId])
          .map((userId) =>
            fetchApi(`/attendances/${originalAttendanceIds[userId]}`, {
              method: "DELETE",
            })
          )
      );

      const added = toAdd.length;
      const removed = toRemove.length;
      toast.success(
        `Saved: ${added} marked present${removed ? `, ${removed} marked absent` : ""}`
      );

      /* reload fresh state */
      await loadAttendance();
    } catch {
      toast.error("Failed to save attendance");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  const presentCount = rows.filter((r) => presentMap[r.userId]).length;
  const absentCount = rows.length - presentCount;
  const hasChanges = rows.some(
    (r) => (presentMap[r.userId] ?? false) !== (originalPresentMap[r.userId] ?? false)
  );
  const selectedGroup = groups.find((g: any) => g.id === selectedGroupId);
  const selectedProgram = programs.find((p: any) => p.id === selectedProgramId);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* ─── Step 1: Select Program ─── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
          Select Program
        </h2>
        <select
          value={selectedProgramId}
          onChange={(e) => setSelectedProgramId(e.target.value)}
          className="py-2.5 px-4 text-sm rounded-md border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">— Choose a program —</option>
          {programs.map((p: any) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* ─── Step 2: Select Group (enabled only after program) ─── */}
      <div className={`bg-white border rounded-xl p-5 space-y-3 transition-opacity ${
        selectedProgramId ? "border-gray-200 opacity-100" : "border-gray-100 opacity-40 pointer-events-none"
      }`}>
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
            selectedProgramId ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
          }`}>2</span>
          Select Group
          {selectedProgram && (
            <span className="text-xs font-normal text-gray-400 ml-1">— {selectedProgram.name}</span>
          )}
        </h2>

        {groupsLoading && selectedProgramId ? (
          <p className="text-sm text-gray-400">Loading groups…</p>
        ) : groups.length === 0 && selectedProgramId ? (
          <p className="text-sm text-amber-600">No groups found for this program.</p>
        ) : (
          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            disabled={!selectedProgramId}
            className="py-2.5 px-4 text-sm rounded-md border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-gray-50"
          >
            <option value="">— Choose a group —</option>
            {groups.map((g: any) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* ─── Step 3: Date + attendance table ─── */}
      <div className={`bg-white border rounded-xl p-5 space-y-4 transition-opacity ${
        selectedGroupId ? "border-gray-200 opacity-100" : "border-gray-100 opacity-40 pointer-events-none"
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
              selectedGroupId ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            }`}>3</span>
            Attendance
            {selectedGroup && (
              <span className="text-xs font-normal text-gray-400 ml-1">— {selectedGroup.name}</span>
            )}
          </h2>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              value={selectedDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={!selectedGroupId}
              className="py-2 px-3 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Summary bar */}
        {rows.length > 0 && (
          <div className="flex items-center gap-4 text-sm py-2.5 px-4 bg-gray-50 rounded-lg">
            <span className="flex items-center gap-1.5 text-green-700 font-medium">
              <CheckCircle2 size={15} /> {presentCount} Present
            </span>
            <span className="flex items-center gap-1.5 text-red-600 font-medium">
              <XCircle size={15} /> {absentCount} Absent
            </span>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Users size={14} /> {rows.length} Total
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => markAll(true)}
                className="text-xs text-green-700 border border-green-200 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-md transition"
              >
                Mark All Present
              </button>
              <button
                onClick={() => markAll(false)}
                className="text-xs text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
              >
                Mark All Absent
              </button>
            </div>
          </div>
        )}

        {/* Attendance table */}
        {loadingAttendance ? (
          <div className="py-8 flex justify-center"><Loader /></div>
        ) : rows.length === 0 && selectedGroupId ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            <Users size={32} className="mx-auto mb-2 opacity-30" />
            <p>No students found in this group.</p>
          </div>
        ) : rows.length > 0 ? (
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Student</th>
                  <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Email</th>
                  <th className="text-center py-3 px-4 font-medium w-28">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((student) => {
                  const isPresent = presentMap[student.userId] ?? false;
                  return (
                    <tr
                      key={student.studentDetailId}
                      onClick={() => canEdit && toggleStudent(student.userId)}
                      className={`border-t transition-colors select-none ${canEdit ? "cursor-pointer" : "cursor-default"} ${
                        isPresent ? "hover:bg-green-50" : canEdit ? "hover:bg-red-50" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">
                          {student.firstName} {student.lastName}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs hidden sm:table-cell">
                        {student.email}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); if (canEdit) toggleStudent(student.userId); }}
                          disabled={!canEdit}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            isPresent
                              ? "bg-green-100 text-green-700" + (canEdit ? " hover:bg-green-200" : "")
                              : "bg-red-100 text-red-600" + (canEdit ? " hover:bg-red-200" : "")
                          }${!canEdit ? " cursor-not-allowed" : ""}`}
                        >
                          {isPresent ? (
                            <><CheckCircle2 size={13} /> Present</>
                          ) : (
                            <><XCircle size={13} /> Absent</>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* Save button */}
        {rows.length > 0 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-gray-500">
              {formatDate(selectedDate, "long")} &mdash; {selectedGroup?.name}
            </p>
            {canEdit && (
              <button
                onClick={handleSave}
                disabled={submitting || !hasChanges}
                className={`flex items-center gap-2 text-sm py-2.5 px-6 rounded-lg font-medium transition ${
                  hasChanges && !submitting
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting ? "Saving…" : hasChanges ? "Save Attendance" : "No Changes"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
