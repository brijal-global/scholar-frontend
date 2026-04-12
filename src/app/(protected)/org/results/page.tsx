"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";

export default function ResultsPage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedExamModuleId, setSelectedExamModuleId] = useState("");
  const [marks, setMarks] = useState<
    Record<string, { obtainedMarks: string; remarks: string }>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id,name&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: examsData } = useFetch(
    programIds.length
      ? `/exams?fields=id,name&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const exams =
    examsData?.rows || (Array.isArray(examsData) ? examsData : []);

  const { data: examModulesData } = useFetch(
    selectedExamId
      ? `/exam-modules?conditions=${JSON.stringify({ examId: selectedExamId })}&limit=100`
      : "",
    { now: !!selectedExamId }
  ) as any;
  const examModules =
    examModulesData?.rows ||
    (Array.isArray(examModulesData) ? examModulesData : []);

  const selectedExamModule = examModules.find(
    (em: any) => em.id === selectedExamModuleId
  );

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const batchesList =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const batchIds = batchesList.map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length
      ? `/groups?fields=id&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groups =
    groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);
  const groupIds = groups.map((g: any) => g.id);

  const { data: studentsData, loading: studentsLoading } = useFetch(
    groupIds.length && selectedExamModuleId
      ? `/student-details?conditions=${JSON.stringify({ groupId: groupIds })}&limit=200`
      : "",
    { now: groupIds.length > 0 && !!selectedExamModuleId }
  ) as any;
  const students =
    studentsData?.rows ||
    (Array.isArray(studentsData) ? studentsData : []);

  const handleMarkChange = (
    studentId: string,
    field: string,
    value: string
  ) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!selectedExamModuleId)
      return toast.error("Please select an exam module");

    const entries = Object.entries(marks).filter(
      ([, v]) => v.obtainedMarks !== "" && v.obtainedMarks !== undefined
    );
    if (!entries.length) return toast.error("No marks entered");

    setSubmitting(true);
    try {
      const promises = entries.map(([studentId, data]) =>
        fetchApi("/module-marks", {
          method: "POST",
          body: {
            examModuleId: selectedExamModuleId,
            studentId,
            obtainedMarks: Number(data.obtainedMarks),
            remarks: data.remarks || undefined,
          },
        })
      );
      await Promise.all(promises);
      toast.success(`Marks saved for ${entries.length} student(s)`);
      setMarks({});
    } catch {
      toast.error("Failed to save marks");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage Results</h1>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Select Exam</label>
          <select
            value={selectedExamId}
            onChange={(e) => {
              setSelectedExamId(e.target.value);
              setSelectedExamModuleId("");
              setMarks({});
            }}
            className="py-3 px-5 text-sm rounded-md w-full min-w-[250px]"
          >
            <option value="">-- Select Exam --</option>
            {exams.map((exam: any) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>

        {selectedExamId && (
          <div>
            <label className="block mb-1 text-sm font-medium">
              Select Exam Module
            </label>
            <select
              value={selectedExamModuleId}
              onChange={(e) => {
                setSelectedExamModuleId(e.target.value);
                setMarks({});
              }}
              className="py-3 px-5 text-sm rounded-md w-full min-w-[250px]"
            >
              <option value="">-- Select Module --</option>
              {examModules.map((em: any) => (
                <option key={em.id} value={em.id}>
                  {em.moduleId} ({em.examType} - {em.totalMarks} marks)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedExamModuleId && (
        <>
          {studentsLoading ? (
            <Loader />
          ) : students.length === 0 ? (
            <p className="text-gray-500 text-sm">No students found.</p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">
                      Student ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Obtained Marks
                      {selectedExamModule && (
                        <span className="text-gray-400 font-normal">
                          {" "}
                          / {selectedExamModule.totalMarks}
                        </span>
                      )}
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student: any) => (
                    <tr key={student.id} className="border-t">
                      <td className="py-3 px-4">{student.userId}</td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          value={marks[student.id]?.obtainedMarks || ""}
                          onChange={(e) =>
                            handleMarkChange(
                              student.id,
                              "obtainedMarks",
                              e.target.value
                            )
                          }
                          className="py-2 px-3 text-sm rounded-md w-24 border"
                          placeholder="0"
                          min="0"
                          max={selectedExamModule?.totalMarks}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={marks[student.id]?.remarks || ""}
                          onChange={(e) =>
                            handleMarkChange(
                              student.id,
                              "remarks",
                              e.target.value
                            )
                          }
                          className="py-2 px-3 text-sm rounded-md w-full border"
                          placeholder="Optional remarks"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {students.length > 0 && (
            <PrimaryButton
              title={submitting ? "Saving..." : "Save Marks"}
              onClick={handleSubmit}
              disabled={submitting}
            />
          )}
        </>
      )}
    </div>
  );
}
