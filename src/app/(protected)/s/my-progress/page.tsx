"use client";

import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import {
  ClipboardCheck,
  Award,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default function MyProgressPage() {
  const { userData } = useAuth();
  const { studentId, loading: ctxLoading } = useStudent();
  const userId = userData?.id;

  const { data: attendanceData, loading: attLoading } = useFetch(
    userId
      ? `/attendances?fields=id&limit=1&conditions=${JSON.stringify({ userId })}`
      : "",
    { now: !!userId }
  ) as any;

  const { data: marksData, loading: marksLoading } = useFetch(
    studentId
      ? `/module-marks?fields=id,obtainedMarks&limit=100&conditions=${JSON.stringify({ studentId })}`
      : "",
    { now: !!studentId }
  ) as any;

  const { data: remarksData, loading: remarksLoading } = useFetch(
    studentId
      ? `/student-remarks?fields=id,remarkType&limit=100&conditions=${JSON.stringify({ studentId })}`
      : "",
    { now: !!studentId }
  ) as any;

  const getCount = (data: any) =>
    data?.count ?? data?.totalRows ?? (Array.isArray(data) ? data.length : 0);

  const marksList =
    marksData?.rows || (Array.isArray(marksData) ? marksData : []);
  const totalMarks = marksList.reduce(
    (sum: number, m: any) => sum + (Number(m.obtainedMarks) || 0),
    0
  );
  const avgMarks = marksList.length > 0 ? (totalMarks / marksList.length).toFixed(1) : "—";

  const remarksList =
    remarksData?.rows || (Array.isArray(remarksData) ? remarksData : []);
  const positiveRemarks = remarksList.filter(
    (r: any) => r.remarkType?.toLowerCase() === "positive" || r.remarkType?.toLowerCase() === "appreciation"
  ).length;
  const negativeRemarks = remarksList.filter(
    (r: any) => r.remarkType?.toLowerCase() === "negative" || r.remarkType?.toLowerCase() === "warning"
  ).length;

  const loading = ctxLoading || attLoading || marksLoading || remarksLoading;

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Progress</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your academic performance and attendance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <ClipboardCheck className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Attendance</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">
            {getCount(attendanceData)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Days present</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Avg. Marks</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{avgMarks}</p>
          <p className="text-xs text-gray-500 mt-1">
            Across {marksList.length} exam{marksList.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Total Marks</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{totalMarks}</p>
          <p className="text-xs text-gray-500 mt-1">Cumulative score</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-50">
              <MessageSquare className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Remarks</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">
            {remarksList.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total received</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Academic Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Exams Taken</span>
              <span className="text-sm font-medium text-gray-900">{marksList.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Marks</span>
              <span className="text-sm font-medium text-gray-900">{totalMarks}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Score</span>
              <span className="text-sm font-medium text-primary">{avgMarks}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Remarks Breakdown
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Remarks</span>
              <span className="text-sm font-medium text-gray-900">{remarksList.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Positive / Appreciation</span>
              <span className="text-sm font-medium text-green-600">{positiveRemarks}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Negative / Warning</span>
              <span className="text-sm font-medium text-red-600">{negativeRemarks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
