"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import fetchApi from "@/lib/axios";
import useFetch from "@/hooks/useFetch";
import { useOrg } from "@/contexts/OrgContext";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";

export default function AttendancePage() {
  const { collegeId, loading: orgLoading } = useOrg();
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [presentIds, setPresentIds] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);

  const { data: programsData } = useFetch(
    collegeId
      ? `/programs?fields=id&limit=100&conditions=${JSON.stringify({ collegeId })}`
      : "",
    { now: !!collegeId }
  ) as any;
  const programs =
    programsData?.rows || (Array.isArray(programsData) ? programsData : []);
  const programIds = programs.map((p: any) => p.id);

  const { data: batchesData } = useFetch(
    programIds.length
      ? `/batches?fields=id&limit=100&conditions=${JSON.stringify({ programId: programIds })}`
      : "",
    { now: programIds.length > 0 }
  ) as any;
  const batches =
    batchesData?.rows || (Array.isArray(batchesData) ? batchesData : []);
  const batchIds = batches.map((b: any) => b.id);

  const { data: groupsData } = useFetch(
    batchIds.length
      ? `/groups?fields=id,name&limit=200&conditions=${JSON.stringify({ batchId: batchIds })}`
      : "",
    { now: batchIds.length > 0 }
  ) as any;
  const groups =
    groupsData?.rows || (Array.isArray(groupsData) ? groupsData : []);

  const { data: studentsData, loading: studentsLoading } = useFetch(
    selectedGroupId
      ? `/student-details?conditions=${JSON.stringify({ groupId: selectedGroupId })}&limit=200`
      : "",
    { now: !!selectedGroupId }
  ) as any;
  const students =
    studentsData?.rows ||
    (Array.isArray(studentsData) ? studentsData : []);

  const togglePresent = (userId: string) => {
    setPresentIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!selectedDate) return toast.error("Please select a date");
    if (presentIds.size === 0) return toast.error("No students marked present");

    setSubmitting(true);
    try {
      const promises = Array.from(presentIds).map((userId) =>
        fetchApi("/attendances", {
          method: "POST",
          body: {
            userId,
            dateTime: `${selectedDate}T00:00:00.000Z`,
          },
        })
      );
      await Promise.all(promises);
      toast.success(`Attendance recorded for ${presentIds.size} student(s)`);
      setPresentIds(new Set());
    } catch {
      toast.error("Failed to record attendance");
    } finally {
      setSubmitting(false);
    }
  };

  if (orgLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Mark Attendance</h1>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Select Group
          </label>
          <select
            value={selectedGroupId}
            onChange={(e) => {
              setSelectedGroupId(e.target.value);
              setPresentIds(new Set());
            }}
            className="py-3 px-5 text-sm rounded-md w-full min-w-[250px]"
          >
            <option value="">-- Select Group --</option>
            {groups.map((g: any) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="py-3 px-5 text-sm rounded-md w-full min-w-[200px]"
          />
        </div>
      </div>

      {selectedGroupId && (
        <>
          {studentsLoading ? (
            <Loader />
          ) : students.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No students found in this group.
            </p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">
                      <input
                        type="checkbox"
                        checked={
                          students.length > 0 &&
                          presentIds.size === students.length
                        }
                        onChange={() => {
                          if (presentIds.size === students.length) {
                            setPresentIds(new Set());
                          } else {
                            setPresentIds(
                              new Set(students.map((s: any) => s.userId))
                            );
                          }
                        }}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Student ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student: any) => (
                    <tr
                      key={student.id}
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => togglePresent(student.userId)}
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={presentIds.has(student.userId)}
                          onChange={() => togglePresent(student.userId)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-4">{student.userId}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            presentIds.has(student.userId)
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {presentIds.has(student.userId)
                            ? "Present"
                            : "Absent"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {students.length > 0 && (
            <div className="flex items-center gap-4">
              <PrimaryButton
                title={submitting ? "Submitting..." : "Submit Attendance"}
                onClick={handleSubmit}
                disabled={submitting}
              />
              <span className="text-sm text-gray-500">
                {presentIds.size} of {students.length} marked present
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
