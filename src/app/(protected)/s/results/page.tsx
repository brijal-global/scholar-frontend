"use client";

import { useStudent } from "@/contexts/StudentContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { Award } from "lucide-react";
import { formatDate } from "@/utils/dateFormatters";

export default function ResultsPage() {
  const { studentId, loading: ctxLoading } = useStudent();

  const { data: marksData, loading: marksLoading } = useFetch(
    studentId
      ? `/module-marks?conditions=${JSON.stringify({ studentId })}&fields=id,examModuleId,obtainedMarks,remarks,createdAt&limit=100`
      : "",
    { now: !!studentId }
  ) as any;

  const marks =
    marksData?.rows || (Array.isArray(marksData) ? marksData : []);

  if (ctxLoading || marksLoading) return <Loader />;

  if (!studentId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Award className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">Student record not found</p>
        <p className="text-sm mt-1">Contact your administrator for assistance.</p>
      </div>
    );
  }

  const totalMarks = marks.reduce(
    (sum: number, m: any) => sum + (Number(m.obtainedMarks) || 0),
    0
  );
  const avgMarks = marks.length > 0 ? (totalMarks / marks.length).toFixed(1) : "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Results</h1>
          <p className="text-sm text-gray-500 mt-1">
            {marks.length} result{marks.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        {marks.length > 0 && (
          <div className="flex gap-4">
            <div className="bg-white rounded-xl shadow-sm px-5 py-3 border border-gray-100 text-center">
              <p className="text-2xl font-semibold text-primary">{totalMarks}</p>
              <p className="text-xs text-gray-500">Total Marks</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-5 py-3 border border-gray-100 text-center">
              <p className="text-2xl font-semibold text-primary">{avgMarks}</p>
              <p className="text-xs text-gray-500">Average</p>
            </div>
          </div>
        )}
      </div>

      {marks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Award className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-lg font-medium">No results yet</p>
          <p className="text-sm mt-1">Your exam results will appear here once published.</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">#</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Exam Module</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Marks Obtained</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Remarks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark: any, index: number) => (
                <tr key={mark.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {mark.examModuleId}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary-light text-primary">
                      {mark.obtainedMarks}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {mark.remarks || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {mark.createdAt ? formatDate(mark.createdAt, "long") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
