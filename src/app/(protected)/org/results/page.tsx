/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";

interface ExamModuleSummary {
  id: string;
  moduleId: string;
  moduleName: string;
  moduleCode: string;
  examType: string;
  totalMarks: number;
}

interface StudentResult {
  studentDetailId: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  marks: Record<
    string,
    { id?: string; obtainedMarks?: number; remarks?: string }
  >;
}

interface ResultsData {
  examModules: ExamModuleSummary[];
  students: StudentResult[];
}

export default function ResultsPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [loadingResults, setLoadingResults] = useState(false);
  /* edits: studentDetailId → examModuleId → { obtainedMarks, remarks } */
  const [edits, setEdits] = useState<
    Record<string, Record<string, { obtainedMarks: string; remarks: string }>>
  >({});
  const [savingStudent, setSavingStudent] = useState<string | null>(null);

  /* Programs → exams */
  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId },
  ) as any;
  const programs: any[] =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: examsData } = useFetch(
    programIds.length
      ? `/exams?fields=id,name,programId&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 },
  ) as any;
  const exams: any[] =
    examsData?.rows || (Array.isArray(examsData) ? examsData : []);

  /* Groups for the selected exam's program */
  const selectedExam = exams.find((e: any) => e.id === selectedExamId);

  const { data: batchesForExam } = useFetch(
    selectedExam?.programId
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: selectedExam.programId })}`
      : "?76",
    { now: !!selectedExam?.programId },
  ) as any;
  const batchIds: string[] = (
    batchesForExam?.rows ||
    (Array.isArray(batchesForExam) ? batchesForExam : [])
  ).map((b: any) => b.id);

  const { data: groupsForExam } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 },
  ) as any;
  const groups: any[] =
    groupsForExam?.rows || (Array.isArray(groupsForExam) ? groupsForExam : []);

  /* Load results when both exam and group are selected */
  const loadResults = useCallback(async (examId: string, groupId: string) => {
    if (!examId || !groupId) return;
    setLoadingResults(true);
    setResultsData(null);
    setEdits({});
    try {
      const res = await fetchApi(
        `/results-by-group?examId=${examId}&groupId=${groupId}`,
      );
      const data: ResultsData = res?.data ?? res;
      setResultsData(data);
    } catch {
      toast.error("Failed to load results");
    } finally {
      setLoadingResults(false);
    }
  }, []);

  const handleExamChange = (examId: string) => {
    setSelectedExamId(examId);
    setSelectedGroupId("");
    setResultsData(null);
    setEdits({});
  };

  const handleGroupChange = (groupId: string) => {
    setSelectedGroupId(groupId);
    if (selectedExamId && groupId) {
      loadResults(selectedExamId, groupId);
    }
  };

  const handleMarkChange = (
    studentDetailId: string,
    examModuleId: string,
    field: "obtainedMarks" | "remarks",
    value: string,
    totalMarks?: number,
  ) => {
    if (field === "obtainedMarks" && totalMarks !== undefined && value !== "") {
      const numeric = Number(value);
      if (numeric < 0) return;
      if (numeric > totalMarks) return;
    }
    setEdits((prev) => ({
      ...prev,
      [studentDetailId]: {
        ...prev[studentDetailId],
        [examModuleId]: {
          obtainedMarks:
            prev[studentDetailId]?.[examModuleId]?.obtainedMarks ?? "",
          remarks: prev[studentDetailId]?.[examModuleId]?.remarks ?? "",
          [field]: value,
        },
      },
    }));
  };

  const handleSaveStudent = async (student: StudentResult) => {
    const studentEdits = edits[student.studentDetailId] || {};
    const entries = Object.entries(studentEdits).filter(
      ([, v]) => v.obtainedMarks !== "",
    );
    if (!entries.length)
      return toast.error("No marks entered for this student");

    // Validate marks don't exceed total marks
    for (const [examModuleId, { obtainedMarks }] of entries) {
      const em = resultsData?.examModules.find((m) => m.id === examModuleId);
      if (em && Number(obtainedMarks) > em.totalMarks) {
        return toast.error(
          `Marks for ${em.moduleName} cannot exceed total marks (${em.totalMarks})`,
        );
      }
      if (Number(obtainedMarks) < 0) {
        return toast.error("Marks cannot be negative");
      }
    }

    setSavingStudent(student.studentDetailId);
    try {
      await Promise.all(
        entries.map(([examModuleId, { obtainedMarks, remarks }]) => {
          const existing = student.marks[examModuleId];
          if (existing?.id) {
            return fetchApi(`/module-marks/${existing.id}`, {
              method: "PUT",
              body: {
                obtainedMarks: Number(obtainedMarks),
                remarks: remarks || undefined,
              },
            });
          }
          return fetchApi("/module-marks", {
            method: "POST",
            body: {
              examModuleId,
              studentId: student.studentDetailId,
              obtainedMarks: Number(obtainedMarks),
              remarks: remarks || undefined,
            },
          });
        }),
      );
      toast.success(`Marks saved for ${student.name}`);
      /* Refresh results */
      await loadResults(selectedExamId, selectedGroupId);
    } catch {
      toast.error("Failed to save marks");
    } finally {
      setSavingStudent(null);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Exam Results</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Exam
          </label>
          <select
            value={selectedExamId}
            onChange={(e) => handleExamChange(e.target.value)}
            className="py-2.5 px-4 text-sm rounded-md border border-gray-200 min-w-[220px]"
          >
            <option value="">— Select Exam —</option>
            {exams.map((exam: any) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>

        {selectedExamId && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Group
            </label>
            <select
              value={selectedGroupId}
              onChange={(e) => handleGroupChange(e.target.value)}
              className="py-2.5 px-4 text-sm rounded-md border border-gray-200 min-w-[200px]"
            >
              <option value="">— Select Group —</option>
              {groups.map((g: any) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Results content */}
      {loadingResults && <Loader />}

      {!loadingResults && resultsData && (
        <>
          {resultsData.examModules.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
              No exam modules found for this exam. Please add modules to the
              exam first via the Exams page.
            </div>
          ) : resultsData.students.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-10">
              No students found in this group.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary row */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">
                  {resultsData.students.length}
                </span>{" "}
                students ·{" "}
                <span className="font-medium">
                  {resultsData.examModules.length}
                </span>{" "}
                module(s)
              </div>

              {/* Per-student result cards */}
              {resultsData.students.map((student) => {
                const isSaving = savingStudent === student.studentDetailId;
                const studentEdits = edits[student.studentDetailId] || {};

                let totalObtained = 0;
                let totalPossible = 0;
                resultsData.examModules.forEach((em) => {
                  const existing = student.marks[em.id];
                  const edit = studentEdits[em.id];
                  const obtained =
                    edit?.obtainedMarks !== undefined &&
                    edit.obtainedMarks !== ""
                      ? Number(edit.obtainedMarks)
                      : (existing?.obtainedMarks ?? null);
                  totalPossible += em.totalMarks;
                  if (obtained !== null) totalObtained += obtained;
                });
                const pct =
                  totalPossible > 0
                    ? Math.round((totalObtained / totalPossible) * 100)
                    : null;

                return (
                  <div
                    key={student.studentDetailId}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* Student header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {pct !== null && (
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full ${
                              pct >= 50
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {pct}%
                          </span>
                        )}
                        <button
                          onClick={() => handleSaveStudent(student)}
                          disabled={isSaving}
                          className="bg-primary text-white text-xs py-1.5 px-4 rounded-md hover:bg-primary-dark transition disabled:opacity-60"
                        >
                          {isSaving ? "Saving..." : "Save Marks"}
                        </button>
                      </div>
                    </div>

                    {/* Marks table */}
                    <table className="w-full text-sm">
                      <thead className="bg-white border-b">
                        <tr>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Module
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Type
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Total
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Obtained
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            %
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-gray-600">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultsData.examModules.map((em) => {
                          const existing = student.marks[em.id];
                          const edit = studentEdits[em.id];
                          const currentMarks =
                            edit?.obtainedMarks !== undefined
                              ? edit.obtainedMarks
                              : (existing?.obtainedMarks?.toString() ?? "");
                          const currentRemarks =
                            edit?.remarks !== undefined
                              ? edit.remarks
                              : (existing?.remarks ?? "");
                          const numericMarks =
                            currentMarks !== "" ? Number(currentMarks) : null;
                          const modPct =
                            numericMarks !== null
                              ? Math.round((numericMarks / em.totalMarks) * 100)
                              : null;

                          return (
                            <tr key={em.id} className="border-t">
                              <td className="py-2 px-4 font-medium">
                                {em.moduleName}
                              </td>
                              <td className="py-2 px-4 capitalize text-gray-600">
                                {em.examType}
                              </td>
                              <td className="py-2 px-4 text-gray-600">
                                {em.totalMarks}
                              </td>
                              <td className="py-2 px-4">
                                <input
                                  type="number"
                                  min="0"
                                  max={em.totalMarks}
                                  value={currentMarks}
                                  onChange={(e) =>
                                    handleMarkChange(
                                      student.studentDetailId,
                                      em.id,
                                      "obtainedMarks",
                                      e.target.value,
                                      em.totalMarks,
                                    )
                                  }
                                  className="py-1.5 px-3 border border-gray-200 rounded-md w-24 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                                  placeholder="—"
                                />
                              </td>
                              <td className="py-2 px-4">
                                {modPct !== null ? (
                                  <span
                                    className={`text-xs font-medium ${modPct >= 50 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {modPct}%
                                  </span>
                                ) : (
                                  "—"
                                )}
                              </td>
                              <td className="py-2 px-4">
                                <input
                                  type="text"
                                  value={currentRemarks}
                                  onChange={(e) =>
                                    handleMarkChange(
                                      student.studentDetailId,
                                      em.id,
                                      "remarks",
                                      e.target.value,
                                    )
                                  }
                                  className="py-1.5 px-3 border border-gray-200 rounded-md w-full text-sm"
                                  placeholder="Optional"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {!loadingResults && !resultsData && selectedExamId && selectedGroupId && (
        <p className="text-gray-400 text-sm text-center py-10">
          Select an exam and group to view results.
        </p>
      )}

      {!selectedExamId && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-base">Select an exam above to get started.</p>
        </div>
      )}
    </div>
  );
}
